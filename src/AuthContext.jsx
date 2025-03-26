import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
  async function signup() {
    try {
      const response = await fetch(`${API}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "AliSamadi",
          password: "Gholi27096",
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setToken(result.token);
        setLocation("TABLET");
      } else {
        console.error("signup failed:", result);
      }
    } catch (e) {
      console.error("oh no ;(", e);
    }
  }

  // TODO: authenticate
  async function authenticate(token) {
    try {
      const response = await fetch(`${API}/authenticate`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setLocation("TUNNEL");
      } else {
        console.error("Authentication failed:", result);
      }
    } catch (e) {
      console.error(e);
    }
  }
  const value = { location, token, signup, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
