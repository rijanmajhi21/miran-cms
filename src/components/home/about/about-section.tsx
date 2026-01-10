import Image from "@/components/commons/image";
import { FunctionComponent } from "react";

const AboutSection: FunctionComponent = () => {
  return (
    <section id="about" className="container">
      <div className="flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col gap-1 text-center">
          <h2 className="font-heading text-title-4 md:text-title-3">
            About Me
          </h2>
          <span className="text-body-base text-neutral-sub-text-alt">
            Dedicated to turning moments into memories.
          </span>
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-12">
          <div className="flex flex-col w-full md:w-1/2">
            <div className="space-y-4 text-body-base text-neutral-sub-text-alt">
              <p>
                I&apos;m a passionate photographer with a keen eye for capturing
                life&apos;s most precious moments. With years of experience
                behind the lens, I specialize in creating stunning visual
                stories that resonate with emotion and authenticity.
              </p>
              <p>
                Through a unique blend of technical expertise and artistic
                vision, I transform ordinary moments into extraordinary
                memories. Each photograph I take tells a story — preserving the
                beauty and essence of life&apos;s special occasion.
              </p>
              <p>
                My journey is fueled by curiosity and a relentless drive to
                explore new perspectives. I believe every frame holds the
                potential to inspire and connect us all.
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
  );
};

export default AboutSection;
