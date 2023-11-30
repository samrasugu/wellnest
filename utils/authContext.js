// contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { CircularProgress } from "@mui/material";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookieUserData = Cookies.get("user");
    if (cookieUserData) {
      setUser(JSON.parse(decodeURIComponent(cookieUserData)));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    console.log("Saving user in Cookie" + userData);
    // logic to log in the user and set the user state
    setUser(userData);

    Cookies.set("user", JSON.stringify(userData));
  };

  const logout = () => {
    // logic to log out the user and clear the user state
    setUser(null);
    Cookies.remove("user");
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
