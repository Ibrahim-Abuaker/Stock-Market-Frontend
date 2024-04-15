// npm i react-jwt

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { useJwt } from "react-jwt";
import style from "./Navbar.module.css";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const { logout, token } = useContext(AuthContext);

  const handleClick = () => {
    localStorage.removeItem("token");
    logout();
  };

  const { decodedToken } = useJwt(token);

  return (
    <div className={style.container}>
      <div className={style.title}>
        <Link to="/">Stock Market Dashboard</Link>
      </div>
      <div className={style.headerLinks}>
        <button onClick={() => navigate("./news")}>News</button>
        <button onClick={() => navigate("./search")}>Search</button>
      </div>

      <nav>
        {token !== null && (
          <div className={style.logout}>
            <span style={{ padding: "10px" }}>Hello, {decodedToken?.name}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {token === null && (
          <div className={style.loginSignup}>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/signup")}>Signup</button>
          </div>
        )}
      </nav>
    </div>
  );
}
