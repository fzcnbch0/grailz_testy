// Filter.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Filter from '.';
import { describe, expect, test } from '@jest/globals';


test('should update input values and call onFilter when button is clicked', () => {
  const handleFilter = jest.fn();
  const { getByLabelText, getByText } = render(<Filter onFilter={handleFilter} />);

  fireEvent.change(getByLabelText(/Name:/i), { target: { value: 'Test' } });
  fireEvent.change(getByLabelText(/Min Price:/i), { target: { value: '10' } });
  fireEvent.change(getByLabelText(/Max Price:/i), { target: { value: '100' } });

  fireEvent.click(getByText(/Apply Filter/i));

  expect(handleFilter).toHaveBeenCalledWith({ name: 'Test', minPrice: '10', maxPrice: '100' });
});
