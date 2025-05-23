"use params"
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input'
import React, { useActionState } from 'react'
import { useSearchParams } from 'next/navigation';
import { searchAction } from '@/actions/search';

function SearchInput() {
    const SearchParams = useSearchParams();
        
    return (
        <form action={searchAction}>
            <div className='relative'>
                <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-forground'></Search>
                <Input defaultValue={SearchParams.get('search') ?? ""} type='text' name='search' placeholder='Search Articles' className="pl-10 w-48 focus-visible:ring-1" />
            </div>
        </form>
    )
}

export default SearchInput;