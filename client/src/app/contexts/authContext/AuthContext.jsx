"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
const AuthContext = createContext(null);
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    role: "user",
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    setIsLoading(false);
  }, []);

  const logout = () => {
    Cookies.remove("user");
    setUser(null);
    router.push("/login");
    toast.success("Logged out successfully! 👋");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
