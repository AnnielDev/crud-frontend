import { useState, MouseEvent } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { AxiosError } from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createUsers } from "@/services/User";
import useAlert from "@/hook/useAlert";
type SignUpType = {
  name: string;
  username: string;
  lastname: string;
  email: string;
  gender: "MALE" | "FEMALE";
  password: string;
  age: number;
};

interface Props {
  onBack: () => void;
}

export default function SignIn({ onBack }: Props) {
  const [showAlert] = useAlert();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [user, setUser] = useState<SignUpType>({
    email: "",
    password: "",
    age: 0,
    gender: "MALE",
    lastname: "",
    name: "",
    username: "",
  });
  const onSignUp = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      if (
        user.email &&
        user.password &&
        user.age &&
        user.gender &&
        user.lastname &&
        user.name
      ) {
        if (
          user.email.includes("@gmail.com") ||
          user.email.includes("@hotmail.com")
        ) {
          const { data } = await createUsers({ data: user });
          showAlert("SUCCESS", data.message);
          setUser({
            email: "",
            password: "",
            age: 0,
            gender: "MALE",
            lastname: "",
            name: "",
            username: "",
          });
          onBack();
        } else {
          showAlert("WARNING", "This is not a valid email!");
        }
      } else {
        showAlert("WARNING", "You must fill in all fields!");
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
      <FaArrowLeftLong className="cursor-pointer" onClick={onBack} />
      <h1 className="uppercase text-center font-bold text-3xl max-lg:text-2xl drop-shadow-lg">
        crud operations
      </h1>
      <div className="flex flex-col items-center my-8">
        <h2 className="uppercase text-center font-semibold text-xl max-lg:text-xl">
          sign up
        </h2>
        <span className="text-[#6c6c6c] text-center text-sm">
          Create your account to get access
        </span>
      </div>
      <form>
        <div className="my-2 flex flex-col gap-4">
          {/* Username*/}
          <div className="flex flex-col">
            <label htmlFor="username" className="font-medium capitalize mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={user.username}
              placeholder="Enter your username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="outline-none border-2 border-gray-100 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-row max-lg:flex-col justify-between gap-2">
            {/* Name*/}
            <div className="flex flex-col flex-grow">
              <label htmlFor="name" className="font-medium capitalize mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={user.name}
                placeholder="Enter your name"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="outline-none border-2 border-gray-100 p-2 rounded-md"
              />
            </div>
            {/* Lastname*/}
            <div className="flex flex-col flex-grow">
              <label htmlFor="lastname" className="font-medium capitalize mb-1">
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                value={user.lastname}
                placeholder="Enter your lastname"
                onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                className="outline-none border-2 border-gray-100 p-2 rounded-md"
              />
            </div>
          </div>
          {/* Email*/}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium capitalize mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={user.email}
              placeholder="Enter your email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="outline-none border-2 border-gray-100 p-2 rounded-md"
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
                value={user.password}
                placeholder="Enter your password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="outline-none border-2 border-gray-100 p-2 w-full rounded-md"
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

          <div className="flex flex-row max-lg:flex-col justify-between gap-2">
            {/* Age*/}
            <div className="flex flex-col">
              <label htmlFor="age" className="font-medium capitalize mb-1">
                Age
              </label>
              <input
                type="number"
                id="age"
                value={user.age}
                onChange={(e) =>
                  setUser({ ...user, age: Number(e.target.value) })
                }
                className="outline-none border-2 border-gray-100 p-2 rounded-md "
              />
            </div>
            {/* Gender */}
            <div className="flex flex-col flex-grow">
              <label htmlFor="gender" className="font-medium capitalize mb-1">
                Gender
              </label>
              <select
                id="gender"
                name="select"
                onChange={(e) => {
                  setUser({
                    ...user,
                    gender: e.target.value as "MALE" | "FEMALE",
                  });
                }}
                className="outline-none border-2 border-gray-100 p-2 rounded-md "
              >
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
              </select>
            </div>
          </div>
          {/* Button*/}
          <button
            type="submit"
            className="uppercase rounded-md outline-none bg-[#feaf00] text-white py-2 font-semibold"
            onClick={(e: MouseEvent<HTMLButtonElement>) => onSignUp(e)}
          >
            sign up
          </button>
        </div>
      </form>
    </>
  );
}
