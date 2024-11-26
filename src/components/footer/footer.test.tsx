import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '.';
import '@testing-library/jest-dom';

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('renders the INFORMATION section', () => {
    const infoSection = screen.getByText('INFORMATION');
    expect(infoSection).toBeInTheDocument();
  });

  it('renders the TERMS & CONDITIONS section', () => {
    const termsSection = screen.getByText('TERMS & CONDITIONS');
    expect(termsSection).toBeInTheDocument();
  });

  it('renders the social icons', () => {
    const icons = screen.getAllByTestId('social-icon');
    expect(icons).toHaveLength(3);
  });

  it('renders the payment icons', () => {
    const paymentIcons = screen.getAllByTestId('payment-icon');
    expect(paymentIcons).toHaveLength(4);
  });

  it('renders the watermark', () => {
    const watermark = screen.getByText('© GRAILZ');
    expect(watermark).toBeInTheDocument();
  });
});
