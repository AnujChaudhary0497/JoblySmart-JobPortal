import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies = [], searchCompanyByText } = useSelector(
    (store) => store.company
  );

  const [filterCompany, setFilterCompany] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Array.isArray(companies)) return;

    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByText) return true;

      return company?.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    });

    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>
          A list of your recently registered companies
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-5">
                No companies found
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={company?.logo || ""}
                      alt={company?.name || "Company logo"}
                    />
                  </Avatar>
                </TableCell>

                <TableCell>
                  {company?.name || "N/A"}
                </TableCell>

                <TableCell>
                  {company?.createdAt?.split("T")[0] || "N/A"}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-32 p-2">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 cursor-pointer hover:text-purple-600"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
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

export default CompaniesTable;