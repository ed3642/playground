import Image from 'next/image'
import { GraduationCap, Languages, MapPin, Trophy } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import WorkCard from './_components/work-card'

const myWork = [
  {
    title: 'MiningMatch',
    description:
      'This was my first entrepreneurial project, I was the sole programmer and had one business partner. Like LinkedIn but exclusively for Mining Professionals. Designed and implemented all of the features.',
    image_path: '/media/miningmatch-sc.jpeg',
    link: 'https://www.miningmatch.net/',
  },
  {
    title: 'AssistList',
    description:
      'I worked one of my summers for this NFP, revamped their homepage in collaboration with designers and improved some internal tools.',
    image_path: '/media/assistlist-sc.jpeg',
    link: 'https://www.assistlist.ca/',
  },
  {
    title: 'Repurpost',
    description: 'I made API prototypes for this online marketing startup when i was a student.',
    image_path: '/media/repurpost-logo.jpg',
  },
  {
    title: 'GBA',
    description: 'I made internal tool prototypes for this social media startup.',
    image_path: '/media/gba-logo.png',
  },
]

const LandingPage = () => {
  return (
    <div
      className={cn(
        'md:max-w-screen-xl md:mx-auto mx-2 flex flex-col items-center justify-center space-y-10 pt-16'
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

      <div className={cn('flex flex-col items-center justify-center space-y-6 mx-4')}>
        <p className="text-xl text-muted-foreground">
          This is just a place to showcase my skills. See what I&apos;ve made so far with navigation
          on the top.
        </p>
        <p className="text-xl text-muted-foreground">
          Or checkout some samples of my professional work below.
        </p>
      </div>

      <div className={cn('flex flex-col items-center justify-center space-y-6')}>
        <h2 className="md:text-5xl text-3xl text-center mb-6">Professional Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {myWork.map((work) => (
            <WorkCard
              key={work.title}
              title={work.title}
              description={work.description}
              image_path={work.image_path}
              link={work.link}
            />
          ))}
        </div>
      </div>

      <div className={cn('flex flex-col items-center justify-center space-y-6')}>
        <h2 className="md:text-5xl text-3xl text-center mb-6">More About Me</h2>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6 mx-4">
          <div className="w-full md:w-1/3 flex justify-center">
            <Image src="/media/duck.jpg" width={200} height={200} alt="My Profile Pic" />
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-lg text-muted-foreground">
              I have been building web apps for a few years now and im always looking to learn new
              things and build interesting things. Currently I&apos;m trying to get more involved in
              the Nextjs and C# web dev communities. I would also like to build an interesting
              company in my youth and work with talented developers.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Badge className="text-sm">
            <MapPin className="h-5 w-5 text-gray-800 mr-2" />
            ON, Canada
          </Badge>
          <Badge className="text-sm">
            <Trophy className="h-5 w-5 text-gray-800 mr-2" />
            Top 20% In Leetcode
          </Badge>
          <Badge className="text-sm">
            <GraduationCap className="h-5 w-5 text-gray-800 mr-2" />
            BS from Ontario Tech
          </Badge>
          <Badge className="text-sm">
            <GraduationCap className="h-5 w-5 text-gray-800 mr-2" />
            CPA from Durham College
          </Badge>
          <Badge className="text-sm">
            <Languages className="h-5 w-5 text-gray-800 mr-2" />
            Native Spanish
          </Badge>
          <Badge className="text-sm">
            <Trophy className="h-5 w-5 text-gray-800 mr-2" />
            D1 In League
          </Badge>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
