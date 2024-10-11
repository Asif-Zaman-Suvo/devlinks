"use client";
import React, { useState, useRef } from "react";
import MobileMockup from "@/components/MobileMockup/MobileMockup";
import Image from "next/image";
import { HiOutlineCamera } from "react-icons/hi";
import { useAppContext } from "../AppContext/AppContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileDetails = () => {
  const { savedLinks, profileData, setProfileData } = useAppContext();
  const [localProfileData, setLocalProfileData] = useState(profileData);
  const [errors, setErrors] = useState({ firstName: "", lastName: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalProfileData((prev) => ({
          ...prev,
          profileImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = { firstName: "", lastName: "" };
    let isValid = true;

    if (!localProfileData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!localProfileData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setProfileData(localProfileData); // Update global state only on successful submission
      console.log("Form submitted:", localProfileData);
      toast.success("আলহামদুলিল্লাহ,প্রোফাইলের বিবরণ সফলভাবে সংরক্ষিত হয়েছে!");
      // Here you would typically send the data to your backend
    } else {
      toast.error("জমা দেওয়ার আগে ত্রুটি সংশোধন করুন");
    }
  };
  return (
    <div className="bg-[#943434] px-4 sm:px-6 pb-6">
      <div className="bg-[#943434] grid grid-cols-1 md:grid-cols-12 gap-6">
        <MobileMockup savedLinks={savedLinks} profileData={profileData} />
        <div className="col-span-1 md:col-span-7 bg-white p-6 rounded-lg">
          <h2 className="text-4xl font-bold mb-4">Profile Details</h2>
          <p className="mb-10 text-gray-400">
            Add your details to create a personal touch to your profile.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile picture
              </label>
              <div
                className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer"
                onClick={triggerFileInput}
              >
                {localProfileData.profileImage ? (
                  <Image
                    src={localProfileData?.profileImage}
                    alt="Profile"
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="text-gray-400">
                    <HiOutlineCamera size={24} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm font-medium">
                    Change Image
                  </span>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <p className="mt-2 text-xs text-gray-500">
                Image must be below 1024x1024px. Use PNG, JPG, or BMP format.
              </p>
            </div>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First name*
              </label>
              <input
                type="text"
                id="firstName"
                value={localProfileData?.firstName}
                onChange={(e) =>
                  setLocalProfileData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                required
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last name*
              </label>
              <input
                type="text"
                id="lastName"
                value={localProfileData?.lastName}
                onChange={(e) =>
                  setLocalProfileData((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors?.lastName ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                required
              />
              {errors?.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={localProfileData?.email}
                onChange={(e) =>
                  setLocalProfileData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default ProfileDetails;
