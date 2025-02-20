"use client"
import { Search } from 'lucide-react';
import React from 'react'
import { Input } from '../ui/input';
import { useSearchParams } from 'next/navigation';
import { searchAction } from '@/actions/search';

const ArticleSearchInput = () => {
    const SearchParams = useSearchParams();

    return (
        <form action={searchAction} className='mx-auto max-w-2xl'>
            <div className='relative'>
                <Search className='w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2' />
                <Input defaultValue={SearchParams.get('search')||''} type='text' name='search' placeholder='Search articles...' className='w-full pl-10 pr-4 text-lg' />
            </div>
        </form>
    )
}

export default ArticleSearchInput;