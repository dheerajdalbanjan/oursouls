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

import {motion} from 'framer-motion'



  

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
    <div className='flex flex-col gap-y-4 md:gap-y-7   justify-center py-6 max-w-6xl mx-auto '>
        <h2 className='text-2xl sm:text-start  sm:text-3xl md:text-4xl max-w-xl my-4 text-center antialiased font-bold tracking-tight'>Features </h2>
        <div className='flex items-center px-6 md:px-0 w-full justify-between md:gap-x-5 flex-col md:flex-row gap-y-4 md:gap-y-0' > 
            {features.map((e, i)=>
            <motion.div key={i} initial={{translateY: 45}} whileInView={{translateY: 0}} transition={{delay: (i/10), duration: 0.3}} className='w-full'>
                <Card  className='rounded-xl shadow-md shadow-[#9067C6]/30 border-blue-700/10  bg-opacity-50 backdrop-blur-md w-full h-56 md:w-64 relative group overflow-hidden cursor-pointer '>
                <CardHeader >
                  <CardTitle>{e.title}</CardTitle>
                  <CardDescription className='truncate'>{e.description}</CardDescription>
                </CardHeader>
                <CardContent className=' float-right'>
                    <e.icon className='h-16 w-16 mt-auto '/>
                </CardContent>
                <CardFooter className=' origin-bottom bg-dark_purple-800 text-neutral-50 backdrop-blur-2xl dark:border-neutral-500 shadow-lg h-full ease-in-out rounded-sm p-8 group-hover:bottom-0 absolute -bottom-56 transition-all duration-300'>
                  <p>{e.description}</p>
                </CardFooter>
              </Card>
              </motion.div>
              
            )}
        </div>
    </div>
  )
}

export default Features