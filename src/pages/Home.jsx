import { Swiper, SwiperSlide } from "swiper/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import { useFetch } from "../hooks/useFetch";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrency } from "../context/useContext";
function Home() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const {currency} = useCurrency()
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`;
  const { data, isPending, error } = useFetch(apiUrl);
  const notify = () => toast("This item added to watchlist !");
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const filteredData = data?.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleAddToWatchlist = (id, itemData) => {
    const watchlist = localStorage.getItem("watchlist")
      ? JSON.parse(localStorage.getItem("watchlist"))
      : [];

    if (!watchlist.some((item) => item.id === id)) {
      watchlist.push({ id, ...itemData });
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      notify();
    }
  };
  return (
    <div className="hero container ">
      <h1 className="hero-title">CRYPTOFOLIO WATCH LIST</h1>
      <h4 className="hero-subtitle">
        Get all the Info regarding your favorite Crypto Currency
      </h4>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
        }}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {isPending & <p> Loading...</p>}
        {error && <p>Error occured</p>}
        {data &&
          data.map((crypt) => {
            return (
              <SwiperSlide key={crypt.id}>
                <img src={crypt.image} alt={crypt.id} width={80} height={80} />
                <h4 className="crypto-name">
                  {crypt.symbol}{" "}
                  <span
                    className={
                      crypt.market_cap_change_percentage_24h > 0
                        ? "green"
                        : "red"
                    }
                  >
                    {" "}
                    {crypt.market_cap_change_percentage_24h.toFixed(2)}%{" "}
                  </span>{" "}
                </h4>
                <h5 className="coin-cost"> {crypt.current_price}{ currency }  </h5>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <section className="section ">
        <h1 className="section-title">Cryptocurrency Prices by Market Cap</h1>
        <input type="text" placeholder="Search For a Crypto Currency.."   onChange={(e) => setSearchQuery(e.target.value)} />
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {filteredData ? (
          <div className="table-container">
          <table className="table">
            <tr className="table-headers">
              <th>Coin</th>
              <th>Price</th>
              <th>24h change</th>
              <th>Market cap</th>
            </tr>
            {filteredData.map((item) => {
              return (
                <tr key={item.id} className="coin-card">
                  <td>
                    <Link className="coin-wrap" to={`coin/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.symbol}
                        width={50}
                        height={50}
                      />
                      <div className="">
                        <h3> {item.symbol} </h3>
                        <h5> {item.name} </h5>
                      </div>
                    </Link>
                  </td>
                  <td> {item.current_price} {currency}  </td>
                  <td>
                    <span
                      className="watchlist-add"
                      onClick={() =>
                        handleAddToWatchlist(item.id, {
                          image: item.image,
                          symbol: item.symbol,
                          price: item.current_price,
                          percentage: item.market_cap_change_percentage_24h,
                        })
                      }
                    >
                      👁
                    </span>
                    <span
                      className={
                        item.market_cap_change_percentage_24h > 0
                          ? "green"
                          : "red"
                      }
                    >
                      {item.price_change_percentage_24h_in_currency.toFixed(3)}%
                    </span>{" "}
                  </td>
                  <td> ${item.market_cap}M </td>
                </tr>
              );
            })}
          </table>
          </div>
        ) : <p > Nothing to show here :(</p>}
        <ToastContainer />

        <button onClick={handlePrevPage} disabled={page === 1}>
          Prev
        </button>
        <button onClick={handleNextPage}>Next</button>
      </section>
    </div>
  );
}

export default Home;
