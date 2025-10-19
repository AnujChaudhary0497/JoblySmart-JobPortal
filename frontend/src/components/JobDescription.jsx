import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);
        const updatedJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (app) => app.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some((app) => app.applicant === user?._id)
          );
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {singleJob?.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-50 text-blue-700 font-medium">
                {singleJob?.position} Position{singleJob?.position > 1 ? "s" : ""}
              </Badge>
              <Badge className="bg-red-50 text-red-600 font-medium">
                {singleJob?.jobType}
              </Badge>
              <Badge className="bg-purple-50 text-purple-700 font-medium">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>

          <Button
            onClick={isApplied ? undefined : applyJobHandler}
            disabled={isApplied}
            className={`rounded-md px-6 py-2 text-base font-medium ${
              isApplied
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        {/* Improved Details Section */}
        <div className="mt-8 border-t border-gray-300 pt-6 space-y-5 text-gray-800 text-base leading-relaxed">
          <div className="flex">
            <span className="w-32 font-semibold text-gray-900">Role:</span>
            <span>{singleJob?.title || "N/A"}</span>
          </div>
          <div className="flex">
            <span className="w-32 font-semibold text-gray-900">Location:</span>
            <span>{singleJob?.location || "Not Specified"}</span>
          </div>
          <div className="flex">
            <span className="w-32 font-semibold text-gray-900">Description:</span>
            <p className="flex-1 mt-0 text-gray-700 whitespace-pre-line">{singleJob?.description || "N/A"}</p>
          </div>
          <div className="flex">
            <span className="w-32 font-semibold text-gray-900">Experience:</span>
            <span>
              {singleJob?.experienceLevel
                ? `${singleJob.experienceLevel} year${singleJob.experienceLevel > 1 ? "s" : ""}`
                : "Not Specified"}
            </span>
          </div>
          <div className="flex">
            <span className="w-32 font-semibold text-gray-900">Salary:</span>
            <span>{singleJob?.salary} LPA</span>
          </div>
          <div className="flex">
            <span className="w-32 font-semibold text-gray-900">Total Applicants:</span>
            <span>{singleJob?.applications?.length || 0}</span>
          </div>
          <div className="flex">
            <span className="w-32 font-semibold text-gray-900">Posted Date:</span>
            <span>{singleJob?.createdAt?.split("T")[0] || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
