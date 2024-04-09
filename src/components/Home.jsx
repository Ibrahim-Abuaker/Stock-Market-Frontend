import NewsFeed from "./NewsFeed";
import Navbar from "./Navbar";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

export default function Home() {
  const { token } = useContext(AuthContext);

  return (
    <>
      <h1>Welcome to the Home Page</h1>
      <p>Click below to view the News Feed</p>
      <Link to="/news">News Feed</Link>;<Link to="/search"> Search </Link>
    </>
  );
}
