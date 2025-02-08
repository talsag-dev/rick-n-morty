"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";

export function FloatingHomeButton() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <Link
      href="/"
      className="fixed bottom-10 right-10 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-white shadow-lg transition hover:bg-yellow-600"
      title="Go Home"
    >
      <Home className="h-6 w-6" />
    </Link>
  );
}
