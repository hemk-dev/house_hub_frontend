import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="w-full py-4 px-8 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">House Hub</h1>
        <button className="text-gray-600 hover:text-black">Login</button>
      </div>
    </>
  );
};

export default Navbar;
