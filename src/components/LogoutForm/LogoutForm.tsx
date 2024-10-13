"use client";

import { doLogout } from "@/app/actions";
import { FaSignOutAlt } from "react-icons/fa";
import { Session } from "next-auth";

interface LogoutProps {
  session: Session | null;
}

const Logout: React.FC<LogoutProps> = ({ session }) => {
  return (
    <form action={doLogout} className="flex items-center">
      {session?.user && (
        <button
          className="sm:text-block flex items-center justify-center bg-green-600 text-white sm:py-2 py-1 sm:px-4 px-2 rounded-md hover:bg-green-700 transition-colors duration-300"
          type="submit"
        >
          <FaSignOutAlt className="mr-1" />
          <span className="block md:text-sm xl:text-xl">Logout</span>
        </button>
      )}
    </form>
  );
};

export default Logout;
