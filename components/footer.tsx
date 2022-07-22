import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row gap-y-10 sm:justify-between bg-yellow-400 items-center py-10 px-20 border-y border-black">
      <div className="flex flex-col gap-5">
        <Link href="/">
          <img
            className="w-44 cursor-pointer"
            src="https://links.papareact.com/yvf"
            alt="Medium logo"
          />
        </Link>
      </div>
      <p className="hidden md:block text-lg font-medium">
        Every idea needs a{" "}
        <span className="font-bold text-green-600">Medium</span>
      </p>

      <div className="font-medium text-lg underline">
        <p>Contact us</p>
        <p>Our office</p>
        <p>Career</p>
      </div>
    </footer>
  );
};

export default Footer;
