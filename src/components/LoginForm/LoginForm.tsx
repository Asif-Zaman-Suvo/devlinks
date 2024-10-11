import { doSocialLogin } from "@/app/actions";
import { FaGoogle } from "react-icons/fa";

const LoginForm = () => {
  return (
    <form action={doSocialLogin}>
      <button
        className="mt-2 flex items-center justify-center bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300"
        type="submit"
        name="action"
        value="google"
      >
        <FaGoogle className="mr-2" />
        Sign in with Google
      </button>
    </form>
  );
};

export default LoginForm;
