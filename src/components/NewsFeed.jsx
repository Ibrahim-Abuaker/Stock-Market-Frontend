import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function NewsFeed({ user }) {
  const [newsPosts, setnNewsPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:8090/news", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        setPosts(data);
        // console.log(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (token) {
      getData();
    }
  }, [token]);

  console.log("HERE", newsPosts);

  return (
    <div className="newsPosts">
      {loading ? ( // Show loading message if loading is true
        <h1>Loading...</h1>
      ) : (
        <>
          {newsPosts.length ? (
            posts.map((newsPost) => (
              <div
                key={newsPost._id}
                style={{ border: "2px solid black", margin: "10px" }}
              >
                <h2>{newsPost.title}</h2>
                <p>{newsPost.body}</p>
              </div>
            ))
          ) : (
            <h1 style={{ color: "red" }}>No posts found</h1>
          )}
        </>
      )}
    </div>
  );
}
