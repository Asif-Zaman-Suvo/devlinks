import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const withAuth = (WrappedComponent: React.FC) => {
  const AuthenticatedComponent: React.FC = async (props) => {
    const session = await auth();
    if (!session) redirect("/");

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
