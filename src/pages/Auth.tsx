import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "@/context/AuthContext";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
export default function Auth() {
  const { session } = useAuthProvider();
  const [auth, setAuth] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/users", { replace: true });
    }
  }, [session, navigate]);

  return (
    <div
      style={{
        background: "linear-gradient(to right, #FEAF00, #F8D442)",
        height: "100vh",
      }}
      className="flex items-center justify-center bg-cover bg-center"
    >
      <div
        style={{ padding: `${auth ? "20px" : "24px"}` }}
        className="bg-white w-4/12 max-lg:w-10/12 rounded-2xl drop-shadow-sm shadow-lg"
      >
        {!auth ? (
          <SignIn />
        ) : (
          <SignUp
            onBack={() => {
              setAuth(false);
            }}
          />
        )}

        {!auth && (
          <div className="flex justify-center">
            <span className="text-[#6c6c6c] text-center text-sm">
              Do you have an{" "}
              <span
                onClick={() => setAuth(true)}
                className="font-bold text-black cursor-pointer underline"
              >
                account
              </span>
              ?
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
