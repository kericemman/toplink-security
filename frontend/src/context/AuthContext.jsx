import { createContext, useEffect, useState } from "react";
import { getMe, loginUser } from "../services/authService";

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("toplink_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("toplink_token") || null;
  });

  const [loading, setLoading] = useState(true);

  const login = async (payload) => {
    const result = await loginUser(payload);

    localStorage.setItem("toplink_token", result.token);
    localStorage.setItem("toplink_user", JSON.stringify(result.user));

    setToken(result.token);
    setUser(result.user);

    return result;
  };

  const logout = () => {
    localStorage.removeItem("toplink_token");
    localStorage.removeItem("toplink_user");

    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      if (!token) return;

      const result = await getMe();
      setUser(result.user);
      localStorage.setItem("toplink_user", JSON.stringify(result.user));
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();

    if (!token) {
      setLoading(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;