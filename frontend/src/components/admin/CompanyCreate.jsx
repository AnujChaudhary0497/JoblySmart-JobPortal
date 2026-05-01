import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ FIX: default empty string
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    // ✅ validation
    if (!companyName.trim()) {
      return toast.error("Company name is required");
    }

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);

        const companyId = res?.data?.company?._id;

        // ✅ safe navigation
        if (companyId) {
          navigate(`/admin/companies/${companyId}`);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-purple-700 mb-2">
            Create Your Company
          </h1>
          <p className="text-gray-600 text-sm">
            Choose a name for your company. You can always change this later.
          </p>
        </div>

        <div className="bg-white p-10 rounded-xl shadow-xl border border-purple-100">
          <div className="mb-6">
            <Label className="text-purple-700 text-sm font-medium">
              Company Name
            </Label>

            <Input
              type="text"
              value={companyName} // ✅ controlled input
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="JobHunt, Microsoft etc."
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              className="hover:border-purple-500 hover:text-purple-700"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>

            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={registerNewCompany}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;