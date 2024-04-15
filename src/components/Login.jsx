import { useState } from "react";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
//npm i --legacy-peer-deps react-loading-overlay
import LoadingOverlay from "react-loading-overlay";
import config from "../config/Config";
import style from "./LoginSignup.module.css";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = config.base_url + "/user/login";

    setIsLoading(true);
    setError(null);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    console.log(response);
    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      // setTimeout(() => {
      localStorage.setItem("token", data.token);
      setIsLoading(false);
      login(data.token);
      // }, 1500);
    }
  };

  return (
    <LoadingOverlay active={isLoading} spinner text="Logging in...">
      <form className={style.form} onSubmit={handleSubmit}>
        <h3>Log in</h3>
        <label>email: </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>password: </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button className={style.button}>Log in</button>
        {error && <div className="error">{error}</div>}
      </form>
    </LoadingOverlay>
  );
}
