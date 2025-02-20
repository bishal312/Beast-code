"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Button } from '../ui/button';
import 'react-quill-new/dist/quill.snow.css';
import { useActionState } from 'react';
import { createArticle } from '@/actions/create-article';
import { FormEvent } from 'react';
import { startTransition } from 'react';
import type { Articles } from '@prisma/client';
import Image from 'next/image';
import { editArticle } from '@/actions/edit-article';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

type EditArticleProps = {
    article: Articles;
};

const EditArticlePage: React.FC<EditArticleProps> = ({ article }) => {
    const [content, SetContent] = useState(article.content);
    const [formState, action, isPending] = useActionState(editArticle.bind(null, article.id), { errors: {} });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        formData.append("content", content);

        startTransition(() => {
            action(formData);
        })
    }

    return (
        <div className='max-w-4xl mx-auto p-6'>
            <Card>
                <CardHeader>
                    <CardTitle>Create New Article</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='space-y-2'>
                            <Label htmlFor='title'>Article Title</Label>
                            <Input type='text' name='title' defaultValue={article.title} placeholder='Enter a atricle title' />
                            {formState.errors.title && <span className='text-red-600 text-sm'>{formState.errors.title}</span>}
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='featuredImage'>Category</Label>
                            <select className='flex h-10 w-full rounded-md' defaultValue={article.category} name='category' id='category'>
                                <option value="">Select category</option>
                                <option value="Technology">Technology</option>
                                <option value="Programming">Programming</option>
                                <option value="Web-development">Web development</option>
                            </select>
                            {formState.errors.category && <span className='text-red-600 text-sm'>{formState.errors.category}</span>}
                        </div>
                        <div className='space-y-2'>
                            <Label>Featured Image</Label>
                            <Input type='file' id='featuredImage' name='featuredImage' accept='image/*' />
                            <div className='mb-4'>
                                {
                                    article.featuredImage && (
                                        <Image src={article.featuredImage} width={800} height={600} alt="featured-image" className="w-48 h-32 object-cover rounded-md" />
                                    )
                                }
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <Label>Content</Label>
                            <ReactQuill theme='snow' value={content} onChange={SetContent} />
                            {formState.errors.content && <span className='text-red-600 text-sm'>{formState.errors.content[0]}</span>}
                        </div>
                        <div className='flex justify-end gap-4'>
                            <Button variant={'outline'}>cancle</Button>
                            <Button type='submit' disabled={isPending}>
                                {
                                    isPending ? "loading..." : "Edit Article"
                                }
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default EditArticlePage;