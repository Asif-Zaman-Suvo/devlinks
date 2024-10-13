import Preview from "@/components/Preview/Preview";
import withAuth from "@/hocs/withAuth";
import React from "react";

const PreviewLinkPage = async () => {
  return (
    <div>
      <Preview />
    </div>
  );
};

export default withAuth(PreviewLinkPage);
