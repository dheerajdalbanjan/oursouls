
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import dynamic  from 'next/dynamic'
import { ThemeProvider } from '@/components/provider/theme-provider'
import Footer from './_components/footer'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from './provider'
import Head from 'next/head'

const Navbar = dynamic(()=> import('../app/_components/navbar') ,{
  ssr: false
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OurSoulss',
  description: 'We encapsulates our commitment to acknowledging every individual’s emotions and experiences. It serves as a reminder that at OurSoulss, everyone has a supportive community ready to listen, understand, and provide comfort during difficult times.',
  icons:{
    icon: [
      {
        url: "favicn.jpg",
        href: "/favicn.jpg" 
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={"min-h-screen w-full dark:from-neutral-900 dark:to-neutral-950 bg-gradient-to-r from-neutral-50 to-neutral-100/100  m-0 pt-20"}>
        
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey='theme1'
          >
            <AuthProvider>
          <Head>
  <link rel="icon" href="/public/favicn.jpg" />
</Head>

        <Navbar />
        
        {children}
        <Footer />
        <Toaster />
        
        </AuthProvider>
        </ThemeProvider>
        </body>
    </html>
  )
}
