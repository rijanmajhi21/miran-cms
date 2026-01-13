'use client'

import Image from '@/components/commons/image'
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid'
import { FunctionComponent, useRef, useState } from 'react'

const HeroSection: FunctionComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section className="relative w-full h-[70vh] sm:h-[75vh] md:h-[700px] overflow-hidden">
      <div className="absolute inset-0 z-10 bg-neutral-black/40" />

      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video/hero-section-video.mp4" type="video/mp4" />
      </video>

      <Image
        src="/featured-images/landscape.jpg"
        alt="Hero background"
        fill
        priority
        className="block md:hidden"
        sizes="100vw"
      />

      <div className="container z-20 absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6">
        <h1 className="font-heading text-title-5 xs:text-title-4 sm:text-title-3 md:text-title-2 lg:text-title-1 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
          Capturing Moments, Creating Art
        </h1>
        <p className="text-body-small sm:text-body-base md:text-body-big mt-3 sm:mt-4 md:mt-6 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl opacity-90">
          Explore the world through my lens, where every frame tells a unique story.
        </p>
      </div>

      <button
        onClick={toggleVideo}
        className="hidden md:flex absolute bottom-6 right-6 z-30 items-center gap-2 px-4 py-2 bg-pure-white/20 backdrop-blur-sm rounded-full text-pure-white hover:bg-pure-white/30 transition-colors"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
      </button>
    </section>
  )
}

export default HeroSection
