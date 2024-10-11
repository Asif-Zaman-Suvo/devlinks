"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import { useSession } from "next-auth/react";

interface LayoutContentProps {
  children: React.ReactNode;
}

const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  const pathname = usePathname();
  const { status } = useSession();
  const isPublicRoute = pathname === "/";
  const isPreviewPage = pathname === "/preview-link";

  return (
    <>
      {!isPublicRoute && !isPreviewPage && status === "authenticated" && (
        <Navbar />
      )}
      {children}
    </>
  );
};

export default LayoutContent;
