"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const updateArticleSchema = z.object({
  title: z.string().min(3).max(100),
  category: z.string().min(3).max(50),
  content: z.string().min(10),
});

type UpdateArticlesFormstate = {
  errors: {
    title?: string[];
    category?: string[];
    featuredImage?: string[];
    content?: string[];
    formErrors?: string[];
  };
};

export const editArticle = async (
  articleId: string,
  prevState: UpdateArticlesFormstate,
  formData: FormData
): Promise<UpdateArticlesFormstate> => {
  const result = updateArticleSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  //Authenticate user
  const { userId } = await auth();
  if (!userId) {
    return {
      errors: {
        formErrors: ["You have to login first"],
      },
    };
  }
  //Find the existing article
  const existingArticle = await prisma.articles.findUnique({
    where: { id: articleId },
  });
  if (!existingArticle) {
    return {
      errors: { formErrors: ["Article not found"] },
    };
  }
  //Checking if the user is the author
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user || existingArticle.authorId !== user.id) {
    return {
      errors: {
        formErrors: [
          "User not found. Please register before creating an article",
        ],
      },
    };
  }

  //Starting editing the article
  let imageUrl = existingArticle.featuredImage;
  //checking if a new image is provided

  const imageFile = formData.get("featuredImage") as File | null;
  if (imageFile && imageFile.name !== "undefined") {
    try {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResponse = await new Promise<UploadApiResponse | null>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                console.error("Cloudinary Upload Error:", error);
                reject(error);
              } else {
                console.log("Cloudinary Upload Result:", result);
                resolve(result ?? null);
              }
            }
          );
          uploadStream.end(buffer);
        }
      );
      if (uploadResponse?.secure_url) {
        imageUrl = uploadResponse.secure_url;
      } else {
        return {
          errors: {
            featuredImage: ["Failed to upload image. Please try again"],
          },
        };
      }
    } catch (error) {
      return {
        errors: {
          featuredImage: ["Error uploading image, Please try again"],
        },
      };
    }
  }

  if (!imageUrl) {
    return {
      errors: {
        featuredImage: ["Failed to upload image. Please try again"],
      },
    };
  }

  //updating the article in the database
  try {
    await prisma.articles.update({
      where: { id: articleId },
      data: {
        title: result.data.title,
        category: result.data.category,
        content: result.data.content,
        featuredImage: imageUrl,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          formErrors: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formErrors: ["Some internal server error occured"],
        },
      };
    }
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
};
