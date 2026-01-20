"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { SearchInput } from "../ui/SearchInput";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

type LenisInstance = {
  start?: () => void;
  stop?: () => void;
};

export function Navbar() {
  const getLenis = (): LenisInstance | undefined =>
    (window as unknown as { lenis?: LenisInstance }).lenis;

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  
    if (debounceTimerRef.current) { 
      clearTimeout(debounceTimerRef.current);
    }
    
      debounceTimerRef.current = setTimeout(() => {
        const v = value.trim();
    
        if (v) {
          router.push(`/products?search=${encodeURIComponent(v)}`);
    
          // ✅ auto-close after navigation (mobile + search)
          setIsSearchOpen(false);
          setIsOpen(false);
          setSearchQuery("")
        } else if (pathname === "/products") {
          router.push("/products");
    
          // optional close too
          setIsSearchOpen(false);
          setIsOpen(false);
        }
      }, 500);
  };
  

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Focus search input when it opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      // Small delay to ensure the input is rendered
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Close search on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isSearchOpen]);

  // Auto-close search when route changes
  useEffect(() => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "15px";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const lenis = getLenis();

    if (!isOpen) {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
      lenis?.start?.();
      return;
    }

    // lock scroll
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.paddingRight = "15px";
    lenis?.stop?.();

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
      lenis?.start?.();
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/75 backdrop-blur-md border-b border-gray-200">
      <nav className="container mx-auto px-6 h-20  flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-2xl font-semibold tracking-tight"
        >
          <Image
            src="/belisitas-logo.png"
            alt="Belisitas logo"
            width={150}
            height={100}
            className="md:w-[120px] full w-[100px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <LayoutGroup id="desktop-nav">
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isContact = link.href === "/contact";

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative text-sm  transition-all  py-1 rounded-full ${
                      // location.pathname === link.href
                      //   ? "text-primary"
                      //   : "text-muted-foreground"
                      isContact && isActive
                        ? "bg-[#0D2893] text-white px-4 py-2"
                        : isContact
                        ? "bg-accent text-accent-foreground hover:bg-accent px-4 py-2"
                        : isActive
                        ? "text-[#0D2893] font-bold"
                          : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    {isActive && !isContact && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent "
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </LayoutGroup>

        {/* Search Icon and Expandable Search Bar */}
        <div className="hidden lg:flex items-center gap-4">
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <SearchInput
                  // ref={searchInputRef}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                />
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              if (isSearchOpen) {
                setSearchQuery("");
              }
            }}
            className="p-2 text-[#0D2893] transition-colors"
            aria-label="Toggle search"
          >
            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
        </div>

        {/* Mobile: Search Icon and Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          {/* <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (isSearchOpen) {
                  setSearchQuery("");
                }
              }}
              className="p-2 text-primary"
              aria-label="Toggle search"
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button> */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 -mr-2 text-background"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      <div className="fixed z-60 flex-1">
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
          className={`fixed inset-0 h-screen bg-black/50  transition-opacity duration-500 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <aside
            className={`h-screen bg-white fixed top-0 z-50 right-0 sm:w-1/2 w-3/4 shadow-lg transition-all duration-500 ease-in-out ${
              isOpen
                ? "translate-x-0 opacity-100 pointer-events-auto"
                : "translate-x-full opacity-100 pointer-events-none"
            }`}
            onClick={(e) => e.stopPropagation()} // optional extra safety
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="absolute top-5 right-5 p-2 -mr-2 text-background"
              aria-label="Toggle menu"
            >
              <X size={24} />
            </button>
            <ul className="container mx-auto px-6 pt-10 pb-3 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const isContact = link.href === "/contact";

                return (
                  <motion.li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`
              block py-3 px-4 rounded-lg font-medium transition-colors
              ${
                isContact && isActive
                  ? "bg-primary text-primary-foreground"
                  : isContact
                  ? "bg-accent text-accent-foreground"
                  : isActive
                  ? "text-accent"
                  : "text-muted-foreground hover:text-background"
              }
            `}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden  border-border overflow-hidden"
            >
              <div className="container mx-auto py-4">
                <SearchInput
                  // ref={searchInputRef}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                />
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </header>
  );
}
