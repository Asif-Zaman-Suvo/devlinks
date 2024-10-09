"use client";

import Image from "next/image";
import React, { useState } from "react";
import devlinksLogo from "../../images/bird_2.jpg";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
interface ILinkData {
  id: number;
  platform: string;
  url: string;
  error?: string;
}
const Links = () => {
  const [links, setLinks] = useState<ILinkData[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
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
  const getUrlPattern = (platform: string): RegExp => {
    switch (platform) {
      case "github":
        return /^https:\/\/github\.com\/[a-zA-Z0-9-]+$/;
      case "linkedin":
        return /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+$/;
      case "youtube":
        return /^https:\/\/(?:www\.)?youtube\.com\/(?:@?[a-zA-Z0-9-]+|channel\/[a-zA-Z0-9-]+)$/;
      default:
        return /^https?:\/\/.+$/; // Basic URL pattern for other platforms
    }
  };
  const addNewLink = () => {
    const newLink: ILinkData = {
      id: links?.length + 1,
      platform: "",
      url: "",
    };
    setLinks((prevLinks) => [...prevLinks, newLink]);
  };

  const removeLink = (id: number) => {
    setLinks((prevLinks) => prevLinks?.filter((link) => link?.id !== id));
  };

  const updateLink = (id: number, field: "platform" | "url", value: string) => {
    setLinks((prevLinks) =>
      prevLinks?.map((link) =>
        link?.id === id ? { ...link, [field]: value, error: undefined } : link
      )
    );
  };
  const validateLinks = (): boolean => {
    let isValid = true;
    const updatedLinks = links.map((link) => {
      if (!link?.url) {
        isValid = false;
        return { ...link, error: "Please add a link" };
      }
      const urlPattern = getUrlPattern(link?.platform);
      if (!urlPattern.test(link?.url)) {
        isValid = false;
        return { ...link, error: `Please enter a valid ${link?.platform} URL` };
      }

      return { ...link, error: undefined };
    });

    setLinks(updatedLinks);
    return isValid;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (links?.length === 0) {
      setFormError("Please add at least one link");
      return;
    }

    if (validateLinks()) {
      console.log("Form submitted successfully", links);
      // Here you would typically send the data to your backend
    } else {
      setFormError("Please correct the errors before submitting");
    }
  };
  return (
    <div className="bg-[#943434] px-4 sm:px-6 pb-6">
      <div className="bg-[#943434] grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Mobile mockups - hidden on smaller screens */}
        <div className="hidden md:block md:col-span-5 py-10 bg-white">
          <div className="relative mx-auto border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
            <div className="w-[148px] h-[18px] top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="h-[46px] w-[3px] absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px]">
              <Image src={devlinksLogo} width={272} height={572} alt="Mockup" />
            </div>
          </div>
        </div>

        {/* Content section - full width on smaller screens */}
        <div className="col-span-1 md:col-span-7 bg-white p-6">
          <h2 className="text-4xl font-bold mb-4">Customize your links</h2>
          <p className="mb-10 text-gray-400">
            Add/edit/remove links below and then share your profile with the
            world
          </p>
          <form onSubmit={handleSubmit}>
            <button
              type="button"
              onClick={addNewLink}
              className="bg-transparent w-full text-[#633BFE] font-semibold py-2 px-4 border border-[#633BFE] rounded-xl mb-4"
            >
              + Add New Link
            </button>
            {links?.map((link) => (
              <div key={link?.id} className="bg-[#FAFAFA] mt-10 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-500">Link #{link?.id}</h3>
                  <button
                    type="button"
                    className="text-gray-500"
                    onClick={() => removeLink(link?.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor={`platform-${link?.id}`}
                      className="block text-sm font-medium text-gray-500"
                    >
                      Platform
                    </label>
                    <div className="relative">
                      <select
                        id={`platform-${link?.id}`}
                        value={link?.platform}
                        onChange={(e) =>
                          updateLink(link?.id, "platform", e.target.value)
                        }
                        className="mt-1 block w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      >
                        <option value="">Select a platform</option>
                        <option value="github">
                          {React.createElement(FaGithub, {
                            className: "inline mr-2",
                          })}
                          GitHub
                        </option>
                        <option value="linkedin">
                          {React.createElement(FaLinkedin, {
                            className: "inline mr-2",
                          })}
                          LinkedIn
                        </option>
                        <option value="youtube">
                          {React.createElement(FaYoutube, {
                            className: "inline mr-2",
                          })}
                          YouTube
                        </option>
                      </select>
                      {link?.platform && (
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500 text-xl">
                            {getPlatformIcon(link?.platform)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor={`link-${link?.id}`}
                      className="block text-sm font-medium text-gray-500"
                    >
                      Link
                    </label>
                    <input
                      id={`link-${link?.id}`}
                      type="url"
                      value={link?.url}
                      onChange={(e) =>
                        updateLink(link?.id, "url", e.target.value)
                      }
                      className={`mt-1 block w-full px-3 py-2 bg-white border ${
                        link?.error ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                      placeholder="paste a link here"
                    />
                    {link?.error && (
                      <p className="mt-2 text-sm text-red-600">{link?.error}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {formError && (
              <p className="mt-4 text-sm text-red-600">{formError}</p>
            )}
            <button
              type="submit"
              className="mt-6 w-full bg-[#633BFE] text-white font-semibold py-2 px-4 rounded-xl"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Links;
