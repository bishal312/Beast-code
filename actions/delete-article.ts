"use server"
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache';
import React from 'react'

export const deleteArticle = async (articleId:string) =>{
    await prisma.articles.delete({
        where: {id: articleId}
    });
    revalidatePath("/dashboard");
}