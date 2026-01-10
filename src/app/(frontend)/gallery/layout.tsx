import Footer from "@/components/footer/footer";
import GalleryHeader from "@/components/gallery/gallery-header";
import { FunctionComponent, ReactNode } from "react";

export const metadata = {
  title: "Gallery | Miran Photography",
  description:
    "Explore my photography collections - from stunning landscapes to captivating portraits and vibrant concerts.",
};

const GalleryLayout: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <GalleryHeader />
      <main className="flex flex-col gap-8 md:gap-12">{children}</main>
      <Footer />
    </>
  );
};

export default GalleryLayout;
