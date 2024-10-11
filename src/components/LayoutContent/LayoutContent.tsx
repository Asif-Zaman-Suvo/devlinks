"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";

interface LayoutContentProps {
  children: React.ReactNode;
}

const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  const pathname = usePathname();
  const isPreviewPage = pathname === "/preview-link";

  return (
    <>
      {!isPreviewPage && <Navbar />}
      {children}
    </>
  );
};

export default LayoutContent;
