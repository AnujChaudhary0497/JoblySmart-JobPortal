import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJob";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl my-6 p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="cursor-pointer shadow-md hover:scale-105 transition-transform duration-300 w-12 h-12">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt={user?.fullname || "Profile Photo"}
              />
            </Avatar>
            <div>
              <h1 className="font-semibold text-lg text-gray-900 leading-tight">
                {user?.fullname}
              </h1>
              <p className="text-gray-600 mt-0.5 max-w-xs text-sm truncate">
                {user?.profile?.bio || "No bio available."}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right p-1"
            variant="outline"
            aria-label="Edit Profile"
          >
            <Pen className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2 border-t border-b border-gray-200 py-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-500" />
            <span className="truncate">{user?.email || "Not Provided"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Contact className="w-4 h-4 text-green-500" />
            <span>{user?.phoneNumber || "Not Provided"}</span>
          </div>
        </div>

        <div className="my-4">
          <h2 className="font-semibold text-md text-gray-900 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-1">
            {user?.profile?.skills?.length ? (
              user.profile.skills.map((skill, index) => (
                <Badge key={index} className="px-2 py-0.5 text-xs font-medium">
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-400 italic text-sm">No skills added</span>
            )}
          </div>
        </div>
        <div className="max-w-xs mt-4">
          <Label className="block mb-1 font-bold text-sm text-gray-900">
            Resume
          </Label>
          {isResume && user?.profile?.resume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user.profile.resume}
              className="text-blue-600 font-medium hover:underline truncate block max-w-full text-sm"
            >
              {user.profile.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-400 italic text-sm">No resume uploaded</span>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-xl p-4 shadow-lg mb-8">
        <h1 className="font-bold text-lg mb-4 text-gray-900">Applied Jobs</h1>
        {/* Application Job Table */}
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
