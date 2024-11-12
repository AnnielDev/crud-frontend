import { useState, MouseEvent } from "react";
import { AxiosError } from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthProvider } from "@/context/AuthContext";
import { loginUsers } from "@/services/User";
import useAlert from "@/hook/useAlert";
type SignInType = {
  email: string;
  password: string;
};
export default function SignIn() {
  const { setSessionState } = useAuthProvider();
  const [showAlert] = useAlert();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [user, setUser] = useState<SignInType>({ email: "", password: "" });

  const onSignIn = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      if (user.email && user.password) {
        if (
          user.email.includes("@gmail.com") ||
          user.email.includes("@hotmail.com")
        ) {
          const { data } = await loginUsers(user);
          setSessionState(data.user);
        } else {
          showAlert("WARNING", "This is not a valid email!");
        }
      } else {
        showAlert("WARNING", "You must fill in both fields!");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        showAlert("WARNING", error.response?.data.message);
      } else {
        showAlert("WARNING", "An unexpected error occurred!");
      }
    }
  };
  return (
    <>
      <h1 className="uppercase text-center font-bold text-3xl max-lg:text-2xl drop-shadow-lg">
        crud operations
      </h1>
      <div className="flex flex-col items-center my-8">
        <h2 className="uppercase text-center font-semibold text-xl max-lg:text-xl">
          sign in
        </h2>
        <span className="text-[#6c6c6c] text-center text-sm">
          Enter your credentials to access your account
        </span>
      </div>
      <form>
        <div className="my-2 flex flex-col gap-4">
          {/* Email*/}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium capitalize mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="outline-none border-2 border-gray-100 py-2 rounded-md px-2"
            />
          </div>
          {/* Password*/}
          <div className="flex flex-col">
            <label htmlFor="password" className="font-medium capitalize mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="outline-none border-2 border-gray-100 py-2 w-full rounded-md px-2"
              />
              {showPassword ? (
                <FaEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 cursor-pointer"
                />
              )}
            </div>
          </div>
          {/* Button*/}
          <button
            type="submit"
            className="uppercase rounded-md outline-none bg-[#feaf00] text-white py-2 font-semibold"
            onClick={(e: MouseEvent<HTMLButtonElement>) => onSignIn(e)}
          >
            sign in
          </button>
        </div>
      </form>
    </>
  );
}
