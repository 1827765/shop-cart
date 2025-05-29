import React from "react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-5 flex justify-between items-center h-16 w-full">
      <div className="font-bold text-2xl bg-gradient-to-r from-green-900 to-green-300 bg-clip-text text-transparent">
        Shop-cart
      </div>
      <div className="flex items-center relative">
        {["home", "Shop", "Blog", "Contact", "Hot Deal"].map((item, index) => (
          <a
            key={index}
            href={`#${item.toLowerCase()}`}
            className="mx-4 hover:text-green-300 transition-colors"
          >
            {item}
            <span className="block h-0.5 w-0 bg-green-400 transition-all duration-300 origin-right hover:w-full absolute bottom-0"></span>
          </a>
        ))}
      </div>
      <div></div>
    </header>
  );
};

export default Header;
