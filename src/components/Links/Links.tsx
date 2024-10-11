"use client";

import React, { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import dynamic from "next/dynamic";
import MobileMockup from "../MobileMockup/MobileMockup";
import { useAppContext } from "../AppContext/AppContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const { savedLinks, setSavedLinks, profileData } = useAppContext();
  const [links, setLinks] = useState<ILinkData[]>([]);
  const [nextId, setNextId] = useState(1);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (savedLinks?.length > 0) {
      setLinks(savedLinks);
      setNextId(Math.max(...savedLinks.map((link) => link.id)) + 1);
    }
  }, [savedLinks]);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "GitHub":
        return <FaGithub />;
      case "LinkedIn":
        return <FaLinkedin />;
      case "YouTube":
        return <FaYoutube />;
      default:
        return null;
    }
  };

  const getUrlPattern = (platform: string): RegExp => {
    switch (platform) {
      case "GitHub":
        return /^https:\/\/github\.com\/[a-zA-Z0-9-]+$/;
      case "LinkedIn":
        return /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+$/;
      case "YouTube":
        return /^https:\/\/(?:www\.)?youtube\.com\/(?:@?[a-zA-Z0-9-]+|channel\/[a-zA-Z0-9-]+)$/;
      default:
        return /^https?:\/\/.+$/; // Basic URL pattern for other platforms
    }
  };

  const addNewLink = () => {
    if (links.length >= 3) {
      setFormError("You can only add up to 3 links.");
      toast.error("ভাইজান আপনি শুধু মাত্র ৩ টি লিংক অ্যাড করতে পারবেন");
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
      toast.error("ভাইজান,দয়া করে একটা লিংক অ্যাড করেন প্লিজ");
      return;
    }
    if (validateLinks()) {
      console.log("Form submitted successfully", links);
      setSavedLinks(links);
      toast.success("আলহামদুলিল্লাহ,লিঙ্ক সফলভাবে সংরক্ষিত!!");
    } else {
      setFormError("Please correct the errors before submitting");
      toast.error("জমা দেওয়ার আগে ত্রুটি সংশোধন করুন");
    }
  };

  // Handle drag end to reorder links
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    // Add this check to ensure we're handling the correct droppable
    if (result.source.droppableId !== "links-list") return;
    const items = Array.from(links);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items?.splice(result?.destination.index, 0, reorderedItem);
    setLinks(items);
  };

  const draggableItems = links.map((link) => ({
    id: link?.id,
    content: (
      <div className="bg-[#FAFAFA] mt-10 rounded-lg p-4">
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
                <option value="GitHub">GitHub</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="YouTube">YouTube</option>
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
              onChange={(e) => updateLink(link?.id, "url", e.target.value)}
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
    ),
  }));

  return (
    <div className="bg-[#943434] px-4 sm:px-6 pb-6">
      <div className="bg-[#943434] grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Mobile mockups */}
        <MobileMockup profileData={profileData} savedLinks={savedLinks} />
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
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Links;
