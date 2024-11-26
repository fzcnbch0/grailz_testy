import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import RegisterComponent from './index';
import { useNavigate } from 'react-router-dom';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('RegisterComponent', () => {

  const mockNavigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle registration error', async () => {
    mockedAxios.post.mockImplementationOnce(() => Promise.reject(new Error('Registration error')));

    const { getByPlaceholderText, getByText } = render(
      <Router>
        <RegisterComponent />
      </Router>
    );

    fireEvent.change(getByPlaceholderText('Nazwa użytkownika'), { target: { value: 'testUser' } });
    fireEvent.change(getByPlaceholderText('Hasło'), { target: { value: 'testPassword' } });
    fireEvent.change(getByPlaceholderText('Miasto'), { target: { value: 'testCity' } });

    fireEvent.click(getByText('Register'));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/login/register', {
        name: 'testUser',
        password: 'testPassword',
        city: 'testCity',
      });
    });
  });

  it('should register a user when form is submitted', async () => {
    mockedAxios.post.mockResolvedValue({ status: 201 });

    const { getByPlaceholderText, getByText } = render(
      <Router>
        <RegisterComponent />
      </Router>
    );

    fireEvent.change(getByPlaceholderText('Nazwa użytkownika'), { target: { value: 'testUser' } });
    fireEvent.change(getByPlaceholderText('Hasło'), { target: { value: 'testPassword' } });
    fireEvent.change(getByPlaceholderText('Miasto'), { target: { value: 'testCity' } });

    fireEvent.click(getByText('Register'));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/login/register', {
        name: 'testUser',
        password: 'testPassword',
        city: 'testCity',
      });
    });
  });

  it('should handle failed registration', async () => {
    mockedAxios.post.mockResolvedValue({ status: 400 });

    const { getByPlaceholderText, getByText } = render(
      <Router>
        <RegisterComponent />
      </Router>
    );

    fireEvent.change(getByPlaceholderText('Nazwa użytkownika'), { target: { value: 'testUser' } });
    fireEvent.change(getByPlaceholderText('Hasło'), { target: { value: 'testPassword' } });
    fireEvent.change(getByPlaceholderText('Miasto'), { target: { value: 'testCity' } });

    fireEvent.click(getByText('Register'));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/login/register', {
        name: 'testUser',
        password: 'testPassword',
        city: 'testCity',
      });
    });
  });

  it('should handle success registration and redirect', async () => {
    mockedAxios.post.mockResolvedValue({ status: 201 });

    const { getByPlaceholderText, getByText } = render(
      <Router>
        <RegisterComponent />
      </Router>
    );

    fireEvent.change(getByPlaceholderText('Nazwa użytkownika'), { target: { value: 'testUser' } });
    fireEvent.change(getByPlaceholderText('Hasło'), { target: { value: 'testPassword' } });
    fireEvent.change(getByPlaceholderText('Miasto'), { target: { value: 'testCity' } });

    fireEvent.click(getByText('Register'));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/login/register', {
        name: 'testUser',
        password: 'testPassword',
        city: 'testCity',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/account');
    });
  });
});
