import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => job?._id && navigate(`/description/${job._id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-5 rounded-2xl shadow-md bg-[#f9f6ff] border border-gray-100 cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl"
    >
      {/* Main Content */}
      <div>
        <h1 className="text-sm font-semibold text-gray-700">
          {job?.company?.name || "Unknown Company"}
        </h1>
        <p className="text-xs text-gray-400">India</p>
      </div>

      <div className="mt-2">
        <h2 className="text-lg font-bold text-[#6A38C2]">
          {job?.title || "Job Title"}
        </h2>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {job?.description || "No description available"}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="bg-blue-50 text-blue-700 font-semibold border border-blue-200">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-[#fff5f3] text-[#F83002] font-semibold border border-[#fcd5ce]">
          {job?.jobType}
        </Badge>
        <Badge className="bg-[#f3ecff] text-[#7209B7] font-semibold border border-[#d2bfff]">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-4 z-10 transition-opacity duration-300 flex flex-col justify-center">
          <h2 className="font-bold text-lg text-[#6A38C2] mb-2">
            {job?.title}
          </h2>
          <p className="text-sm text-gray-700 mb-3 line-clamp-3">
            {job?.description}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-blue-50 text-blue-700 font-semibold border border-blue-200">
              {job?.position} Positions
            </Badge>
            <Badge className="bg-[#fff5f3] text-[#F83002] font-semibold border border-[#fcd5ce]">
              {job?.jobType}
            </Badge>
            <Badge className="bg-[#f3ecff] text-[#7209B7] font-semibold border border-[#d2bfff]">
              {job?.salary} LPA
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestJobCards;
