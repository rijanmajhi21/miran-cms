"use client";

import Image from "@/components/commons/image";
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { FunctionComponent, useState, useEffect, useCallback } from "react";

interface MasonryGridProps {
  images: string[];
  title: string;
}

const MasonryGrid: FunctionComponent<MasonryGridProps> = ({
  images,
  title,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeModal = useCallback(() => setSelectedIndex(null), []);

  const goToPrev = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  }, [selectedIndex]);

  const goToNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  }, [selectedIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      switch (e.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowLeft":
          goToPrev();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, closeModal, goToPrev, goToNext]);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

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
                  src={image}
                  alt={`${title} - Photo ${index + 1}`}
                  width={400}
                  height={0}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                  style={{ height: "auto" }}
                />
                <div className="absolute inset-0 bg-neutral-black/0 group-hover:bg-neutral-black/10 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-neutral-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 lg:p-8"
          onClick={closeModal}
        >
          <div
            className="relative bg-pure-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-neutral-black/50 hover:bg-neutral-black/70 text-pure-white transition-colors"
              onClick={closeModal}
              aria-label="Close"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            {selectedIndex > 0 && (
              <button
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-neutral-black/50 hover:bg-neutral-black/70 text-pure-white transition-colors"
                onClick={goToPrev}
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
            )}

            {selectedIndex < images.length - 1 && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-neutral-black/50 hover:bg-neutral-black/70 text-pure-white transition-colors"
                onClick={goToNext}
                aria-label="Next image"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            )}

            <div className="relative aspect-[4/3] w-full bg-neutral-black">
              <Image
                src={images[selectedIndex]}
                alt={`${title} - Photo ${selectedIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-contain"
                priority
              />
            </div>

            <div className="flex items-center justify-between px-4 py-3 bg-neutral-lighter border-t border-neutral-light">
              <span className="text-body-small text-neutral-sub-text">
                {selectedIndex + 1} of {images.length}
              </span>
              <span className="text-body-small text-neutral-sub-text">
                {title}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MasonryGrid;
