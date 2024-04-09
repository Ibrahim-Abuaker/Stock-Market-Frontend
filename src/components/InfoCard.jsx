import Styles from "./InfoCard.module.css";

const InfoCard = ({ stockInfo, price }) => {
  console.log("Here is the stock info from InfoCard", stockInfo);
  console.log("Here is the price from InfoCard", price);
  return (
    <div className={Styles.CardContent}>
      <h1>{stockInfo.name}</h1>
      <p>{stockInfo.description}</p>
      <h2>Price: {price}</h2>
    </div>
  );
};
export default InfoCard;
