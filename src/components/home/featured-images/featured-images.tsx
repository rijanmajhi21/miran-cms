'use client'

import { FunctionComponent, useState } from 'react'
import { FEATURED_IMAGES } from './constant'
import ButtonLink from '@/components/commons/button-link'
import { ROUTE_GALLERY } from '@/data/routes'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

const FeaturedImagesSection: FunctionComponent = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  return (
    <section id="gallery" className="container">
      <div className="flex flex-col gap-8 md:gap-12 w-full">
        {/* Header */}
        <div className="flex flex-col gap-1 text-center">
          <h2 className="text-title-4 md:text-title-3 font-heading">Featured Photos</h2>
          <p className="text-body-base text-neutral-sub-text-alt">
            Discover my latest photography projects.
          </p>
        </div>

        {/* Accordion Cards - Desktop */}
        <div className="hidden md:flex gap-3 h-[500px] lg:h-[550px]">
          {FEATURED_IMAGES.map((photo, index) => {
            const isActive = activeIndex === index

            return (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-out ${
                  isActive ? 'flex-[4]' : 'flex-1'
                }`}
              >
                {/* Background Image */}
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes={isActive ? '60vw' : '15vw'}
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isActive
                      ? 'bg-gradient-to-t from-neutral-black/80 via-neutral-black/20 to-transparent'
                      : 'bg-neutral-black/40 hover:bg-neutral-black/30'
                  }`}
                />

                {/* Collapsed Title (Vertical) */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    isActive ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <h3
                    className="text-pure-white text-title-5 font-heading tracking-wide"
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                      transform: 'rotate(180deg)',
                    }}
                  >
                    {photo.title}
                  </h3>
                </div>

                {/* Expanded Content */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-6 lg:p-8 transition-all duration-500 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-caption text-pure-white/70 uppercase tracking-wider">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="h-px flex-1 bg-pure-white/30" />
                      {photo.photoCount && (
                        <span className="text-caption text-pure-white/70">
                          {photo.photoCount} Photos
                        </span>
                      )}
                    </div>
                    <h3 className="text-title-3 lg:text-title-2 font-heading text-pure-white">
                      {photo.title}
                    </h3>
                    <p className="text-body-base text-pure-white/80 max-w-md leading-relaxed">
                      {photo.description}
                    </p>
                    <Link
                      href={photo.href}
                      className="inline-flex items-center gap-2 text-pure-white font-medium mt-2 hover:gap-3 transition-all group"
                    >
                      Explore Collection
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile Cards - Stack */}
        <div className="flex flex-col gap-4 md:hidden">
          {FEATURED_IMAGES.map((photo, index) => {
            const isActive = activeIndex === index

            return (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 ease-out ${
                  isActive ? 'h-72' : 'h-20'
                }`}
              >
                {/* Background Image */}
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isActive
                      ? 'bg-gradient-to-t from-neutral-black/80 via-neutral-black/20 to-transparent'
                      : 'bg-neutral-black/50'
                  }`}
                />

                {/* Collapsed Title */}
                <div
                  className={`absolute inset-0 flex items-center px-5 transition-opacity duration-300 ${
                    isActive ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <span className="text-caption text-pure-white/70">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-body-big-bold text-pure-white font-heading">
                        {photo.title}
                      </h3>
                    </div>
                    <ArrowRightIcon
                      className={`w-5 h-5 text-pure-white transition-transform duration-300 ${
                        isActive ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Expanded Content */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-caption text-pure-white/70 uppercase tracking-wider">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {photo.photoCount && (
                        <>
                          <div className="h-px flex-1 bg-pure-white/30 max-w-12" />
                          <span className="text-caption text-pure-white/70">
                            {photo.photoCount} Photos
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="text-title-5 font-heading text-pure-white">{photo.title}</h3>
                    <p className="text-body-small text-pure-white/80 leading-relaxed line-clamp-2">
                      {photo.description}
                    </p>
                    <Link
                      href={photo.href}
                      className="inline-flex items-center gap-2 text-pure-white text-body-small font-medium mt-1"
                    >
                      Explore
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <ButtonLink href={ROUTE_GALLERY}>
            View All Photos
            <ArrowRightIcon className="w-4 h-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

export default FeaturedImagesSection
