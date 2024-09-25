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
      <h1 className="scroll-m-20 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
        Hi, I&apos;m ed3642dev
      </h1>
      <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl bg-gradient-to-r from-purple-600 to-blue-700 text-white px-2 sm:px-4 p-1 sm:p-2 rounded-md pb-2 sm:pb-4 w-fit">
          🚀 Building Stuff For Fun 🚀
        </div>
      </div>

      <div
        className={cn(
          'flex flex-col items-center justify-center space-y-6 mx-4'
        )}
      >
        <p className="text-xl text-muted-foreground">
          This is just a place to showcase my skills. See what I&apos;ve made so
          far with navigation on the top.
        </p>
        <p className="text-xl text-muted-foreground">
          Or checkout some samples of my professional work below.
        </p>
      </div>

      <div
        className={cn('flex flex-col items-center justify-center space-y-6')}
      >
        <h2 className="md:text-5xl text-2xl text-center mb-6">
          Professional Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Add your project cards here */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Project 1</h3>
            <p className="text-muted-foreground">Description of project 1.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Project 2</h3>
            <p className="text-muted-foreground">Description of project 2.</p>
          </div>
          {/* Add more projects as needed */}
        </div>
      </div>

      <div
        className={cn(
          'flex flex-col items-center justify-center space-y-6 pb-12'
        )}
      >
        <h2 className="md:text-5xl text-2xl text-center mb-5">My Links</h2>
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
