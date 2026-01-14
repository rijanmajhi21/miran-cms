'use client'

import Image from '@/components/commons/image'
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  CalendarIcon,
  CameraIcon,
} from '@heroicons/react/24/outline'
import { FunctionComponent, useState, useEffect, useCallback } from 'react'

export interface GalleryImage {
  url: string
  title?: string
  description?: string
  location?: string
  dateTaken?: string
  camera?: string
}

interface MasonryGridProps {
  images: GalleryImage[]
  boardTitle: string
}

const MasonryGrid: FunctionComponent<MasonryGridProps> = ({ images, boardTitle }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const closeModal = useCallback(() => setSelectedIndex(null), [])

  const goToPrev = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }, [selectedIndex])

  const goToNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }, [selectedIndex, images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return

      switch (e.key) {
        case 'Escape':
          closeModal()
          break
        case 'ArrowLeft':
          goToPrev()
          break
        case 'ArrowRight':
          goToNext()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, closeModal, goToPrev, goToNext])

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedIndex])

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  return (
    <>
      <section className="container py-8 md:py-12">
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3 sm:gap-4">
          {images.map((image, index: number) => (
            <div
              key={index}
              className="break-inside-avoid mb-3 sm:mb-4 group cursor-pointer"
              onClick={() => setSelectedIndex(index)}
            >
              <div className="relative overflow-hidden rounded-xl bg-neutral-lighter">
                <Image
                  src={image.url}
                  alt={image.title || `${boardTitle} - Photo ${index + 1}`}
                  width={400}
                  height={0}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                  style={{ height: 'auto' }}
                />
                <div className="absolute inset-0 bg-neutral-black/0 group-hover:bg-neutral-black/10 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram-style Modal */}
      {selectedIndex !== null && selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-neutral-black/90 flex items-center justify-center"
          onClick={closeModal}
        >
          {/* Close button - top right */}
          <button
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-pure-white/10 hover:bg-pure-white/20 text-pure-white transition-colors"
            onClick={closeModal}
            aria-label="Close"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          {/* Navigation arrow - LEFT (outside modal) */}
          {selectedIndex > 0 && (
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-pure-white/10 hover:bg-pure-white/20 text-pure-white transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                goToPrev()
              }}
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
          )}

          {/* Navigation arrow - RIGHT (outside modal) */}
          {selectedIndex < images.length - 1 && (
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-pure-white/10 hover:bg-pure-white/20 text-pure-white transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          )}

          {/* Modal Content - Instagram Style */}
          <div
            className="relative bg-pure-white rounded-xl sm:rounded-2xl shadow-2xl w-[calc(100%-120px)] max-w-5xl max-h-[85vh] overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left side - Image (natural aspect ratio) */}
            <div className="relative bg-neutral-black flex items-center justify-center md:flex-1 overflow-hidden">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title || `${boardTitle} - Photo ${selectedIndex + 1}`}
                width={1200}
                height={1200}
                sizes="(max-width: 768px) 100vw, 60vw"
                className="w-auto h-auto max-w-full max-h-[50vh] md:max-h-[85vh] object-contain"
                priority
              />
            </div>

            {/* Right side - Details */}
            <div className="w-full md:w-80 lg:w-[340px] flex flex-col border-t md:border-t-0 md:border-l border-neutral-200 bg-pure-white max-h-[40vh] md:max-h-none">
              {/* Header */}
              <div className="p-4 border-b border-neutral-200 shrink-0">
                <p className="text-body-small text-neutral-sub-text">
                  {selectedIndex + 1} of {images.length} • {boardTitle}
                </p>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Title */}
                {selectedImage.title && (
                  <div>
                    <h3 className="text-title-5 font-heading text-neutral-black">
                      {selectedImage.title}
                    </h3>
                  </div>
                )}

                {/* Description */}
                {selectedImage.description && (
                  <div>
                    <p className="text-body-base text-neutral-sub-text leading-relaxed">
                      {selectedImage.description}
                    </p>
                  </div>
                )}

                {/* Metadata */}
                <div className="space-y-3 pt-2">
                  {selectedImage.location && (
                    <div className="flex items-start gap-3">
                      <MapPinIcon className="w-5 h-5 text-neutral-sub-text-alt shrink-0 mt-0.5" />
                      <div>
                        <p className="text-caption text-neutral-sub-text-alt uppercase tracking-wide">
                          Location
                        </p>
                        <p className="text-body-base text-neutral-black">{selectedImage.location}</p>
                      </div>
                    </div>
                  )}

                  {selectedImage.dateTaken && (
                    <div className="flex items-start gap-3">
                      <CalendarIcon className="w-5 h-5 text-neutral-sub-text-alt shrink-0 mt-0.5" />
                      <div>
                        <p className="text-caption text-neutral-sub-text-alt uppercase tracking-wide">
                          Date Taken
                        </p>
                        <p className="text-body-base text-neutral-black">
                          {formatDate(selectedImage.dateTaken)}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedImage.camera && (
                    <div className="flex items-start gap-3">
                      <CameraIcon className="w-5 h-5 text-neutral-sub-text-alt shrink-0 mt-0.5" />
                      <div>
                        <p className="text-caption text-neutral-sub-text-alt uppercase tracking-wide">
                          Camera
                        </p>
                        <p className="text-body-base text-neutral-black">{selectedImage.camera}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Empty state if no details */}
                {!selectedImage.title &&
                  !selectedImage.description &&
                  !selectedImage.location &&
                  !selectedImage.dateTaken &&
                  !selectedImage.camera && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <p className="text-body-base text-neutral-sub-text-alt">
                        No details available
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MasonryGrid
