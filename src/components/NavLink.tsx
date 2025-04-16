"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  label: string;
  href: string;
}

export default function NavLink({ label, href }: NavLinkProps) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`nav-link ${isActive ? "nav-link-active" : ""}`}
    >
      {label}
    </Link>
  );
}
