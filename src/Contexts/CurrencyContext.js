import { createContext, useContext, useEffect, useState, useMemo } from "react";

const CurrencyContext = createContext();

const KEY = "fca_live_qs8ovMhP2am2kETawTSuf4VFn08t1johxAYNmYY6";

export function CurrencyProvider({ children }) {
  const [currencyList, setCurrencyList] = useState([]);

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const res = await fetch(
          `https://api.freecurrencyapi.com/v1/currencies?apikey=${KEY}&currencies=`
        );
        if (!res.ok) throw new Error("Failed to fetch currencies");
        const data = await res.json();
        const currencies = Object.entries(data.data).map(([code, obj]) => ({
          code,
          symbol: obj.symbol_native || obj.symbol || "$",
          name: obj.name,
        }));
        setCurrencyList(currencies);
      } catch (err) {
        console.error("Failed to fetch currencies:", err);
      }
    }
    fetchCurrencies();
  }, []);

  // Memoize the currency list to prevent unnecessary re-renders
  const memoizedCurrencyList = useMemo(() => currencyList, [currencyList]);

  return (
    <CurrencyContext.Provider value={memoizedCurrencyList}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrencyList() {
  return useContext(CurrencyContext);
}
