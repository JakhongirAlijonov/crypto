import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import LineChart from "../components/charts/LineChart";
import { useCurrency } from "../context/useContext";

function OneCoin() {
  const id = useParams();
  const {currency}=  useCurrency()
  const api = `https://api.coingecko.com/api/v3/coins/${id.id}`;
  const { data, isPending, error } = useFetch(api);
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };
  return (
    <div className="container">
      {isPending && <p>Loading...</p>}
      {error && <p> Error occured </p>}
      <div className="coin-chart">
        <LineChart id={id} />
      </div>
      {data && (
        <div className="coin-info ">
          <img
            src={data.image.large}
            alt={data.name}
            width={200}
            height={200}
          />
          <h2 className="Onecoin-name"> {data.name} </h2>
          <p
            className="onecoin-desc"
            dangerouslySetInnerHTML={createMarkup(
              data.description.en
            )}
          />
          <p className="rank">
           
            <strong>Rank:</strong> {data.market_cap_rank}{" "}
          </p>
          <p className="onecoin-price">
         
            <strong>Current price:</strong> 
            {data.market_data.current_price[currency]} {currency}
          </p>
          <p className="onecoin-cap">
        
            <strong> Market Cap: </strong> {data.market_data.market_cap[currency]} {currency}
          </p>
        </div>
      )}

      
    </div>
  );
}

export default OneCoin;
