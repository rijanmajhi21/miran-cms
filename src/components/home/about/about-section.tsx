import Image from '@/components/commons/image'
import { FunctionComponent } from 'react'

const AboutSection: FunctionComponent = () => {
  return (
    <section id="about" className="container">
      <div className="flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col gap-1 text-center">
          <h2 className="font-heading text-title-4 md:text-title-3">About Me</h2>
          <span className="text-body-base text-neutral-sub-text-alt">
            Graphic Designer • Motion Designer • Video Editor • Photographer
          </span>
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-12">
          <div className="flex flex-col w-full md:w-1/2">
            <div className="space-y-4 text-body-base text-neutral-sub-text-alt">
              <p>
                Hi, I&apos;m a graphic designer, motion graphic designer, and video editor currently
                working with a travel agency (Bookmundi). My journey into visual design began with
                simple curiosity — experimenting in Photoshop and creating vector portraits for
                friends, a process that sparked my interest in visual expression.
              </p>
              <p>
                Over time, my focus evolved. What started as an interest in design tools grew into a
                deeper appreciation for storytelling, emotion, and visual clarity. Today, my work
                leans toward minimal, clean design with a cinematic travel feel, where every frame
                and element serves a purpose.
              </p>
              <p>
                I care deeply about communicating ideas clearly — understanding the intent behind an
                ad, the audience it speaks to, and crafting visuals that feel relatable and human.
                Alongside my professional work, photography remains a creative escape, allowing me
                to explore travel, landscapes, and mountains through a more personal lens.
              </p>
            </div>
          </div>
          <div className="relative rounded-lg aspect-video flex md:h-[300px] w-full md:w-1/2 bg-neutral-200 overflow-hidden">
            <Image
              src="/featured-images/on-the-way.jpg"
              alt="Miran"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
