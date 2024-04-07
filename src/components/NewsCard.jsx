import { Link } from "react-router-dom";
import Styles from "./NewsCard.module.css";

const NewsCard = ({ card }) => {
  const placeholderImageUrl =
    "https://media.warriortrading.com/2020/05/shutterstock_1402151111.jpg";
  return (
    <div className={Styles.newsCard}>
      <Link to={card.url} target="_blank" rel="noopener noreferrer">
        <div className={Styles.newsInfo}>
          <p>{card.source}</p>
          <img
            src={!card.image ? placeholderImageUrl : card.image}
            alt={card.title}
          />
          <h3>{card.headline}</h3>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
