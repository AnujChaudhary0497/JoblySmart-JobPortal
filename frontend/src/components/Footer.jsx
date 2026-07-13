import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white via-[#f9f4ff] to-[#f2e8ff] border-t border-gray-200 mt-12">
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-extrabold bg-gradient-to-r from-[#F83002] to-[#6A38C2] bg-clip-text text-transparent">
            JoblySmart
          </h2>

          <p className="text-sm text-gray-600 mt-1">
            Search, Apply & Get your Dream Job 🚀
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5">
          {[
            {
              href: "https://www.facebook.com/share/17JuZWunXJ/",
              icon: <FaFacebook size={20} />,
              hover: "hover:text-[#1877F2]",
            },
            {
              href: "https://www.instagram.com/anujchaudhary_0497",
              icon: <FaInstagram size={20} />,
              hover: "hover:text-[#E1306C]",
            },
            {
              href: "https://github.com/AnujChaudhary0497",
              icon: <FaGithub size={20} />,
              hover: "hover:text-black",
            },
            {
              href: "https://linkedin.com/in/anuj-chaudhary-411792271",
              icon: <FaLinkedinIn size={20} />,
              hover: "hover:text-[#0A66C2]",
            },
            {
              href: "https://x.com/Anuj0497",
              icon: <FaXTwitter size={20} />,
              hover: "hover:text-black",
            },
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-500 transition-all duration-300 ${item.hover} hover:scale-110`}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-500 py-4 border-t border-gray-200">
        © {new Date().getFullYear()}{" "}
        <span className="font-medium text-gray-700">
          JoblySmart
        </span>
        . All rights reserved.

        <p className="mt-1 text-xs">
          Design and Developed by{" "}
          <span className="text-[#6A38C2] font-semibold">
            Anuj Chaudhary
          </span>
        </p>
      </div>
    </footer>
  );
}