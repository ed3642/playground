import React from 'react'
import Image from 'next/image'
import { FileText, GraduationCap, Languages, MapPin, Trophy } from 'lucide-react'

import WorkCard from './_components/work-card'
import ParticlesComponent from '@/components/particles'
import SocialIcons from '@/components/social-icons'
import { myWork, skills } from '@/lib/constants'
import AchievementBadge from './_components/achievement-badge'
import { Button } from '@/components/ui/button'
import Section from './_components/section'
import { Badge } from '@/components/ui/badge'
import ScrollToSection from './_components/scroll-to-section'

const LandingPage = () => {
  return (
    <>
      <ParticlesComponent />
      <div className="md:max-w-screen-xl px-4 md:mx-auto flex flex-col items-center justify-center space-y-10 first:mt-0 relative z-10">
        <div className="h-[95vh] w-full flex flex-col items-center justify-center space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Hi, I&apos;m ed3642dev
          </h1>
          <div className="space-y-4 sm:space-y-6">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl bg-gradient-to-r from-purple-600 to-blue-700 text-white px-2 sm:px-4 p-1 sm:p-2 rounded-md pb-2 sm:pb-4 w-fit">
              🚀 Building Stuff For Fun 🚀
            </div>
          </div>
          <div className="text-center">
            <p className="text-xl text-zinc-200">
              I&apos;m a full-stack JavaScript developer.
              <br />
              Check out the neat little projects I&apos;ve made with the navigation above, or see my
              professional work below.
            </p>
          </div>
          <div>
            <a href="/media/my-resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <FileText />
                My Resume
              </Button>
            </a>
          </div>
          <div>
            <SocialIcons iconSize={36} />
          </div>
          <ScrollToSection />
        </div>

        <Section title="Professional Work">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </Section>

        <Section title="Skills">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4">
            {Object.entries(skills).map(([groupTitle, groupSkills]) => (
              <div key={groupTitle} className="flex flex-col space-y-2">
                <h3 className="text-lg font-bold">
                  {groupTitle.charAt(0).toUpperCase() + groupTitle.slice(1)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {groupSkills.map((skill, i) => (
                    <Badge key={i}>{skill}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="More About Me">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-center md:space-y-0 md:space-x-6">
              <div className="w-full md:w-1/3 flex justify-center">
                <Image src="/media/duck.jpg" width={200} height={200} alt="My Profile Pic" />
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-lg text-zinc-200">
                  I have been building web apps for a few years now and im always looking to learn
                  new things and build interesting projects. Currently I&apos;m trying to get more
                  involved in the Nextjs and C# web dev communities. I would also like to build an
                  interesting company in my youth and work with talented developers.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <AchievementBadge Icon={MapPin} title="ON, Canada" />
              <AchievementBadge Icon={Trophy} title="Top 20% In Leetcode" />
              <AchievementBadge Icon={GraduationCap} title="BS from Ontario Tech" />
              <AchievementBadge Icon={GraduationCap} title="CPA from Durham College" />
              <AchievementBadge Icon={Languages} title="Native Spanish" />
              <AchievementBadge Icon={Trophy} title="D1 In League" />
            </div>
          </div>
        </Section>
      </div>
    </>
  )
}

export default LandingPage
