"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface ActiveLinkProps {
  href: string;
  children: React.ReactNode;
  className: string;
  activeClassName: string;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({
  href,
  children,
  className,
  activeClassName,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? activeClassName : ""}`.trim()} // Added .trim() to clean up extra spaces
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
