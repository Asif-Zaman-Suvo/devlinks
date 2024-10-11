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
          className="flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300"
          type="submit"
        >
          <FaSignOutAlt className="mr-2" />
          Logout {session.user.name}
        </button>
      )}
    </form>
  );
};

export default Logout;
