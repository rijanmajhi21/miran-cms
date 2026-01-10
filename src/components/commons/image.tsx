import NextImage, { ImageProps as NextImageProps } from "next/image";
import { FunctionComponent } from "react";

export type ImageProps = Omit<NextImageProps, "alt"> & {
  alt: string;
  className?: string;
  objectFit?: "cover" | "contain" | "fill" | "none";
};

const Image: FunctionComponent<ImageProps> = ({
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  priority,
  placeholder,
  blurDataURL,
  quality,
  className = "",
  objectFit = "cover",
  ...props
}) => {
  const objectFitClass = {
    cover: "object-cover",
    contain: "object-contain",
    fill: "object-fill",
    none: "object-none",
  }[objectFit];

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      sizes={sizes}
      priority={priority}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      quality={quality}
      className={`${objectFitClass} ${className}`.trim()}
      {...props}
    />
  );
};

export default Image;
