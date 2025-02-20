"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import { Button } from '../../ui/button';
import SearchInput from './search-input';
import Toggle from './toggle';
import { Menu, Search, X } from 'lucide-react';
import { Input } from '../../ui/input';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { searchAction } from '@/actions/search';

function Navbar() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className='sticky top-0 z-50 w-full  border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className="flex items-center gap-8">
            <Link href='/' className='flex items-center space-x-2'>
              <span className='font-bold text-2xl'>
                <span className='bg-gradient-to-r from-purple-600 to bg-indigo-400 dark:to-indigo-400 bg-clip-text text-transparent'>
                  Beast
                </span>
                <span className='text-foreground'>
                  code
                </span>
              </span>
            </Link>
          </div>
          {/*Desktop Menu*/}
          <div className='hidden md:flex items-center gap-4'>
            <Link href={"/articles"} className='text sm font-medium text-foreground transition-clor hover:text-foreground'>
              Articles
            </Link>
            <Link href={"/tutorial"} className='text sm font-medium text-foreground transition-clor hover:text-foreground'>
              Tutorial
            </Link>
            <Link href={"/about"} className='text sm font-medium text-foreground transition-clor hover:text-foreground'>
              About
            </Link>
            <Link href={"/dashboard"} className='text sm font-medium text-foreground transition-clor hover:text-foreground'>
              Dashboard
            </Link>
          </div>

          {/*Right Section*/}
          <div className='flex items-center gap-4'>
            <SearchInput />
            <Toggle />

            {/*User action*/}
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <div className='hidden md:flex items-center gap-2'>
                <SignInButton>
                  <Button variant={'outline'}>Login</Button>
                </SignInButton>
                <SignUpButton>
                  <Button>Signup</Button>
                </SignUpButton>
              </div>
            </SignedOut>

            {/* <div className='hidden md:flex items-center gap-2'>
              <Button>Login</Button>
              <Button>signUp</Button>
            </div> */}
          </div>
          {/*Mobile Menu button*/}
          <Button variant={'ghost'} size={'icon'} className='md:hidden text-muted-foreground hover:text-foreground' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {
              isMobileMenuOpen ? (<X className="h-5 w-5" />) : (<Menu className="h-5 w-5" />)
            }
          </Button>
        </div>
      </div>

      {/* mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-4 space-y-4 border-t">
          {/* Search Bar (Mobile) */}
          <div className="px-4">
            <form action={searchAction} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                name='search'
                placeholder="Search articles..."
                className="pl-10 w-full focus-visible:ring-1"
              />
            </form>
          </div>

          {/* Mobile Navigation Links */}
          <div className="space-y-2 px-4">
            <Link
              href="/articles"
              className="block px-3 py-2 text-base font-medium text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Articles
            </Link>
            <Link
              href="/tutorials"
              className="block px-3 py-2 text-base font-medium text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tutorials
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-base font-medium text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-base font-medium text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile Auth Buttons */}
          {/* <SignedOut> */}
          <div className="px-4 flex flex-col gap-2">
            {/* <SignInButton> */}
            <Button variant="outline" className="w-full">
              Login
            </Button>
            {/* </SignInButton> */}
            {/* <SignUpButton> */}
            <Button className="w-full">Sign up</Button>
            {/* </SignUpButton> */}
          </div>
          {/* </SignedOut> */}
        </div>
      )}
    </div>
  );
};

export default Navbar;