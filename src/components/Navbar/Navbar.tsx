import Image from "next/image";
import React from "react";
import { HiLink, HiUser, HiEye } from "react-icons/hi";
import devlinksLogo from "../../images/bird_2.jpg";

const Navbar = () => {
  return (
    <div className="bg-[#943434] p-4 sm:p-6">
      <nav className="bg-white w-full max-w-full overflow-hidden">
        <div className="flex items-center justify-between p-2 sm:p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src={devlinksLogo}
              width={32}
              height={32}
              alt="devlinks Logo"
            />
            <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-black hidden sm:inline">
              devlinks
            </span>
          </a>

          {/* Center buttons for desktop and tablet */}
          <div className="hidden sm:flex items-center space-x-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#F1ECFB] text-[#633BFE] rounded-md hover:bg-[#EFEDFB] transition-colors">
              <HiLink className="text-lg" />
              <span className="font-medium">Links</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors">
              <HiUser className="text-lg" />
              <span className="font-medium">Profile Details</span>
            </button>
          </div>

          <button
            type="button"
            className="text-[#633BFE] bg-white border-2 border-[#633BFE] focus:ring-4 focus:outline-none focus:ring-[#633BFE]/30 font-medium rounded-lg text-sm px-2 sm:px-4 py-2 text-center flex items-center gap-2"
          >
            <HiEye className="text-lg" />
            <span className="hidden sm:inline">Preview</span>
          </button>
        </div>

        {/* Mobile buttons */}
        <div className="sm:hidden flex justify-center space-x-4 pb-4">
          <button className="p-2 bg-[#F1ECFB] text-[#633BFE] rounded-md hover:bg-[#EFEDFB] transition-colors">
            <HiLink className="text-lg" />
          </button>
          <button className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors">
            <HiUser className="text-lg" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
