import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function Watchlist() {
  const notify = () => toast("This item removed from watchlist !");
  const [watchlist, setWatchlist] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || []
  );

  const handleClick = (id) => {
    const updatedWatchlist = watchlist.filter((item) => item.id !== id);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    notify()
  };
  
  return (
    <div className="watchlist-main container">
      {
        watchlist.length ? watchlist.map(item=>{
          return(
            <div key={item.id} className="watch-card">
              <img src={item.image} alt={item.symbol} />
              <h3 className="" > {item.symbol} </h3>
              <p className="watch-cost"> <strong>Price:</strong> {item.price} </p>
              <p  > <strong>Change:</strong> <span className={
                      item.percentage > 0
                        ? "green"
                        : "red"
                    }>{item.percentage.toFixed(3)}%</span> </p>
              <button className="remove" onClick={()=> handleClick(item.id) } >Remove</button>
            </div>
          )
        }) : <p> Nothing to show here yet :( </p>
      }
              <ToastContainer/>
    </div>
  )
}

export default Watchlist