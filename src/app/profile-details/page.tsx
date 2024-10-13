import ProfileDetails from "@/components/ProfileDetails/ProfileDetails";
import withAuth from "@/hocs/withAuth";
import React from "react";

const ProfileDetailsPages = async () => {
  return (
    <div>
      <ProfileDetails />
    </div>
  );
};

export default withAuth(ProfileDetailsPages);
