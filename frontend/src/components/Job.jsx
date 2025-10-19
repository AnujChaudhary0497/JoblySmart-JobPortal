import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  // Days ago function
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-5 rounded-xl shadow-md bg-white border border-gray-100 hover:shadow-lg transition">
      {/* Top Row: Time + Bookmark */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-600">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full"
          size="icon"
        >
          <Bookmark size={18} />
        </Button>
      </div>

      {/* Company Info  */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="w-12 h-12 border">
          <AvatarImage
            src={job?.company?.logo}
            alt={job?.company?.name || "Company Logo"}
          />
        </Avatar>
        <div>
          <h1 className="font-semibold text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location || "India"}</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1 className="font-bold text-lg mb-1">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 font-semibold" variant="secondary">
          {job?.position} Positions
        </Badge>
        <Badge className="text-orange-600 font-semibold" variant="secondary">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-700 font-semibold" variant="secondary">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-5">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default Job;
