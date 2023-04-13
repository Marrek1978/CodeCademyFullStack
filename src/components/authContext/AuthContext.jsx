import { createContext } from "react";
import React, { useState } from "react";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState();

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userID, setUserID }}>
      {children}
    </AuthContext.Provider>
  );
};
