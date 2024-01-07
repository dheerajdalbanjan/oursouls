import Link from 'next/link'
import React from 'react'
import { socialIcons } from './socialicons';

const Footer = () => {
  const social = socialIcons;
  return (
    <div className='flex flex-col justify-between items-center md:px-12 py-4 border-t dark:border-gray-600 static bottom-0 mt-20 '>
      <div className='flex flex-col sm:flex-row items-center justify-between   w-full' >
        <span className='text-lg antialiased '>Get connected with us on social networks:</span>
        <div className='flex space-x-5 items-center  justify-around'>
          {Object.keys(social).map((e, i) => (
            <a href={social[e].link} key={i} className='hover:drop-shadow-xl hover:grayscale hover:scale-110 h-fit w-fit transition-all duration-300 drop-shadow-lg'>
              {social[e]?.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer