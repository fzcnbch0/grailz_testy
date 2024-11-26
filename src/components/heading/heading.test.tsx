import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Heading from '.';
import React from 'react';

describe('Heading', () => {
  it('should render HOME when path is /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Heading />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('HOME / HOME')).toBeInTheDocument;
  });

  it('should render MEN when path is /shop/men', () => {
    render(
      <MemoryRouter initialEntries={['/shop/men']}>
        <Routes>
          <Route path="/shop/men" element={<Heading />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('HOME / MEN')).toBeInTheDocument;
  });

  // Add more tests for other paths
  it('should render ITEM when path starts with /items/', () => {
    render(
      <MemoryRouter initialEntries={['/items/123']}>
        <Routes>
          <Route path="/items/*" element={<Heading />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('HOME / ITEM')).toBeInTheDocument;
  });

  it('should render WOMEN when path is /shop/women', () => {
    render(
      <MemoryRouter initialEntries={['/shop/women']}>
        <Routes>
          <Route path="/shop/women" element={<Heading />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('HOME / WOMEN')).toBeInTheDocument;
  });

  it('should render ACCOUNT when path is /account', () => {
    render(
      <MemoryRouter initialEntries={['/account']}>
        <Routes>
          <Route path="/account" element={<Heading />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('HOME / ACCOUNT')).toBeInTheDocument;
  });

  it('should render REGISTER when path is /account/register', () => {
    render(
      <MemoryRouter initialEntries={['/account/register']}>
        <Routes>
          <Route path="/account/register" element={<Heading />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('HOME / REGISTER')).toBeInTheDocument;
  });

  it('should render PAGE when path is not defined', () => {
    render(
      <MemoryRouter initialEntries={['/undefined-path']}>
        <Routes>
          <Route path="/*" element={<Heading />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('HOME / PAGE')).toBeInTheDocument;
  });
});
