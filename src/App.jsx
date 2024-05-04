import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import OneCoin from "./pages/OneCoin";
import { CurrencyProvider } from "./context/useContext";
import Watchlist from "./pages/Watchlist";

function App() {
  return (
    <div className="App ">
       <CurrencyProvider>
        
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<OneCoin />} />
          <Route path="/watchlist" element={<Watchlist/>} />
        </Routes>
      </Router>
       </CurrencyProvider>
    </div>
  );
}

export default App;
