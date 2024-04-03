// import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NewsFeed from "./components/NewsFeed";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";
import "./App.css";

function App() {
  const localAPI = "http://localhost:8090";
  const deployedAPI = "https://stock-market-backend.onrender.com";
  const { token } = useContext(AuthContext);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/news"
          element={token ? <NewsFeed /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
