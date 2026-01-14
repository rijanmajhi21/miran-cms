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
      {/* Masonry Grid */}
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
              {/* Image title below */}
              {image.title && (
                <p className="mt-2 text-body-small text-neutral-black truncate px-0.5">
                  {image.title}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Instagram-style Modal */}
      {selectedIndex !== null && selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-neutral-black/90 flex items-center justify-center p-0 md:p-6"
          onClick={closeModal}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-pure-white/10 hover:bg-pure-white/20 text-pure-white transition-colors"
            onClick={closeModal}
            aria-label="Close"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          {/* Navigation arrows - Desktop only */}
          {selectedIndex > 0 && (
            <button
              className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-pure-white/10 hover:bg-pure-white/20 text-pure-white transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                goToPrev()
              }}
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
          )}

          {selectedIndex < images.length - 1 && (
            <button
              className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-pure-white/10 hover:bg-pure-white/20 text-pure-white transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          )}

          {/* Modal Content - Fixed height, no layout shift */}
          <div
            className="relative bg-pure-white w-full h-full md:w-[90vw] md:max-w-6xl md:h-[85vh] md:rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left side - Image (fixed height, image adapts) */}
            <div className="relative bg-neutral-black flex-1 flex items-center justify-center min-h-[40vh] md:min-h-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage.url}
                alt={selectedImage.title || `${boardTitle} - Photo ${selectedIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                style={{ maxHeight: 'calc(85vh - 0px)' }}
              />
            </div>

            {/* Right side - Details (scrollable) */}
            <div className="w-full md:w-[320px] lg:w-[360px] shrink-0 flex flex-col bg-pure-white border-t md:border-t-0 md:border-l border-neutral-200 overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-neutral-200 shrink-0">
                <p className="text-body-small text-neutral-sub-text">
                  {selectedIndex + 1} of {images.length}
                </p>
                <p className="text-body-base text-neutral-black font-medium">{boardTitle}</p>
              </div>

              {/* Scrollable Content */}
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
                      <p className="text-body-base text-neutral-sub-text-alt">No details available</p>
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
