import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import Filter from '../filters';
import { Link } from 'react-router-dom';
import { useCurrency } from '../../contexts/CurrencyContext';

interface Item {
  item_id: number;
  name: string;
  description: string;
  price: string;
  image_path?: string;
}

interface ItemListProps {
  department?: string;
  category?: string;
}

const ItemList: React.FC<ItemListProps> = ({ department, category }) => {
  const { selectedCurrency, exchangeRates } = useCurrency();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async (filter = {}) => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filter as Record<string, string>).toString();
      let url = 'http://localhost:3000/items/filtr';
      if (department) {
        url += `/${department}`;
        if (category) {
          url += `/${category}`;
        }
      }
      const response = await axios.get<Item[]>(`${url}?${query}`);
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      setError('There was an error fetching the items!');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [department, category]);

  const convertPrice = (price: string) => {
    const basePrice = parseFloat(price);
    const exchangeRate = exchangeRates[selectedCurrency];
    return (basePrice * exchangeRate).toFixed(2);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div id='content-box'>
      <Filter onFilter={fetchItems} />
      <div id='listtt'>
        <ul id='itemsList'>
          {items.map(item => (
            <li key={item.item_id} className='singleItem'>
              <Link to={`/items/${item.item_id}`} id='productlink'>
                <img src={item.image_path || 'default-image-path.jpg'} alt={item.image_path} className='item-photo' />
                <h2 className='item-name'>{item.name}</h2>
                <p className='item-price'>{convertPrice(item.price)} {selectedCurrency}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ItemList;
