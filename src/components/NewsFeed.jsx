import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import NewsCard from "./NewsCard";
import config from "../config/Config";
import Styles from "./NewsFeed.module.css";

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const getNews = async () => {
      console.log("Token:", token);
      try {
        const res = await fetch(config.base_url + "/news", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const newsData = await res.json();
        setNews(newsData.data);
        console.log("Here is the newsData", newsData.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    // if (token || !token) {
    getNews();
    //    }
  }, []);
  console.log("HERE is the news", news);

  return (
    <div className={Styles.container}>
      {loading ? (
        <h1>Loading...</h1>
      ) : news.length ? (
        news.map((card) => (
          <div className={Styles.newsCard}>
            {" "}
            <NewsCard key={card.id} card={card} />{" "}
          </div>
        ))
      ) : (
        <h1>No news available</h1>
      )}
    </div>
  );
};
export default NewsFeed;
