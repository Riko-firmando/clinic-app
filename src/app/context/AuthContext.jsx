import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_PROFILE } from "@/graphql/queries";
import { useUserStore } from "@/store/useUserStore";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const setUser = useUserStore((s) => s.setUser);
  const clearUser = useUserStore((s) => s.clearUser);

  const { data, loading, error } = useQuery(GET_PROFILE, {
    skip: !token,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.me) {
      setUser(data.me); // 🔥 simpan ke zustand
    }

    if (error) {
      clearUser();
      localStorage.removeItem("token");
    }
  }, [data, error, setUser, clearUser]);

  const login = (accessToken) => {
    localStorage.setItem("token", accessToken);
    setToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    clearUser();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
