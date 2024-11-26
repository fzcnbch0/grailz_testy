import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AccountDetail from '.';
import axios from 'axios';
import '@testing-library/jest-dom';
import { useUser } from '../../contexts/UserContext';

jest.mock('axios');
jest.mock('../../UserContext', () => ({
  useUser: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AccountDetail component', () => {
  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({
      user: { userId: 1 },
    });

    mockedAxios.get.mockResolvedValue({
      data: {
        user_id: 1,
        name: 'Test User',
        balance: '100',
        city: 'Test City',
        password: 'password',
        user_orders: [],
        primary_address: {
          address_id: 1,
          street: 'Test Street',
          city: 'Test City',
          country: 'Test Country',
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders AccountDetail component', async () => {
    render(<AccountDetail />);

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Welcome back, Test User')).toBeInTheDocument();
    expect(screen.getByText('Primary Address')).toBeInTheDocument();
    expect(screen.getByText('Street: Test Street')).toBeInTheDocument();
    expect(screen.getByText('City: Test City')).toBeInTheDocument();
    expect(screen.getByText('Country: Test Country')).toBeInTheDocument();
  });

  test('displays an error message when user data fetch fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Failed to fetch user data'));

    render(<AccountDetail />);

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Error: Failed to fetch user data')).toBeInTheDocument();
  });

  test('renders user orders when available', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        // ...other user data
        user_orders: [
          {
            order_id: 1,
            item_id: 1,
            item: {
              item_id: 1,
              name: 'Test Item',
              price: '100',
              item_category: {
                size: 'Medium',
              },
              offer: {
                image_path: 'test-image.jpg',
              },
            },
          },
        ],
      },
    });

    render(<AccountDetail />);

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('Price: $100')).toBeInTheDocument();
    expect(screen.getByText('Size: Medium')).toBeInTheDocument();
    expect(screen.getByAltText('Test Item')).toBeInTheDocument();
  });
});
