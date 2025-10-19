import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) return;
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="bg-gradient-to-b from-white via-[#f9f4ff] to-[#f2e8ff] py-24">
      <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-8">
        
        {/* Tagline */}
        <span className="px-4 py-1 rounded-full bg-[#fef2f2] text-[#F83002] font-medium text-sm shadow-sm">
          🚀 No.1 Job Hunt Website
        </span>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
          Search, Apply & <br />
          Get Your{" "}
          <span className="bg-gradient-to-r from-[#6A38C2] via-[#9F52FF] to-[#F83002] bg-clip-text text-transparent">
            Dream Job
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg max-w-2xl">
          Find your dream job or the right candidate with ease.  
          Simple, fast, and efficient — all opportunities in one place.
        </p>

        {/* Search Bar */}
        <div
          className="flex w-full md:w-[70%] lg:w-[50%] border border-gray-200 pl-5 rounded-full items-center gap-3 bg-white 
            focus-within:ring-2 focus-within:ring-[#c7b6ec] focus-within:border-[#c7b6ec] transition-all 
            shadow-lg hover:shadow-xl"
        >
          <input
            type="text"
            placeholder="Find your dream job..."
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full py-3 bg-transparent text-gray-700 placeholder-gray-400"
          />
          <Button
            onClick={searchJobHandler}
            aria-label="Search"
            className="rounded-full px-5 bg-gradient-to-r from-[#6A38C2] to-[#F83002] hover:brightness-110 transition-all shadow-md"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
