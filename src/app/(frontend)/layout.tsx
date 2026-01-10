import { ReactNode } from "react";
import "@/assets/app.css";

export const metadata = {
  title: "Portfolio",
  description: "Showcasing my work and projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className="bg-pure-white overflow-x-hidden">{children}</body>
    </html>
  );
}
