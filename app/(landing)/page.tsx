import Image from 'next/image'
import { Linkedin } from 'lucide-react'

import { cn } from '@/lib/utils'

const LandingPage = () => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center space-y-10 pt-16'
      )}
    >
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Hi, I&apos;m ed3642dev
      </h1>
      <div
        className={cn('flex flex-col items-center justify-center space-y-6')}
      >
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-purple-600 to-blue-700 text-white px-4 p-2 rounded-md pb-4 w-fit">
          🚀 Learing Next.js 🚀
        </div>
      </div>

      <div
        className={cn(
          'flex flex-col items-center justify-center space-y-6 mx-4'
        )}
      >
        <p className="text-xl text-muted-foreground">
          This is just a place where I try to make some fun projects with
          Next.js.
        </p>
        <p className="text-xl text-muted-foreground">
          Checkout what I&apos;ve made so far with navigation on the top.
        </p>
      </div>

      <div
        className={cn('flex flex-col items-center justify-center space-y-6')}
      >
        <h2 className="text-2xl md:text-5xl text-center mb-6">Follow me</h2>
        <div className="flex items-center space-x-4">
          <a
            href="https://www.linkedin.com/in/eduardo-san-martin-celi/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 rounded-full p-2"
          >
            <Linkedin color="white" size={24} />
          </a>
          <a
            href="https://github.com/ed3642"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 rounded-full p-2"
          >
            <Image
              src="/github-mark.svg"
              width={24}
              height={24}
              alt="Github logo"
              className="text-white"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
