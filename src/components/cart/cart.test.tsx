import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import Cart from '../cart'; // Adjust the import path as necessary

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const mockCartItems = [
  {
    item: {
      item_id: 1,
      name: 'Test Item 1',
      description: 'Test Description 1',
      price: '100',
      item_category: { size: 'M', designer: 'Designer 1' },
      offer: { image_path: '/path/to/image1.jpg' },
    },
  },
  {
    item: {
      item_id: 2,
      name: 'Test Item 2',
      description: 'Test Description 2',
      price: '200',
      item_category: { size: 'L', designer: 'Designer 2' },
      offer: { image_path: '/path/to/image2.jpg' },
    },
  },
];

describe('Cart Component', () => {
  const mockToggleCart = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly when cartOpen is false', () => {
    render(
      <Router>
        <Cart cartOpen={false} toggleCart={mockToggleCart} userId={1} />
      </Router>
    );

    expect(screen.queryByText('Cart')).not.toBeInTheDocument();
  });

  test('fetches and renders cart items when cartOpen is true', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockCartItems });

    render(
      <Router>
        <Cart cartOpen={true} toggleCart={mockToggleCart} userId={1} />
      </Router>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    expect(screen.getByText('Test Item 2')).toBeInTheDocument();
    expect(screen.getByText(/Total: 300\.00złPLN/)).toBeInTheDocument(); // Use regex matcher for the total price
  });

  test('displays error message when API call fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Failed to fetch cart items'));

    render(
      <Router>
        <Cart cartOpen={true} toggleCart={mockToggleCart} userId={1} />
      </Router>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(screen.getByText('Failed to fetch cart items')).toBeInTheDocument();
  });

  test('calculates total price correctly', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockCartItems });

    render(
      <Router>
        <Cart cartOpen={true} toggleCart={mockToggleCart} userId={1} />
      </Router>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(screen.getByText(/Total: 300\.00złPLN/)).toBeInTheDocument(); // Use regex matcher for the total price
  });

  test('handles agreement checkbox', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockCartItems });

    render(
      <Router>
        <Cart cartOpen={true} toggleCart={mockToggleCart} userId={1} />
      </Router>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const checkbox = screen.getByLabelText('I agree to the terms and conditions');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('navigates to checkout on successful checkout', async () => {
    const mockNavigate = jest.fn();
    (axios.get as jest.Mock).mockResolvedValue({ data: mockCartItems });
    (require('react-router-dom').useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <Router>
        <Cart cartOpen={true} toggleCart={mockToggleCart} userId={1} />
      </Router>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const checkbox = screen.getByLabelText('I agree to the terms and conditions');
    fireEvent.click(checkbox);

    const checkoutButton = screen.getByText('Checkout');
    fireEvent.click(checkoutButton);

    expect(mockNavigate).toHaveBeenCalledWith('/checkout');
  });

  test('alerts when terms are not agreed to', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockCartItems });
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <Router>
        <Cart cartOpen={true} toggleCart={mockToggleCart} userId={1} />
      </Router>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const checkoutButton = screen.getByText('Checkout');
    fireEvent.click(checkoutButton);

    expect(window.alert).toHaveBeenCalledWith('Please agree to the terms and conditions.');
  });
});
