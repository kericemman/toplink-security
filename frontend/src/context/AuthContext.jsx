import { useEffect, useState } from "react";
import { getMe, loginUser } from "../services/authService";
import AuthContext from "./authContext";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("toplink_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("toplink_token") || null;
  });

  const [loading, setLoading] = useState(() => Boolean(token));

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

  useEffect(() => {
    if (!token) return;

    let active = true;

    const refreshUser = async () => {
      try {
        const result = await getMe();

        if (active) {
          setUser(result.user);
          localStorage.setItem("toplink_user", JSON.stringify(result.user));
        }
      } catch {
        if (active) {
          localStorage.removeItem("toplink_token");
          localStorage.removeItem("toplink_user");
          setToken(null);
          setUser(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    refreshUser();

    return () => {
      active = false;
    };
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
