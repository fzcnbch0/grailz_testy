import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from '../../contexts/UserContext';
import LoginPage from './login';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('LoginPage', () => {
  it('submits form and calls login API', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        token: 'test-token',
        isLoggedIn: true,
        userId: 'test-user-id',
        name: 'test-name',
      },
    });

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter initialEntries={['/login']}>
        <UserProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </UserProvider>
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText('Nazwa użytkownika'), {
      target: { value: 'test-name' },
    });
    fireEvent.change(getByPlaceholderText('Hasło'), {
      target: { value: 'test-password' },
    });

    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/login', {
        name: 'test-name',
        password: 'test-password',
      });
    });
  });

  it('handles login failure due to incorrect credentials', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        isLoggedIn: false,
      },
    });

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter initialEntries={['/login']}>
        <UserProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </UserProvider>
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText('Nazwa użytkownika'), {
      target: { value: 'test-name' },
    });
    fireEvent.change(getByPlaceholderText('Hasło'), {
      target: { value: 'test-password' },
    });

    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/login', {
        name: 'test-name',
        password: 'test-password',
      });
    });

    // Here you can add assertions to check the behavior of your app when the login fails.
    // For example, you might check if an error message is displayed to the user.
  });

  it('handles login failure due to network error', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Network error'));

    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter initialEntries={['/login']}>
        <UserProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </UserProvider>
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText('Nazwa użytkownika'), {
      target: { value: 'test-name' },
    });
    fireEvent.change(getByPlaceholderText('Hasło'), {
      target: { value: 'test-password' },
    });

    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/login', {
        name: 'test-name',
        password: 'test-password',
      });
    });

    // Here you can add assertions to check the behavior of your app when the login fails due to a network error.
    // For example, you might check if an error message is displayed to the user.
  });
});


