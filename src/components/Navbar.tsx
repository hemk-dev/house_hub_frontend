import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full py-4 px-8 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold">
        House Hub
      </Link>
      <Link to="/login">
        <button className="text-gray-600 hover:text-black">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
