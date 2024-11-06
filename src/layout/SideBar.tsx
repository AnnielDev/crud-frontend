import { TiHomeOutline } from "react-icons/ti";
import { MdOutlineLogout } from "react-icons/md";
import { useAuthProvider } from "@/context/AuthContext";
import { useLocation } from "react-router-dom";
import icon from "@/assets/icon.png";
export default function SideBar() {
  const { session } = useAuthProvider();
  const navigate = useLocation();
  const routes = [
    { label: "Home", icon: <TiHomeOutline size={20} />, route: "/" },
  ];
  return (
    <div className="flex flex-col px-4 py-2 bg-[#f2eae1]">
      {/* Title */}
      <div className="flex justify-center">
        <span className="uppercase text-[20px] font-bold">crud operations</span>
      </div>
      {/* User */}
      <div
        className="flex flex-col justify-center items-center gap-2"
        style={{ flexGrow: 1 }}
      >
        <img src={icon} alt="" className="w-28" />

        <span className="font-bold text-[17px]">Hi, {session?.name}</span>
      </div>
      {/* Routes */}
      <div className="flex flex-col" style={{ flexGrow: 4 }}>
        {routes.map((route, index) => {
          return (
            <div
              className="flex items-center gap-2 justify-center cursor-pointer py-2 rounded-md"
              key={index}
              style={{
                backgroundColor:
                  navigate.pathname === route.route ? "#feaf00" : "",
              }}
            >
              {route.icon}
              <span className="font-medium">{route.label}</span>
            </div>
          );
        })}
      </div>
      {/* Signout */}
      <div className="flex justify-center" style={{ flexGrow: 0.5 }}>
        <span className="flex items-center gap-2 cursor-pointer">
          Logout
          <MdOutlineLogout />
        </span>
      </div>
    </div>
  );
}
