import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Navbar from "../shared/Navbar";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const ChangeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const ChangeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10 bg-white border border-gray-200 shadow-md rounded-lg p-8">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-600 font-semibold"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-2xl">Company Setup</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-semibold">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={ChangeEventHandler}
                className="focus-visible:ring-2 focus-visible:ring-purple-500 mt-1"
              />
            </div>
            <div>
              <Label className="font-semibold">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={ChangeEventHandler}
                className="focus-visible:ring-2 focus-visible:ring-purple-500 mt-1"
              />
            </div>
            <div>
              <Label className="font-semibold">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={ChangeEventHandler}
                className="focus-visible:ring-2 focus-visible:ring-purple-500 mt-1"
              />
            </div>
            <div>
              <Label className="font-semibold">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={ChangeEventHandler}
                className="focus-visible:ring-2 focus-visible:ring-purple-500 mt-1"
              />
            </div>
            <div className="col-span-2">
              <Label className="font-semibold">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={ChangeFileHandler}
                className="mt-1"
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 transition-all"
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
