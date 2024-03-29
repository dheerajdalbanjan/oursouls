import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Building2, HeartHandshake, PhoneCall, Timer } from 'lucide-react';



  

const Features = () => {

    const features = [
        {
            title: "24/7 Support",
            description: "Our dedicated team is available around the clock to provide immediate emotional support and consolation.",
            icon: Timer
        },
        {
            title: "Multichannel Communication",
            description: "Connect with us through calls, texts, or online chat. Choose the medium that you're most comfortable with.",
            icon : PhoneCall
        },
        {
            title: "Confidential Conversations",
            description: "Your privacy is our priority. All conversations are confidential, ensuring a safe and secure environment.",
            icon : HeartHandshake
        },
        {
            title: "Experienced Professionals",
            description: "Our team consists of trained professionals who are equipped to provide empathetic and effective support.", 
            icon : Building2
        }
    ];
    
  return (
    <div className='flex flex-col gap-y-4 md:gap-y-7   justify-center p-6 max-w-6xl mx-auto '>
        <h2 className='text-3xl sm:text-start sm:ml-2 sm:text-4xl md:text-5xl max-w-xl my-4 text-center antialiased font-bold tracking-tight'>Features </h2>
        <div className='flex items-center justify-center md:gap-x-5 p-2 flex-col md:flex-row gap-y-4 md:gap-y-0' > 
            {features.map((e, i)=>
                <Card key={i} className='bg-transparent w-full h-56 md:w-64 relative group overflow-hidden cursor-pointer '>
                <CardHeader >
                  <CardTitle>{e.title}</CardTitle>
                  <CardDescription className='truncate'>{e.description}</CardDescription>
                </CardHeader>
                <CardContent className='p-5 float-right'>
                    <e.icon className='h-16 w-16'/>
                </CardContent>
                <CardFooter className=' origin-bottom bg-background backdrop-blur dark:border-neutral-500 shadow-lg border-t rounded-md p-8 group-hover:bottom-0 absolute -bottom-56 transition-all duration-300'>
                  <p>{e.description}</p>
                </CardFooter>
              </Card>
              
            )}
        </div>
    </div>
  )
}

export default Features