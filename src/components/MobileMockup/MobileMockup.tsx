"use client";
import Image from "next/image";
import React from "react";
import {
  FaChevronRight,
  FaGithub,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { useAppContext } from "../AppContext/AppContext";

interface ILinkData {
  id: number;
  platform: string;
  url: string;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string | null;
}

interface MobileMockupProps {
  savedLinks: ILinkData[];
  profileData: ProfileData;
}

const MobileMockup: React.FC<MobileMockupProps> = () => {
  const { savedLinks, profileData } = useAppContext();

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <FaGithub />;
      case "linkedin":
        return <FaLinkedin />;
      case "youtube":
        return <FaYoutube />;
      default:
        return null;
    }
  };

  const getPlatformColor = (platform: string): string => {
    switch (platform.toLowerCase()) {
      case "github":
        return "bg-gray-800";
      case "youtube":
        return "bg-red-600";
      case "linkedin":
        return "bg-blue-600";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="hidden md:block md:col-span-5 py-10 bg-white">
      <div className="relative mx-auto border-[14px] border-gray-900 rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
        <div className="absolute top-0 w-[148px] h-[18px] bg-gray-900 left-1/2 transform -translate-x-1/2 rounded-b-[1rem] z-20"></div>
        <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white">
          <div className="flex flex-col items-center justify-start pt-10 pb-6 bg-gray-100">
            {profileData?.profileImage ? (
              <Image
                src={profileData?.profileImage}
                alt="Profile"
                width={96}
                height={96}
                className="rounded-full border-4 border-purple-500"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <h2 className="mt-4 text-2xl font-bold">
              {profileData?.firstName} {profileData?.lastName}
            </h2>
            <p className="text-gray-500">{profileData?.email}</p>
          </div>
          <div className="p-4 space-y-4">
            {savedLinks?.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-3 rounded-lg text-white ${getPlatformColor(
                  link?.platform
                )}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">
                    {getPlatformIcon(link.platform)}
                  </span>
                  <span className="text-sm font-medium">{link.platform}</span>
                </div>
                <FaChevronRight className="text-sm" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMockup;
