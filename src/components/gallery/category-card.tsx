import Image from '@/components/commons/image'
import Link from 'next/link'
import { FunctionComponent } from 'react'

export interface CategoryCardProps {
  title: string
  href: string
  images: (string | null | undefined)[]
  photoCount?: number
}

// Placeholder component for empty image slots
const ImagePlaceholder = () => (
  <div className="absolute inset-0 bg-neutral-100 border border-neutral-200" />
)

const CategoryCard: FunctionComponent<CategoryCardProps> = ({
  title,
  href,
  images,
  photoCount,
}) => {
  // Ensure we always have 3 slots (fill with null if less than 3 images)
  const imageSlots = [images[0] || null, images[1] || null, images[2] || null]
  const actualPhotoCount = photoCount ?? images.filter(Boolean).length

  return (
    <Link href={href} className="group block">
      <article className="flex flex-col">
        <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-neutral-200">
          <div className="absolute inset-0 grid grid-cols-[1fr_0.6fr] gap-0.5">
            {/* Main large image */}
            <div className="relative h-full overflow-hidden">
              {imageSlots[0] ? (
                <Image
                  src={imageSlots[0]}
                  alt={`${title} - Photo 1`}
                  fill
                  sizes="(max-width: 640px) 30vw, (max-width: 1024px) 30vw, 20vw"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <ImagePlaceholder />
              )}
            </div>

            {/* Two smaller images */}
            <div className="flex flex-col gap-0.5">
              <div className="relative flex-1 overflow-hidden">
                {imageSlots[1] ? (
                  <Image
                    src={imageSlots[1]}
                    alt={`${title} - Photo 2`}
                    fill
                    sizes="(max-width: 640px) 20vw, (max-width: 1024px) 20vw, 15vw"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <ImagePlaceholder />
                )}
              </div>
              <div className="relative flex-1 overflow-hidden">
                {imageSlots[2] ? (
                  <Image
                    src={imageSlots[2]}
                    alt={`${title} - Photo 3`}
                    fill
                    sizes="(max-width: 640px) 20vw, (max-width: 1024px) 20vw, 15vw"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <ImagePlaceholder />
                )}
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-neutral-black/0 group-hover:bg-neutral-black/10 transition-colors duration-300" />
        </div>

        <div className="mt-2 sm:mt-3 px-0.5 sm:px-1">
          <h3 className="text-body-base-bold sm:text-body-big-bold text-neutral-black group-hover:text-neutral-sub-text transition-colors">
            {title}
          </h3>
          <p className="text-caption sm:text-body-small text-neutral-sub-text mt-0.5">
            {actualPhotoCount} {actualPhotoCount === 1 ? 'Photo' : 'Photos'}
          </p>
        </div>
      </article>
    </Link>
  )
}

export default CategoryCard
