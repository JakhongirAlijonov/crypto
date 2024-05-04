import  { createContext, useState, useContext } from "react";

// Create a new context
const CurrencyContext = createContext();

// Custom hook to use currency context
export function useCurrency() {
  return useContext(CurrencyContext);
}

// Context provider component
export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("usd");

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export default CurrencyContext;
