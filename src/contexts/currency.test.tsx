// CurrencyContext.test.tsx
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { CurrencyProvider, useCurrency } from './CurrencyContext';

const TestComponent = () => {
  const { selectedCurrency, setSelectedCurrency, exchangeRates } = useCurrency();
  return (
    <div>
      <div data-testid="selected-currency">{selectedCurrency}</div>
      <div data-testid="exchange-rates">{JSON.stringify(exchangeRates)}</div>
      <button onClick={() => setSelectedCurrency('EUR')}>Change Currency</button>
    </div>
  );
};

describe('CurrencyContext', () => {
  test('provides default values', () => {
    render(
      <CurrencyProvider>
        <TestComponent />
      </CurrencyProvider>
    );

    expect(screen.getByTestId('selected-currency').textContent).toBe('USD');
    expect(screen.getByTestId('exchange-rates').textContent).toBe(
      JSON.stringify({ USD: 1, EUR: 0.85, JPY: 110, PLN: 4.0 })
    );
  });

  test('allows updating the selected currency', () => {
    render(
      <CurrencyProvider>
        <TestComponent />
      </CurrencyProvider>
    );

    act(() => {
      screen.getByText('Change Currency').click();
    });

    expect(screen.getByTestId('selected-currency').textContent).toBe('EUR');
  });

  test('throws error when used outside of CurrencyProvider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const renderWithoutProvider = () => {
      render(<TestComponent />);
    };

    expect(renderWithoutProvider).toThrow('useCurrency must be used within a CurrencyProvider');
    
    consoleError.mockRestore();
  });
});
