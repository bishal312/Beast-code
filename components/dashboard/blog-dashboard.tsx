import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';
import { FileText, MessageCircle, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import RecentArticles from './RecentArticles';
import { prisma } from '@/lib/prisma';

const BlogDashBoard = async () => {
    const [Articles, totalComments] = await Promise.all([
        prisma.articles.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                comments: true,
                author: {
                    select: {
                        name: true,
                        email: true,
                        imageUrl: true
                    }
                }
            }
        }),
        prisma.comment.count(),
    ])

    return (
        <main>
            <div className='flex justify-between items-center mb-8'>
                <div>
                    <h1 className='font-bold text-2xl'>Blog Dashboard</h1>
                    <p className='text-sm text-muted-forground mt-1'>Manage your content and Analytics</p>
                </div>
                <Link href="/dashboard/articles/create">
                    <Button>
                        <PlusCircle className='h-4 w-4' />
                        New Article
                    </Button>
                </Link>
            </div>
            {/*Quick stats */}
            <div className='grid md:grid-cols-3 mb-8 gap-4 mx-4'>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='font-medium text-sm'>
                            Top Articles
                        </CardTitle>
                        <FileText className='h-4 w-4' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>{Articles.length}</div>
                        <p className='text-sm text-muted-forground mt-1'>+5 from last months</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='font-medium text-sm'>
                            Top Comments
                        </CardTitle>
                        <MessageCircle className='h-4 w-4' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>{totalComments}</div>
                        <p className='text-sm text-muted-forground mt-1'>12 awaiting moderation</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='font-medium text-sm'>
                            Avg. Rating Time
                        </CardTitle>
                        <MessageCircle className='h-4 w-4' />
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>3</div>
                        <p className='text-sm text-muted-forground mt-1'>+0.6 from last month</p>
                    </CardContent>
                </Card>
            </div>
            <RecentArticles articles={Articles} />
        </main>
    )
}

export default BlogDashBoard;