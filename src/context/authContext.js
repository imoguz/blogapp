import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || {}
  );
  const values = { userData, setUserData, darkMode, setDarkMode };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
