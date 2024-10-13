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
      <nav className="bg-white w-full max-w-full overflow-hidden px-2 py-2">
        <div className="flex items-center justify-between space-x-0 sm:space-x-2">
          {/* Logo and Brand Name */}
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
            <span className="self-center sm:block sm:text-xl hidden font-bold whitespace-nowrap dark:text-black">
              devlinks
            </span>
          </a>

          {/* Links and Profile Details */}
          <div className="flex items-center gap-4">
            <ActiveLink
              href="/add-links"
              className="flex items-center gap-2 px-2 py-1 rounded-md transition-colors bg-white text-gray-500 hover:bg-[#EFEDFB]"
              activeClassName="bg-[#EFEDFB] text-[#633BFE]"
            >
              <HiLink className="text-lg" />
              <span className="hidden md:block md:text-sm xl:text-xl">
                Links
              </span>
            </ActiveLink>
            <ActiveLink
              href="/profile-details"
              className="flex items-center gap-2 px-4 py-2 rounded-md transition-colors bg-white text-gray-500 hover:bg-blue-200"
              activeClassName="bg-blue-200 text-blue-600"
            >
              <HiUser className="text-lg" />
              <span className="hidden md:block md:text-sm xl:text-xl">
                Profile Details
              </span>
            </ActiveLink>
          </div>

          {/* Preview and Logout */}
          <div className="flex items-center gap-4">
            <Link href="/preview-link" passHref>
              <button
                type="button"
                className="text-[#633BFE] bg-white border-2 border-[#633BFE] focus:ring-4 focus:outline-none focus:ring-[#633BFE]/30 font-medium rounded-lg text-sm px-2 py-1.5 text-center flex items-center gap-2"
              >
                <HiEye className="text-lg" />
                <span className="hidden md:block md:text-sm xl:text-xl">
                  Preview
                </span>
              </button>
            </Link>
            <Logout session={session} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
