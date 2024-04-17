import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import config from "../config/Config";
import HashLoader from "react-spinners/HashLoader";
import style from "./LoginSignup.module.css";

export default function Signup({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("#72a6da");

  const { login } = useContext(AuthContext);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = config.base_url + "/user/signup";

    setIsLoading(true);
    setError(null);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      localStorage.setItem("token", data.token);
      setIsLoading(false);
      login(data.token);
    }
  };

  return isLoading ? (
    <HashLoader
      color={color}
      loading={isLoading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  ) : (
    <div class={style.box}>
      <form class={style.form} onSubmit={handleSubmit}>
        <h3>Signup</h3>
        <div class={style.formGroup}>
          <label>Username:</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            class={style.formControl}
          />

          <label>Email:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            class={style.formControl}
          />
        </div>

        <div class={style.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            class={style.formControl}
          />
        </div>

        <button type="submit" class={style.submitButton}>
          Log in
        </button>
        {error && <div class={style.error}>{error}</div>}
      </form>
    </div>
  );
}
