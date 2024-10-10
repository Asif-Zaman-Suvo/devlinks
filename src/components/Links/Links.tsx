"use client";
import Image from "next/image";
import React, { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import devlinksLogo from "../../images/bird_2.jpg";
import {
  FaChevronRight,
  FaGithub,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import dynamic from "next/dynamic";
const DraggableList = dynamic(() => import("../DraggableList/DraggableList"), {
  ssr: false,
});

interface ILinkData {
  id: number;
  platform: string;
  url: string;
  error?: string;
}

const Links = () => {
  const [links, setLinks] = useState<ILinkData[]>([]); // initial empty links
  const [nextId, setNextId] = useState(1);
  const [formError, setFormError] = useState<string | null>(null);
  const [savedLinks, setSavedLinks] = useState<ILinkData[]>([]);

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
    if (links.length >= 3) {
      setFormError("You can only add up to 3 links.");
      return;
    }
    const newLink: ILinkData = {
      id: nextId,
      platform: "",
      url: "",
    };
    setLinks((prevLinks) => [...prevLinks, newLink]);
    setNextId(nextId + 1);
    setFormError(null);
  };

  const removeLink = (id: number) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
  };

  const updateLink = (id: number, field: "platform" | "url", value: string) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, [field]: value, error: undefined } : link
      )
    );
  };

  const validateLinks = (): boolean => {
    let isValid = true;
    const updatedLinks = links.map((link) => {
      if (!link.platform || !link.url) {
        isValid = false;
        return { ...link, error: "Please fill in both platform and link" };
      }
      const urlPattern = getUrlPattern(link.platform);
      if (!urlPattern.test(link.url)) {
        isValid = false;
        return { ...link, error: `Please enter a valid ${link.platform} URL` };
      }
      return { ...link, error: undefined };
    });
    setLinks(updatedLinks);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (links.length === 0) {
      setFormError("Please add at least one link");
      return;
    }

    if (validateLinks()) {
      console.log("Form submitted successfully", links);
      setSavedLinks(links); // Save the links to be displayed in the mockup
      // Here you would typically send the data to your backend
    } else {
      setFormError("Please correct the errors before submitting");
    }
  };

  // Handle drag end to reorder links
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    // Add this check to ensure we're handling the correct droppable
    if (result.source.droppableId !== "links-list") return;
    const items = Array.from(links);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setLinks(items);
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
  const formatPlatformName = (platform: string): string => {
    switch (platform.toLowerCase()) {
      case "github":
        return "GitHub";
      case "youtube":
        return "YouTube";
      case "linkedin":
        return "LinkedIn";
      default:
        return platform.charAt(0).toUpperCase() + platform.slice(1);
    }
  };
  const draggableItems = links.map((link) => ({
    id: link.id,
    content: (
      <div className="bg-[#FAFAFA] mt-10 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-500">Link #{link?.id}</h3>
          <button
            type="button"
            className="text-gray-500"
            onClick={() => removeLink(link.id)}
          >
            Remove
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor={`platform-${link.id}`}
              className="block text-sm font-medium text-gray-500"
            >
              Platform
            </label>
            <div className="relative">
              <select
                id={`platform-${link.id}`}
                value={link.platform}
                onChange={(e) =>
                  updateLink(link.id, "platform", e.target.value)
                }
                className="mt-1 block w-full pl-10 pr-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              >
                <option value="">Select a platform</option>
                <option value="github">GitHub</option>
                <option value="linkedin">LinkedIn</option>
                <option value="youtube">YouTube</option>
              </select>
              {link.platform && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500 text-xl">
                    {getPlatformIcon(link.platform)}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor={`link-${link.id}`}
              className="block text-sm font-medium text-gray-500"
            >
              Link
            </label>
            <input
              id={`link-${link.id}`}
              type="url"
              value={link.url}
              onChange={(e) => updateLink(link.id, "url", e.target.value)}
              className={`mt-1 block w-full px-3 py-2 bg-white border ${
                link.error ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
              placeholder="paste a link here"
            />
            {link.error && (
              <p className="mt-2 text-sm text-red-600">{link.error}</p>
            )}
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <div className="bg-[#943434] px-4 sm:px-6 pb-6">
      <div className="bg-[#943434] grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Mobile mockups */}
        <div className="hidden md:block md:col-span-5 py-10 bg-white">
          <div className="relative mx-auto border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px]">
              <Image src={devlinksLogo} width={272} height={572} alt="Mockup" />
              <div className="p-4 space-y-4">
                {savedLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between p-3 rounded-lg text-white ${getPlatformColor(
                      link.platform
                    )}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">
                        {getPlatformIcon(link.platform)}
                      </span>
                      <span className="text-sm font-medium">
                        {formatPlatformName(link.platform)}
                      </span>
                    </div>
                    <FaChevronRight className="text-sm" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Content section */}
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
            {draggableItems.length > 0 && (
              <div key={links.length > 0 ? "links-list" : "empty-list"}>
                <DraggableList items={draggableItems} onDragEnd={onDragEnd} />
              </div>
            )}
            {formError && (
              <p className="mt-4 text-red-600 text-center">{formError}</p>
            )}
            <button
              type="submit"
              className="bg-[#633BFE] text-white font-semibold py-2 px-4 rounded-xl mt-4 w-full"
            >
              Save Links
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Links;
