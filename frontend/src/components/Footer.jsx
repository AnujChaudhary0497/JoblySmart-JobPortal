import React from "react";
// src/components/Footer.jsx
import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-gray-800">JobPortal</h2>
          <p className="text-sm text-gray-500 mt-1">
            Search, Apply & Get your Dream Job 🚀
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-5 mt-4 md:mt-0">
          <a
            href="https://www.facebook.com/share/17JuZWunXJ/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-600 transition-colors"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="https://www.instagram.com/anujchaudhary_0497?igsh=anFoNG1oYngyYmpv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-pink-500 transition-colors"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://github.com/AnujChaudhary0497"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-black transition-colors"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com/in/anuj-chaudhary-411792271"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-600 transition-colors"
          >
            <FaLinkedinIn size={20} />
          </a>
          <a
            href="https://x.com/Anuj0497?t=PDl8mvfEG_HIs0zhElfYtA&s=09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-400 transition-colors"
          >
            <FaTwitter size={20} />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-400 py-4 border-t border-gray-200">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </div>
    </footer>
  );
}
