"use client"

import React, { useEffect } from 'react'
import Logo from './logo'
import { Button } from '@/components/ui/button'
import { UseScrollHook } from '@/hooks/UseScrollTop'
import { cn } from '@/lib/utils'
import { ModeToggle } from '@/components/dark-mode'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'


const Navbar = () => {
  const scrolled = UseScrollHook();
  const {data:session} = useSession() ;
  useEffect(()=>{
    console.log(session)
  }, [session])

  return (
    <div className={cn(scrolled && "border-b dark:border-gray-600 shadow-sm", 'flex w-full z-50  items-center justify-between  backdrop-blur-lg supports-[backdrop-filter]:bg-background bg-background  px-6 md:px-12 py-4 fixed top-0')}>
      <div className='flex gap-x-3 items-center justify-center'>
        <Sheet >
          <SheetTrigger>
            <Button variant={'outline'} className='bg-transparent px-2 py-1'>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={'left'} className='h-full w-full'>
            <SheetHeader className='h-full'>
              <SheetTitle>OurSoulss</SheetTitle>
              <SheetDescription className='flex h-full w-full flex-col gap-y-8 items-start justify-between'>
                <div className='flex flex-col gap-y-4 justify-start mt-3 items-start text-[1.05rem]'>
                  <a href={'/'}>Home</a>
                  <a href={'/about'}>About</a>
                  <a href={'/contact'}>Contact</a>
                  <a href="/pricing">Pricing</a>
                </div>
                {!session && <div className='flex items-center justify-between mt-auto gap-x-4 ml-auto'>
                  <Button variant='outline' ><a href="/login">Login</a></Button>
                  <Button><a href="/signup">SignUp</a></Button>
                </div>}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Logo />
      </div>
      <div className='flex gap-x-2 md:gap-x-4 items-center justify-center'>
        {!session && <Button ><a href="/login">Login</a></Button>}
        {session && <Button variant={'secondary'} onClick={()=>signOut()}>Log out</Button>}
        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar