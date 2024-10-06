import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const roleId = localStorage.getItem("role"); // Get roleId from local storage
  console.log("🚀 ~ Navbar ~ roleId:", roleId);
  const isAuthenticated = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    localStorage.removeItem("roleId"); // Remove the roleId from local storage
    navigate("/"); // Redirect to home after logout
  };

  return (
    <div className=" w-full py-4 px-8 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold">
        House Hub
      </Link>
      <div className="flex items-center">
        {isAuthenticated && (roleId === "1" || roleId === "2") && (
          <Link to="/dashboard" className="mr-4">
            <button className="text-gray-600 hover:text-black">
              Dashboard
            </button>
          </Link>
        )}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-black"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="text-gray-600 hover:text-black">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
