import Styles from "./HomeCard.module.css";

const HomeCard = ({ favInfo, price }) => {
  // console.log("Here is the stock info from HomeCard", favInfo);
  // console.log("Here is the price from HomeCard", price);
  return (
    <div className={Styles.CardContent}>
      <h1>{favInfo.name}</h1>
      <p>{favInfo.description}</p>
      <h2>Price: {price}</h2>
    </div>
  );
};
export default HomeCard;
