import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("poo_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const token = user ? localStorage.getItem("poo_token") : null;

  function login(username, newToken) {
    localStorage.setItem("poo_token", newToken);
    localStorage.setItem("poo_user", JSON.stringify({ username }));
    setUser({ username });
  }

  function logout() {
    localStorage.removeItem("poo_token");
    localStorage.removeItem("poo_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
