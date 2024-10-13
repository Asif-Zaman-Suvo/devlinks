import Links from "@/components/Links/Links";
import withAuth from "@/hocs/withAuth";
import React from "react";

const AddLinkPage = async () => {
  return (
    <div>
      <Links />
    </div>
  );
};

export default withAuth(AddLinkPage);
