import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Code, Database, PenTool, Layers, Globe } from "lucide-react";

const categories = [
  { name: "Frontend Developer", icon: <Code className="w-6 h-6" /> },
  { name: "Backend Developer", icon: <Database className="w-6 h-6" /> },
  { name: "Data Science", icon: <Globe className="w-6 h-6" /> },
  { name: "Graphics Designer", icon: <PenTool className="w-6 h-6" /> },
  { name: "Full Stack Developer", icon: <Layers className="w-6 h-6" /> },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-20 px-4">
      <Carousel>
        <CarouselContent>
          {categories.map((cat, index) => (
            <CarouselItem key={index} className="basis-1/3 px-3">
              <div
                onClick={() => searchJobHandler(cat.name)}
                className="cursor-pointer flex flex-col items-center justify-center p-6 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-[#faf8ff] shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="text-[#6A38C2] group-hover:text-[#F83002] mb-3 transition-colors">
                  {cat.icon}
                </div>
                <p className="text-sm font-semibold text-gray-800 group-hover:text-[#6A38C2] text-center transition-colors">
                  {cat.name}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Prev/Next Buttons */}
        <CarouselPrevious className="absolute -left-10 top-1/2 -translate-y-1/2 bg-gradient-to-br from-[#6A38C2] to-[#F83002] text-white hover:brightness-110 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all" />
        <CarouselNext className="absolute -right-10 top-1/2 -translate-y-1/2 bg-gradient-to-br from-[#6A38C2] to-[#F83002] text-white hover:brightness-110 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
