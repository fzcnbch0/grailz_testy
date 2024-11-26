import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Choice from '.';
import '@testing-library/jest-dom';


describe('Choice component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Choice />
      </MemoryRouter>
    );
  });

  test('renders Choice component', () => {
    expect(screen.getByTestId('choice')).toBeInTheDocument();
  });

  test('renders mens shop link', () => {
    const mensLink = screen.getByText('MENS');
    expect(mensLink.getAttribute('href')).toBe('/shop/men');
  });

  test('renders womens shop link', () => {
    const womensLink = screen.getByText('WOMENS');
    expect(womensLink.getAttribute('href')).toBe('/shop/women');
  });
});
