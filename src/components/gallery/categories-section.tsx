import { FunctionComponent } from 'react'
import CategoryCard from './category-card'
import { GalleryCategory } from './constant'

interface CategoriesSectionProps {
  categories: GalleryCategory[]
}

const CategoriesSection: FunctionComponent<CategoriesSectionProps> = ({ categories }) => {
  return (
    <section className="container py-12 md:py-16">
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-1">
          <h2 className="text-title-4 md:text-title-3 font-heading">Browse Collections</h2>
          <p className="text-body-base text-neutral-sub-text">
            Explore my photography organized by category
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
            {categories.map((category) => {
              // Always use board images - no heroImage fallback
              const displayImages = category.images.slice(0, 3)

              return (
                <CategoryCard
                  key={category.slug}
                  title={category.title}
                  href={category.href}
                  images={displayImages}
                  photoCount={category.images.length}
                />
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-body-lg text-neutral-sub-text-alt mb-2">No collections yet</p>
            <p className="text-body-base text-neutral-sub-text">
              Check back soon for new photo galleries
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default CategoriesSection
