"use client";

import React, { createContext, useState, useContext } from "react";

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

interface AppContextType {
  savedLinks: ILinkData[];
  setSavedLinks: React.Dispatch<React.SetStateAction<ILinkData[]>>;
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [savedLinks, setSavedLinks] = useState<ILinkData[]>([]);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: null,
  });

  return (
    <AppContext.Provider
      value={{ savedLinks, setSavedLinks, profileData, setProfileData }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must bes used within an AppProvider");
  }
  return context;
};
