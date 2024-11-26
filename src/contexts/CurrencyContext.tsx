import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CurrencyContextProps {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  exchangeRates: { [key: string]: number };
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const exchangeRates = {
    USD: 1,
    EUR: 0.85,
    JPY: 110,
    PLN: 4.0,
  };

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency, exchangeRates }}>
      {children}
    </CurrencyContext.Provider>
  );
};
