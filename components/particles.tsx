'use client'

import React, { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { initializeParticleEngine } from '@/lib/particle-engine-singleton'

const ParticlesComponent: React.FC = () => {
  const [init, setInit] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState('')

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await initializeParticleEngine(engine)
    }).then(() => {
      setInit(true)
    })

    // set background color
    const bgColor = getComputedStyle(document.body).getPropertyValue('--background').trim()
    setBackgroundColor(bgColor)
  }, [])

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          options={{
            background: {
              color: {
                value: backgroundColor,
              },
            },
            fpsLimit: 75,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: 'repulse',
                },
                resize: {
                  enable: true,
                },
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 125,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: '#ced7e3',
              },
              links: {
                color: '#1f2937',
                distance: 250,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: 'none',
                enable: true,
                outModes: {
                  default: 'bounce',
                },
                random: false,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  height: 1200,
                  width: 1200,
                },
                value: 50,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: 'circle',
              },
              size: {
                value: { min: 1, max: 4 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </>
  )
}

export default ParticlesComponent
