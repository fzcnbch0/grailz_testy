import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { useCurrency } from '../../contexts/CurrencyContext';
import { useUser } from '../../contexts/UserContext';
import Navbar from '../navbar'; // Adjust the import path as necessary

jest.mock('../../contexts/CurrencyContext', () => ({
  useCurrency: jest.fn(),
}));

jest.mock('../../contexts/UserContext', () => ({
  useUser: jest.fn(),
}));

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useParams: jest.fn(),
  };
});

describe('Navbar Component', () => {
  const mockUseCurrency = {
    selectedCurrency: 'USD',
    setSelectedCurrency: jest.fn(),
  };
  const mockUseUser = {
    user: { userId: 1 },
  };

  beforeEach(() => {
    (useCurrency as jest.Mock).mockReturnValue(mockUseCurrency);
    (useUser as jest.Mock).mockReturnValue(mockUseUser);
    (require('react-router-dom').useParams as jest.Mock).mockReturnValue({ department: 'all' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Navbar with initial elements', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(screen.getByText('GRAILZ')).toBeInTheDocument();
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('SHOP')).toBeInTheDocument();
    expect(screen.getByText('BLANK BY GRAILZ')).toBeInTheDocument();
    expect(screen.getByText('SEARCH')).toBeInTheDocument();
    expect(screen.getByText('ACCOUNT')).toBeInTheDocument();
    expect(screen.getByText('CART')).toBeInTheDocument();
  });

  test('toggles shop dropdown menu', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const shopButton = screen.getByText('SHOP');
    fireEvent.click(shopButton);
    expect(screen.getByText('BOTTOMS')).toBeInTheDocument();
    expect(screen.getByText('TOPS')).toBeInTheDocument();
    expect(screen.getByText('SHOES')).toBeInTheDocument();
    expect(screen.getByText('ACCESSORIES')).toBeInTheDocument();
  });

  test('toggles currency dropdown menu and selects currency', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const currencyButton = screen.getByText('USD');
    fireEvent.click(currencyButton);
    expect(screen.getByText('US Dollar')).toBeInTheDocument();
    expect(screen.getByText('Euro')).toBeInTheDocument();
    expect(screen.getByText('Japanese Yen')).toBeInTheDocument();
    expect(screen.getByText('Zloty')).toBeInTheDocument();

    const euroButton = screen.getByText('Euro');
    fireEvent.click(euroButton);
    expect(mockUseCurrency.setSelectedCurrency).toHaveBeenCalledWith('EUR');
  });

  test('displays alert if cart is clicked when user is not logged in', () => {
    (useUser as jest.Mock).mockReturnValue({ user: null });
    window.alert = jest.fn();

    render(
      <Router>
        <Navbar />
      </Router>
    );

    const cartButton = screen.getByText('CART');
    fireEvent.click(cartButton);
    expect(window.alert).toHaveBeenCalledWith('You need to be logged in to use the cart.');
  });

  test('toggles cart if user is logged in', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const cartButton = screen.getByText('CART');
    fireEvent.click(cartButton);
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  test('renders department links correctly based on useParams', () => {
    (require('react-router-dom').useParams as jest.Mock).mockReturnValue({ department: 'men' });

    render(
      <Router>
        <Navbar />
      </Router>
    );

    const shopButton = screen.getByText('SHOP');
    fireEvent.click(shopButton);
    expect(screen.getByText('BOTTOMS').closest('a')).toHaveAttribute('href', '/shop/men/bottoms');
    expect(screen.getByText('TOPS').closest('a')).toHaveAttribute('href', '/shop/men/tops');
    expect(screen.getByText('SHOES').closest('a')).toHaveAttribute('href', '/shop/men/shoes');
    expect(screen.getByText('ACCESSORIES').closest('a')).toHaveAttribute('href', '/shop/men/accessories');
  });
});
