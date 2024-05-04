import { Link } from "react-router-dom";
import { useCurrency } from "../../context/useContext";

function Navbar() {
  const { currency, changeCurrency } = useCurrency();

  const handleCurrencyChange = (e) => {
    changeCurrency(e.target.value);
  };


  return (
    <div className="container header">
      <Link to={'/'} className="header-link"> CRYPTOFOLIO  </Link>
      <div className="header-items">
        <select name="curency" id="currency" value={currency} onChange={handleCurrencyChange}>
          <option value="usd">USD</option>
          <option value="rub">RUB</option>
          <option value="eur">EURO</option>
        </select>
        <Link to={'/watchlist'} >WATCHLIST</Link>
      </div>
    </div>
  );
}

export default Navbar;
