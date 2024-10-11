"use client";
import Image from "next/image";
import React from "react";
import { HiLink, HiUser, HiEye } from "react-icons/hi";
import devlinksLogo from "../../images/dev.png";
import Link from "next/link";
import ActiveLink from "./ActiveLink";
import Logout from "../LogoutForm/LogoutForm";
import { useSession } from "next-auth/react";

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div className="bg-[#FAFAFA] p-4 sm:p-6">
      <nav className="bg-white w-full max-w-full overflow-hidden">
        <div className="flex items-center justify-between p-2 sm:p-4">
          <a
            href="/add-links"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src={devlinksLogo}
              width={32}
              height={32}
              alt="devlinks_Logo"
            />
            <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-black hidden sm:inline">
              devlinks
            </span>
          </a>

          {/* Center buttons for desktop and tablet */}
          <div className="hidden sm:flex items-center space-x-2">
            <ActiveLink
              href="/add-links"
              className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors bg-white text-gray-500 hover:bg-[#EFEDFB]"
              activeClassName="bg-[#EFEDFB] text-[#633BFE]"
            >
              <HiLink className="text-lg" />
              <span className="font-medium">Links</span>
            </ActiveLink>
            <ActiveLink
              href="/profile-details"
              className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors bg-white text-gray-500 hover:bg-blue-200"
              activeClassName="bg-blue-200 text-blue-600"
            >
              <HiUser className="text-lg" />
              <span className="font-medium">Profile Details</span>
            </ActiveLink>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/preview-link" passHref>
              <button
                type="button"
                className="text-[#633BFE] bg-white border-2 border-[#633BFE] focus:ring-4 focus:outline-none focus:ring-[#633BFE]/30 font-medium rounded-lg text-sm px-2 sm:px-4 py-2 text-center flex items-center gap-2"
              >
                <HiEye className="text-lg" />
                <span className="hidden sm:inline">Preview</span>
              </button>
            </Link>
            <Logout session={session} />
          </div>
        </div>

        {/* Mobile buttons */}
        <div className="sm:hidden flex justify-center space-x-4 pb-4">
          <ActiveLink
            href="/"
            className="p-2 rounded-md transition-colors bg-white text-gray-500 hover:bg-[#EFEDFB]"
            activeClassName="bg-[#F1ECFB] text-[#633BFE]"
          >
            <HiLink className="text-lg" />
          </ActiveLink>
          <ActiveLink
            href="/profile-details"
            className="p-2 rounded-md transition-colors bg-white text-gray-500 hover:bg-blue-200"
            activeClassName="bg-blue-100 text-blue-600"
          >
            <HiUser className="text-lg" />
          </ActiveLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
