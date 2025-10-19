import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOutIcon, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm transition-all border-b border-gray-200">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-[#F83002] to-[#6A38C2] bg-clip-text text-transparent">
            JoblySmart
          </h1>
        </Link>

        <div className="flex items-center gap-10">
          
          {/* Nav Links */}
          <ul className="flex font-medium items-center gap-8 text-gray-700">
            {user && user.role === "recruiter" ? (
              <>
                <li className="group relative">
                  <Link to="/admin/companies" className="transition hover:text-[#6A38C2]">
                    Companies
                  </Link>
                  <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#6A38C2] transition-all duration-300 group-hover:w-full"></span>
                </li>
                <li className="group relative">
                  <Link to="/admin/jobs" className="transition hover:text-[#6A38C2]">
                    Jobs
                  </Link>
                  <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#6A38C2] transition-all duration-300 group-hover:w-full"></span>
                </li>
              </>
            ) : (
              <>
                {["Home", "Jobs", "Browse"].map((item, i) => (
                  <li key={i} className="group relative">
                    <Link
                      to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="transition hover:text-[#6A38C2]"
                    >
                      {item}
                    </Link>
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#6A38C2] transition-all duration-300 group-hover:w-full"></span>
                  </li>
                ))}
              </>
            )}
          </ul>

          {/* Auth Section */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="hover:border-[#6A38C2] hover:text-[#6A38C2] transition-all"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] hover:brightness-110 text-white shadow-md transition-all">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-[#6A38C2] ring-offset-2 hover:ring-offset-4 transition-all">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4 shadow-xl rounded-xl bg-white border border-gray-200">
                
                {/* User Info */}
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="ring-2 ring-[#6A38C2]">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {user?.profile?.bio || "No bio added"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 text-gray-700">
                  {user?.role === "student" && (
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 hover:text-[#6A38C2] transition"
                    >
                      <User2 size={18} /> View Profile
                    </Link>
                  )}
                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 hover:text-red-500 transition"
                  >
                    <LogOutIcon size={18} /> Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
