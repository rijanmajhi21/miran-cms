import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";

export interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

const ButtonLink: FunctionComponent<ButtonLinkProps> = ({
  href,
  children,
  variant = "primary",
  className = "",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full transition-colors";

  const variants = {
    primary:
      "bg-neutral-black text-pure-white text-body-base-bold hover:bg-neutral-base",
    secondary:
      "bg-transparent border border-neutral-black/30 text-neutral-black text-body-base-medium hover:bg-neutral-black/10",
  };

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
