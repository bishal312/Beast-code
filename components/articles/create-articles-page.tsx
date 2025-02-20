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

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const CreateArticlesPage = () => {
    const [content, SetContent] = useState("");
    const [formState, action, isPending] = useActionState(createArticle, { errors: {} });
    
    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        formData.append("content", content);

        startTransition(()=>{
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
                            <Input type='text' name='title' placeholder='Enter a atricle title' />
                            {formState.errors.title && <span className='text-red-600 text-sm'>{formState.errors.title}</span>}
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='featuredImage'>Category</Label>
                            <select className='flex h-10 w-full rounded-md' name='category' id='category'>
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
                                    isPending ? "loading..." : "Publish Article"
                                }
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateArticlesPage;