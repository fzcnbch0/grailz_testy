import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { useCurrency } from '../../contexts/CurrencyContext';
import ItemList from '../item'; // Adjust the import path as necessary

jest.mock('axios');
jest.mock('../../contexts/CurrencyContext', () => ({
  useCurrency: jest.fn(),
}));

const mockItems = [
  {
    item_id: 1,
    name: 'Test Item 1',
    description: 'Test Description 1',
    price: '100',
    image_path: '/path/to/image1.jpg',
  },
  {
    item_id: 2,
    name: 'Test Item 2',
    description: 'Test Description 2',
    price: '200',
    image_path: '/path/to/image2.jpg',
  },
];

describe('ItemList Component', () => {
  const mockFetchItems = jest.fn();
  const mockUseCurrency = {
    selectedCurrency: 'USD',
    exchangeRates: {
      USD: 1,
      EUR: 0.85,
    },
  };

  beforeEach(() => {
    (useCurrency as jest.Mock).mockReturnValue(mockUseCurrency);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(
      <Router>
        <ItemList />
      </Router>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('fetches and renders items correctly', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockItems });

    render(
      <Router>
        <ItemList />
      </Router>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    expect(screen.getByText('Test Item 2')).toBeInTheDocument();
    expect(screen.getByText('100.00 USD')).toBeInTheDocument();
    expect(screen.getByText('200.00 USD')).toBeInTheDocument();
  });

  test('displays error message when API call fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('There was an error fetching the items!'));

    render(
      <Router>
        <ItemList />
      </Router>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(screen.getByText('There was an error fetching the items!')).toBeInTheDocument();
  });

  test('interacts with Filter component', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockItems });

    render(
      <Router>
        <ItemList />
      </Router>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const filterButton = screen.getByText('Apply Filter'); // Assuming your Filter component has a button with this text
    fireEvent.click(filterButton);

    expect(axios.get).toHaveBeenCalledTimes(2); // Initial fetch + filter fetch
  });

  test('calculates prices in selected currency correctly', async () => {
    mockUseCurrency.selectedCurrency = 'EUR';
    render(
      <Router>
        <ItemList />
      </Router>
    );

    (axios.get as jest.Mock).mockResolvedValue({ data: mockItems });

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    expect(screen.getByText('85.00 EUR')).toBeInTheDocument();
    expect(screen.getByText('170.00 EUR')).toBeInTheDocument();
  });

  test('renders department and category correctly in URL', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockItems });

    render(
      <Router>
        <ItemList department="electronics" category="phones" />
      </Router>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/items/filtr/electronics/phones?'));
  });
});
