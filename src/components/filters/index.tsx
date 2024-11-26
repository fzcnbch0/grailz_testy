// Filter.tsx
import React, { useState } from 'react';
import './index.css';

interface FilterProps {
  onFilter: (filter: { name?: string; minPrice?: string; maxPrice?: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [name, setName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilter = () => {
    onFilter({ name, minPrice, maxPrice });
  };

  return (
    <div id='filter-box'>
      <h3>Filter Items</h3>
      <div className='filtr'>
        <label htmlFor="name">Name:</label>
        <input
        id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='filtr'>
        <label htmlFor="minPrice">Min Price:</label>
        <input
         id="minPrice"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>
      <div className='filtr'>
        <label htmlFor="maxPrice">Max Price:</label>
        <input
        id="maxPrice"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <button id='apply-button' onClick={handleFilter}>Apply Filter</button>
    </div>
  );
};

export default Filter;
