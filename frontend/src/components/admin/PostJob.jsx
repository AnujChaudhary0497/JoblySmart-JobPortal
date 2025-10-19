import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() == value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl w-full border border-gray-200 shadow-lg rounded-md bg-white"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-semibold">Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="e.g. Frontend Developer"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-2 focus-visible:ring-purple-500 my-1"
              />
            </div>
            <div>
              <Label className="font-semibold">Description</Label>
              <Input
                type="text"
                name="description"
                placeholder="Brief job summary..."
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-2 focus-visible:ring-purple-500 my-1"
              />
            </div>
            <div>
              <Label className="font-semibold">Requirements</Label>
              <Input
                type="text"
                name="requirements"
                placeholder="Skills or qualifications required"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-2 focus-visible:ring-purple-500 my-1"
              />
            </div>
            <div>
              <Label className="font-semibold">Salary</Label>
              <Input
                type="text"
                name="salary"
                placeholder="e.g. 14 LPA"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-2 focus-visible:ring-purple-500 my-1"
              />
            </div>
            <div>
              <Label className="font-semibold">Location</Label>
              <Input
                type="text"
                name="location"
                placeholder="e.g. Bangalore, Remote"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-2 focus-visible:ring-purple-500 my-1"
              />
            </div>
            <div>
              <Label className="font-semibold">Job Type</Label>
              <Input
                type="text"
                name="jobType"
                placeholder="e.g. Full-time, Internship"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-2 focus-visible:ring-purple-500 my-1"
              />
            </div>
            <div>
              <Label className="font-semibold">Experience Level</Label>
              <Input
                type="text"
                name="experience"
                placeholder="e.g. 0-2 years, 3+ years"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-2 focus-visible:ring-purple-500 my-1"
              />
            </div>
            <div>
              <Label className="font-semibold">No of Position</Label>
              <Input
                type="number"
                name="position"
                placeholder="Number of openings"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-2 focus-visible:ring-purple-500 my-1"
              />
            </div>
            {companies.length >= 0 && (
              <div className="col-span-2">
                <Label className="font-semibold">Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full mt-1 focus:ring-2 focus:ring-purple-500">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {loading ? (
            <Button className="w-full my-6 bg-gradient-to-r from-purple-500 to-red-400 text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 transition-all"
            >
              Post New Job
            </Button>
          )}

          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-semibold text-center mt-2">
              *Please register a company first, before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
