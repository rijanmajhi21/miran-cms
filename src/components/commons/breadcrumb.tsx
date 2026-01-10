import Link from "next/link";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import { FunctionComponent } from "react";
import { ROUTE_HOME } from "@/data/routes";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: FunctionComponent<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="container py-4">
      <nav className="flex items-center gap-2 text-body-small flex-wrap">
        <Link
          href={ROUTE_HOME}
          className="flex items-center gap-1 text-neutral-sub-text hover:text-neutral-black transition-colors"
        >
          <HomeIcon className="w-4 h-4" />
          <span>Home</span>
        </Link>

        {items.map((item, index: number) => (
          <span key={index} className="flex items-center gap-2">
            <ChevronRightIcon className="w-3 h-3 text-neutral-disabled" />
            {item.href ? (
              <Link
                href={item.href}
                className="text-neutral-sub-text hover:text-neutral-black transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-neutral-black font-medium">
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumb;
