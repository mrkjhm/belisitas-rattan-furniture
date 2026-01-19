import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import LenisProvider from "../Providers/LenisProvider";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <LenisProvider>
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </LenisProvider>
    </div>
  );
}
