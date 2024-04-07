// npm i react-jwt

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { useJwt } from "react-jwt";
import NewsFeed from "./NewsFeed";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const { logout, token } = useContext(AuthContext);

  const handleClick = () => {
    localStorage.removeItem("token");
    logout();
  };

  const { decodedToken } = useJwt(token);

  return (
    <div className="container">
      <div className="title">
        <Link to="/">Stock Market Dashboard</Link>
        <button onClick={() => navigate("./news")}>News</button>
      </div>
      <nav>
        {token !== null && (
          <div>
            <span style={{ padding: "10px" }}>Hello, {decodedToken?.name}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {token === null && (
          <div>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/signup")}>Signup</button>
            {/* <Link to="login">Login</Link>
            <Link to="signup">Signup</Link> */}
          </div>
        )}
      </nav>
    </div>
  );
}
