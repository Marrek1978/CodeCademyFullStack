import React, { useContext } from "react";
import AuthContext from "../authContext/AuthContext";
import axios from "axios";

const LogoutButton = () => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:4000/logout",
      }).then((res) => {});

      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="border-slate-500 hover:border-paleKey hover:text-paleKey
  "
    >
      Logout
    </button>
  );
};

export default LogoutButton;
