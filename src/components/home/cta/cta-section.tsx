import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FunctionComponent } from "react";

const CTASection: FunctionComponent = () => {
  return (
    <section className="container">
      <div className="relative bg-neutral-black rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-black via-neutral-base to-neutral-black opacity-80" />

        <div className="relative flex flex-col items-center text-center px-6 py-12 md:py-16 lg:py-20">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-pure-white/10 mb-6">
            <EnvelopeIcon className="w-7 h-7 text-pure-white" />
          </div>

          <h2 className="font-heading text-title-4 md:text-title-3 lg:text-title-2 text-pure-white mb-3">
            Let&apos;s Work Together
          </h2>

          <p className="text-body-base text-neutral-disabled max-w-xl mb-8">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s
            create something amazing together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#contact"
              className="px-8 py-3 bg-pure-white text-neutral-black text-body-base-bold rounded-full hover:bg-neutral-lighter transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="#gallery"
              className="px-8 py-3 bg-transparent border border-pure-white/30 text-pure-white text-body-base-medium rounded-full hover:bg-pure-white/10 transition-colors"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
