import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [buycoin, setBuycoin] = useState(0);
  const onChangeMoney = (event) => {
    setMoney(event.target.value);
  };
  const onSubmitMoney = (event) => {
    event.preventDefault();
  };
  const onChangeCoin = (event) => {
    setBuycoin(event.target.value.split(" ")[3]);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <input
        value={money}
        type="text"
        placeholder="Write you have money"
        onChange={onChangeMoney}
      />

      <h1>{money / buycoin}</h1>
      <h1>The Coins! {loading ? "" : `(${coins.length})`} </h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onChangeCoin}>
          {coins.map((coin, index) => (
            <option key={index}>
              {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
// api.coinpaprika.com/v1/tickers

export default App;
