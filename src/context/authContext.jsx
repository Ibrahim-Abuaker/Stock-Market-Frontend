import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //The first useEffect is responsible for initializing the token state
  //when the component is first mounted.
  //It retrieves the token value from the local storage using localStorage.
  //getItem("token") and updates the token state with the stored token value if it exists.

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("storedToken", storedToken);
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // The second useEffect monitors changes to the token state and performs
  // actions based on those changes.
  // When the token value changes, it updates the corresponding value in the
  // local storage using localStorage.setItem("token", token).
  // If the token is null, it removes the corresponding value from
  // the local storage using localStorage.removeItem("token").
  // By including [token] as the dependency array, this effect will
  // run whenever the token value changes.
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // useEffect(() => {
  //   if (token) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, [token]);

  // Let's also create two functions, one to login and one to logout.
  // The login function should take a token as a parameter and use the setToken to
  // change the token state to the argument we pass to it.
  // The logout simply needs to set the token state to null
  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  //Remember to pass everything we need to make available within
  //this context to the value attribute.
  //We're going to need token, login and logout.

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
