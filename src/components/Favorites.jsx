const Favorites = ({ favorites }) => {
  console.log("Here is the favouriteList", favorites);
  console.log("the data type of favouriteList", typeof favorites);

  return (
    <div>
      <h1>My Favorite Listtttttt</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Ticker</th>
          </tr>
        </thead>
        <tbody>
          {(favorites || []).map((favorite, index) => (
            <tr key={index}>
              <td>{favorite.stock.name}</td>
              <td>{favorite.stock.ticker}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Favorites;
// Path: src/components/Favorites.jsx
