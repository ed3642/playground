'use client'

import React, { useRef, useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const ScrollToSection = () => {
  const scrollToRef = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)

  const scrollToWork = () => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true)
    }, 3000) // wait 3 seconds before animating the arrow

    return () => clearTimeout(timer) // cleanup
  }, [])

  return (
    <>
      <div className="w-full pt-16">
        <Separator
          icon={
            <ChevronDown
              className={cn('h-8 w-8 text-gray-800 bg-white rounded-full p-1 cursor-pointer', {
                'animate-bounce-3': animate,
              })}
              onClick={scrollToWork}
            />
          }
        />
      </div>
      <div ref={scrollToRef}></div>
    </>
  )
}

export default ScrollToSection
