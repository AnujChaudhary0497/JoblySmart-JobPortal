import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto min-h-[80vh] px-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-8 shadow-lg transition-shadow hover:shadow-2xl"
        >
          <h1 className="font-extrabold text-3xl mb-8 text-center text-[#6A38C2]">
            Sign Up
          </h1>

          <div className="mb-5">
            <Label className="block mb-2 text-gray-700 font-semibold">
              Full Name
            </Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A38C2] transition"
              required
            />
          </div>

          <div className="mb-5">
            <Label className="block mb-2 text-gray-700 font-semibold">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A38C2] transition"
              required
            />
          </div>

          <div className="mb-5">
            <Label className="block mb-2 text-gray-700 font-semibold">
              Phone Number
            </Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A38C2] transition"
              required
            />
          </div>

          <div className="mb-5">
            <Label className="block mb-2 text-gray-700 font-semibold">
              Password
            </Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A38C2] transition"
              required
            />
          </div>

          <RadioGroup className="flex items-center justify-center gap-6 mb-6">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                id="student"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="cursor-pointer"
                required
              />
              <Label
                htmlFor="student"
                className="cursor-pointer font-medium text-gray-700"
              >
                Student
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                id="recruiter"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="cursor-pointer"
                required
              />
              <Label
                htmlFor="recruiter"
                className="cursor-pointer font-medium text-gray-700"
              >
                Recruiter
              </Label>
            </div>
          </RadioGroup>

          <div className="mb-6">
            <Label className="block mb-2 text-gray-700 font-semibold">
              Profile Picture
            </Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="w-full px-3 py-2 rounded-md border border-gray-300 text-gray-600 file:text-sm file:font-medium file:border-none file:bg-gray-100 file:px-4 file:py-2 file:rounded-lg hover:file:bg-gray-200 cursor-pointer transition"
            />
          </div>

          {loading ? (
            <Button
              className="w-full py-3 bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white font-semibold shadow-lg hover:from-[#542c9e] hover:to-[#c1271e] transition flex justify-center items-center"
              disabled
            >
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white font-semibold shadow-lg hover:from-[#542c9e] hover:to-[#c1271e] transition"
            >
              Sign Up
            </Button>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#6A38C2] hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
