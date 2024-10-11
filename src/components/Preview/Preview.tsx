"use client";

import React, { useState } from "react";
import Link from "next/link";
import MobileMockup from "@/components/MobileMockup/MobileMockup";
import { useAppContext } from "@/components/AppContext/AppContext";
import { toast, ToastContainer } from "react-toastify";

const Preview = () => {
  const { profileData, savedLinks } = useAppContext();
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    const profileUrl = `https://devlinks.com/${profileData?.firstName}_${profileData?.lastName}`;
    navigator.clipboard
      .writeText(profileUrl)
      .then(() => {
        setIsCopied(true);
        toast.success("লিঙ্ক ক্লিপবোর্ডে অনুলিপি করা হয়েছে!");
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("লিঙ্ক কপি করতে ব্যর্থ হয়েছে. আবার চেষ্টা করুন.");
      });
  };
  return (
    <div className="min-h-screen bg-purple-600 flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <Link href="/add-links">
          <button className="px-4 py-2 bg-white text-purple-600 rounded-md hover:bg-gray-100 transition-colors">
            Back to Editor
          </button>
        </Link>
        <button
          onClick={copyToClipboard}
          className={`px-4 py-2 ${
            isCopied ? "bg-green-500" : "bg-purple-600"
          } text-white border border-white rounded-md hover:bg-purple-700 transition-colors`}
        >
          {isCopied ? "Copied!" : "Share Link"}
        </button>
      </header>

      {/* Main content */}
      <main className="flex-grow flex justify-center items-center p-4">
        <div className="w-full max-w-sm">
          <MobileMockup profileData={profileData} savedLinks={savedLinks} />
        </div>
      </main>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Preview;
