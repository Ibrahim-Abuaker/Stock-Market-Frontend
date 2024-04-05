// npm i react-jwt

import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { useJwt } from "react-jwt";

export default function Navbar({ user, setUser }) {
  // const navigate = useNavigate();
  const { logout, token } = useContext(AuthContext);

  const handleClick = () => {
    localStorage.removeItem("token");
    logout();
  };

  const { decodedToken } = useJwt(token);
  console.log("Token:", token);
  console.log("Decoded Token:", decodedToken);

  return (
    <div className="container">
      <div className="title">
        <Link to="/">Dashboard</Link>
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
            <Link to="login">Login</Link>
            <Link to="signup">Signup</Link>
          </div>
        )}
      </nav>
    </div>
  );
}
