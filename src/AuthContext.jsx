import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
  async function signup() {
    try {
      const response = await fetch(API, {
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
      return result.token;
      setToken(result.token);
      setLocation("TABLET");
    } catch (e) {
      console.error("oh no ;(");
    }
  }

  // TODO: authenticate
  async function authenticate(token) {
    try {
      const response = await fetch(API, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      return result;
      setLocation("TUNNEL");
    } catch (e) {
      console.error(e);
    }
  }
  const value = { location, token , signup , authenticate};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
