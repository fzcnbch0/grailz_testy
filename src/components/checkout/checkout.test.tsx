import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Checkout from '../checkout';
import { useUser } from '../../contexts/UserContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the useUser and useCurrency hooks
jest.mock('../../contexts/UserContext');
jest.mock('../../contexts/CurrencyContext');

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockUseUser = useUser as jest.MockedFunction<typeof useUser>;
const mockUseCurrency = useCurrency as jest.MockedFunction<typeof useCurrency>;

describe('Checkout Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks();

    // Mock user context
    mockUseUser.mockReturnValue({
      user: {
        userId: 1,
        name: 'Test User'
      },
      setUser: jest.fn()  // Mock setUser function
    });

    // Mock currency context
    mockUseCurrency.mockReturnValue({
      selectedCurrency: 'USD',
      exchangeRates: {
        USD: 1,
        EUR: 0.85
      },
      setSelectedCurrency: jest.fn()  // Mock setSelectedCurrency function
    });

    // Mock axios responses
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('/cart')) {
        return Promise.resolve({
          data: [
            {
              item: {
                item_id: 1,
                name: 'Test Item',
                description: 'A test item',
                price: '10.00',
                item_category: {
                  size: 'M',
                  designer: 'Test Designer'
                },
                offer: {
                  image_path: '/path/to/image.jpg'
                }
              }
            }
          ]
        });
      } else if (url.includes('/shipping')) {
        return Promise.resolve({
          data: {
            address: '123 Test St',
            city: 'Test City',
            state: 'TS',
            postalCode: '12345',
            country: 'Test Country',
            phone_number: '123-456-7890',
            user: {
              name: 'Test User'
            }
          }
        });
      }
      return Promise.reject(new Error('not found'));
    });

    mockedAxios.post.mockResolvedValue({});
  });

  test('renders Checkout component', async () => {
    render(
      <Router>
        <Checkout />
      </Router>
    );

    expect(screen.getByText('Shipping Address')).toBeInTheDocument;
    expect(screen.getByText('Phone')).toBeInTheDocument;
    expect(screen.getByText('Select Your Payment Method')).toBeInTheDocument;
    expect(screen.getByText('Order')).toBeInTheDocument;
  });

  test('fetches and displays cart items', async () => {
    render(
      <Router>
        <Checkout />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('Test Item')).toBeInTheDocument);
    expect(screen.getByText('Size: M')).toBeInTheDocument;
    expect(screen.getByText('Price: 10.00 zł')).toBeInTheDocument;
  });

  test('displays shipping information', async () => {
    render(
      <Router>
        <Checkout />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('123 Test St')).toBeInTheDocument);
    expect(screen.getByText('Test City, TS')).toBeInTheDocument;
    expect(screen.getByText('Test Country')).toBeInTheDocument;
    expect(screen.getByText('123-456-7890')).toBeInTheDocument;
  });

  test('handles order placement', async () => {
    render(
      <Router>
        <Checkout />
      </Router>
    );

    fireEvent.click(screen.getByText('Order'));

    await waitFor(() => expect(screen.getByText('Order has been placed successfully!')).toBeInTheDocument);
  });

  test('displays error on failed cart items fetch', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Failed to fetch cart items'));

    render(
      <Router>
        <Checkout />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('Failed to fetch cart items')).toBeInTheDocument);
  });

  test('displays error on failed order placement', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Failed to place order'));

    render(
      <Router>
        <Checkout />
      </Router>
    );

    fireEvent.click(screen.getByText('Order'));

    await waitFor(() => expect(screen.getByText('Failed to place order')).toBeInTheDocument);
  });

  // New test cases

  test('displays empty cart message', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(
      <Router>
        <Checkout />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('Cart is empty')).toBeInTheDocument);
  });

  test('displays error on failed shipping details fetch', async () => {
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes('/cart')) {
        return Promise.resolve({
          data: [
            {
              item: {
                item_id: 1,
                name: 'Test Item',
                description: 'A test item',
                price: '10.00',
                item_category: {
                  size: 'M',
                  designer: 'Test Designer'
                },
                offer: {
                  image_path: '/path/to/image.jpg'
                }
              }
            }
          ]
        });
      } else if (url.includes('/shipping')) {
        return Promise.reject(new Error('Failed to fetch shipping details'));
      }
      return Promise.reject(new Error('not found'));
    });

    render(
      <Router>
        <Checkout />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('Failed to fetch shipping details')).toBeInTheDocument);
  });

});
