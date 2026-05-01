import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.applications?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-5">
                No applicants found
              </TableCell>
            </TableRow>
          ) : (
            applicants?.applications?.map((item) => (
              <TableRow key={item?._id}>
                <TableCell>
                  {item?.applicant?.fullname || "-"}
                </TableCell>

                <TableCell>
                  {item?.applicant?.email || "-"}
                </TableCell>

                <TableCell>
                  {item?.applicant?.phoneNumber || "-"}
                </TableCell>

                <TableCell className="text-blue-600">
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {item?.applicant?.profile?.resumeOriginalName || "View"}
                    </a>
                  ) : (
                    "-"
                  )}
                </TableCell>

                <TableCell>
                  {item?.applicant?.createdAt
                    ? item.applicant.createdAt.split("T")[0]
                    : "-"}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => {
                        const hoverColorClass =
                          status === "Accepted"
                            ? "hover:text-green-600"
                            : "hover:text-red-600";

                        return (
                          <div
                            key={index}
                            onClick={() =>
                              statusHandler(status, item?._id)
                            }
                            className={`flex items-center my-2 cursor-pointer px-2 py-1 rounded hover:bg-gray-100 ${hoverColorClass}`}
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;