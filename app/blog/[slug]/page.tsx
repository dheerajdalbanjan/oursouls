"use client"


import { Badge } from '@/components/ui/badge';
import { LoaderIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown';
import { FastAverageColor } from 'fast-average-color';
import { Metadata, ResolvingMetadata } from 'next';






const Page = ({ params }: {params:{slug: string}}) => {
    const [loading, setLoading] = useState(true)

    const [data, setData]: any= useState() ;


    useEffect(()=>{
        setLoading(true)
        fetch(`/api/blog/${params.slug}`) // Adjust the URL to your API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        return response.json();
      })
      .then((data) => {
        // Set the fetched blogs to the state
        if(data.success)
        setData(data.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });

    }, [])

   
    const imageLoad = (e: any)=>{
        const element = e.target.parentNode.nextElementSibling ;
        const imgnext = e.target.nextElementSibling ;
        const fac = new FastAverageColor() ;
      const dominantColor = fac.getColor(e.currentTarget).rgb;
        const gradien = `linear-gradient(to bottom, ${dominantColor}, transparent)`;
        const gradien1 = `linear-gradient(to top, ${dominantColor}, transparent)`;
        element.style.background = gradien; 
        console.log(imgnext)
        imgnext.style.background = gradien1 ;


        setLoading(false)

    }

  return (
    <div className='min-h-screen py-16'>
        {loading && <div className='fixed z-50 inset-0 w-full h-full bg-opacity-50  backdrop-blur-lg flex items-center justify-center '>

            <LoaderIcon className='animate-spin' />
        </div>}
        <div className='max-w-4xl mx-auto px-8 md:px-0'>
            <h1 className='text-2xl md:text-3xl font-bold tracking-tight my-5 md:mb-7 antialiased '>{data?.title}</h1>
            <div className='  w-full relative  '>
                <img src={data?.image} crossOrigin='anonymous' onLoad={imageLoad} className='w-full object-fill rounded-lg '/>
                <div className='absolute bottom-0 w-full h-1/2 '></div>
                
            </div>
            <div className='flex flex-col px-4 md:px-8 md:py-8 rounded-b-lg  md:flex-row space-y-4 md:space-y-0 md:items-center justify-between py-5'>
                    <Badge className='md:text-base md:px-4 w-fit border-none '>{data?.author}</Badge>
                    <div className='flex flex-wrap gap-2'>
                        {data?.tags.slice(0,3).map((e: any, i: number)=><Badge className='border-neutral-700 min-w-fit' variant={'outline'} key={i}>#{e}</Badge>)}
                    </div>
            </div>
            <Markdown className={'prose prose-base prose-neutral  max-w-full py-5 !w-full'}>
                {data?.content}
            </Markdown>
            <div className='py-5 flex md:flex-row flex-col space-y-3 md:space-y-0 md:items-center justify-between'>
                <Badge className='w-fit' variant={'secondary'}>Created at: {data?.createdAt.toString().split('T')[0]}</Badge>
                <Badge className='w-fit border-neutral-700' variant={'outline'}>Updated at: {data?.updatedAt.toString().split('T')[0]}</Badge>
            </div>
        </div>
    </div>
  )
}

export default Page