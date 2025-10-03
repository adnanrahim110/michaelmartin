"use client";

import { Button } from "@/components/ui/button";
import { links } from "@/constants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Info, Layers, Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const goingDown = y > lastY.current;
          setAtTop(y < 8);
          setVisible(!goingDown || y < 8);
          lastY.current = y;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href) => pathname === href;

  return (
    <>
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: visible ? 0 : -86, opacity: visible ? 1 : 0.98 }}
        transition={{ type: "tween", duration: 0.22 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "bg-surface/60 backdrop-blur",
          "border-b border-border/70",
          "shadow-[0_10px_30px_-12px_rgba(0,0,0,.65)]"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex h-16 md:h-20 items-center justify-between">
            <Link
              href="/"
              className="text-xl md:text-2xl font-semibold tracking-tight text-text"
            >
              <img src="/images/logo.png" className="max-w-32 h-auto" alt="" />
            </Link>

            <div className="hidden md:flex items-center gap-3">
              <div className="relative">
                <div className="flex items-center gap-1 px-1 py-1">
                  {links.map((l) => {
                    const active = isActive(l.href);
                    const hot = hovered === l.href || active;
                    return (
                      <div
                        key={l.href}
                        onMouseEnter={() => setHovered(l.href)}
                        onMouseLeave={() => setHovered(null)}
                        className="relative"
                      >
                        {hot && (
                          <motion.span
                            layoutId="pill"
                            className="absolute inset-0 rounded-full bg-primary/20 opacity-100"
                            transition={{
                              type: "spring",
                              stiffness: 420,
                              damping: 36,
                              mass: 0.28,
                            }}
                          />
                        )}
                        <Link
                          href={l.href}
                          className={cn(
                            "relative z-10 flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-200",
                            hot ? "text-text" : "text-text-dim"
                          )}
                        >
                          {l.label}
                          {active && (
                            <motion.span
                              layoutId="underline"
                              className="pointer-events-none absolute left-4 right-4 -bottom-[6px] h-[2px] rounded-full bg-primary/90"
                              transition={{
                                type: "spring",
                                stiffness: 520,
                                damping: 38,
                              }}
                            />
                          )}
                          <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Button asChild>
                <Link href="/contact">Get in touch</Link>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "tween", duration: 0.18 }}
              className="md:hidden border-t border-border bg-surface/95 backdrop-blur"
            >
              <div className="max-w-7xl mx-auto px-3 py-2">
                <div className="flex flex-col p-1">
                  {links.map((l, i) => (
                    <motion.div
                      key={l.href}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.02 * i, duration: 0.18 }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block px-4 py-3 text-sm rounded-lg transition-all duration-200",
                          isActive(l.href)
                            ? "text-primary bg-muted/50"
                            : "text-text-dim hover:text-text hover:bg-muted/40"
                        )}
                      >
                        {l.label}
                      </Link>
                    </motion.div>
                  ))}
                  <Button asChild className="mt-2">
                    <Link href="/contact">Get in touch</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="h-16 md:h-20" />

      <nav className="md:hidden fixed bottom-3 left-0 right-0 z-50">
        <div className="mx-auto max-w-md px-3">
          <div className="rounded-2xl bg-surface/80 backdrop-blur border border-border shadow-[0_10px_30px_-12px_rgba(0,0,0,.65)]">
            <div className="grid grid-cols-4">
              {links.map((l) => {
                const Icon = l.icon;
                const active = isActive(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "relative flex flex-col items-center justify-center py-2 text-[11px]",
                      active ? "text-primary" : "text-text-dim"
                    )}
                  >
                    {l.label}
                    {active && (
                      <span className="absolute -top-[2px] h-1 w-1 rounded-full bg-primary" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
