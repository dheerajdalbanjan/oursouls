
"use client"

import React, { useState } from 'react'

import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ReloadIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import Formsuccess from '@/components/ui/formsuccess'
import { useSearchParams } from 'next/navigation'

const formSchema = z.object({
  name: z.string().min(5).max(50),
  email: z.string().email(),
  category: z.string().nonempty() ,
  pricing: z.string().optional() ,
  message: z.string().min(5).max(100)
})


const Page = () => {
  const [success, setSuccess] = useState(false) ;
  const [loading , setLoading] = useState(false) ;
  const { toast } = useToast();
  const { register, handleSubmit,setValue,  formState: { errors }, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), 
    defaultValues:{
      name:"", 
      email:"", 
      category:"", 
      pricing:"", 
      message:""
    }
  })
  const router = useSearchParams()  ; 
  const pricing = router.get('pricing') ;

  let selectOptions = [
    { label: "15 Minute Session Package", value: 0, price: "₹39" },
    { label: "30 Minute Session Package", value: 1, price: "₹69" },
    { label: "15 Minute Add-On", value: 2, price: "₹24/session" },
    { label: "30 Minute Add-On", value: 3, price: "₹45/session" },
    { label: "1 Month Subscription", value: 4, price: "Rs. 199/-" },
    { label: "3 Month Subscription", value: 5, price: "Rs. 349/- (Save Rs. 50)" },
    { label: "6 Month Subscription", value: 6, price: "Rs. 599/- (Save Rs. 100)" }
];



  const submitee = async (data: z.infer<typeof formSchema>) => {
    console.log(data)
    setLoading(true) ; 
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    setLoading(false)
    if (response.ok) {
      // toast({
      //   variant: 'constructive',
      //   title: "Successfully sent to the team",
      //   description: "Explore different parts of the website till our team replies you",
      // })

      setSuccess(true)

      console.log("mail sent")
      console.log(toast)
    } else {
      console.log("mail failed")
    }
  }

  function handleClear() {
    reset()
  }
  return (
    <form method='post' onSubmit={handleSubmit(submitee)} className=' px-1' >
      <div className='flex flex-col gap-y-2  my-4'>
        <label className={cn(errors.name && 'text-red-500')}>Enter your name</label>
        <Input className='bg-opacity-60' {...register('name')} type='text' placeholder='eg: virat kohli' />
        {errors.name && <span className="text-[0.9rem] ml-1 text-red-500 antialised">{errors.name.message}</span>}
      </div>
      <div className='flex flex-col gap-y-2  my-4'>
        <label className={cn(errors.email && 'text-red-500')}>Enter your email</label>
        <Input className='bg-opacity-60'  {...register('email')} type='text' placeholder='eg: viratkohli@gmail.com' />
        {errors.email && <span className="text-[0.9rem] ml-1 text-red-500 antialised">{errors.email.message}</span>}
      </div>
      <div className='flex flex-col gap-y-2   my-4'>
        
      <label className={cn(errors.category && 'text-red-500')}>Enter your Problem </label>
        <Select onValueChange={(value)=>setValue('category', value)} {...register('category')}>
          <SelectTrigger className='bg-opacity-60'>
            <SelectValue placeholder="Select you category of concern" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Academic">Academic</SelectItem>
            <SelectItem value="Professional">Professional</SelectItem>
            <SelectItem value="Social">Social</SelectItem>
            <SelectItem value="Personal">Personal</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && <span className="text-[0.9rem] ml-1 text-red-500 antialised">{errors.category.message}</span>}
      </div>
      {pricing && 
        <div className='flex flex-col gap-y-2   my-4'>
        
        <label className={cn(errors.category && 'text-red-500')}>Choose the pricing </label>
          <Select onValueChange={(value)=>setValue('pricing', value)} {...register('pricing')}>
            <SelectTrigger className='bg-opacity-60'>
              <SelectValue placeholder="Select your Pack" />
            </SelectTrigger>
            <SelectContent>
              {selectOptions.map((e,i)=><SelectItem key={i} value={e.label}>{e.label} <span className='text-neutral-500 ml-2'>{e.price}</span></SelectItem>)}
            </SelectContent>
          </Select>
          {errors.category && <span className="text-[0.9rem] ml-1 text-red-500 antialised">{errors.category.message}</span>}
        </div>
      }
      <div className='flex flex-col gap-y-2  my-4'>
        <label className={cn(errors.message && 'text-red-500')}>Enter your message</label>
        <Textarea className='bg-opacity-60' {...register('message')} placeholder='eg: I want to work with you guys' ></Textarea>
        {errors.message && <span className="text-[0.9rem] ml-1 text-red-500 antialised">{errors.message.message}</span>}
      </div>
      {success && <div className='py-2'>
        <Formsuccess msg="Successfully sent to the team"></Formsuccess>
      </div>}
      <div className='w-full flex justify-end gap-x-4'>
        <Button type='reset' variant={'outline'} onClick={handleClear}>Clear</Button>
        <Button type='submit' disabled={loading?true:false} >
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Submit</Button>
      </div>

      
    </form>

  )
}

export default Page