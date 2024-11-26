import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useUser } from '../../contexts/UserContext';
import { useCurrency } from '../../contexts/CurrencyContext';

interface Item {
  item_id: number;
  name: string;
  description?: string;
  price?: number;
  item_category?: {
    department?: string;
    category?: string;
    size?: string;
    designer?: string;
  };
  measurements?: {
    length?: number;
    width?: number;
  };
  offer?: {
    image_path?: string;
  };
}

const getPageName = (path: string, itemName?: string): string => {
  switch (path) {
    case '/':
      return 'HOME';
    case '/shop/men':
      return 'MEN';
    case '/shop/women':
      return 'WOMEN';
    default:
      return itemName ? itemName : 'PAGE';
  }
};

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser(); // Pobierz informacje o aktualnie zalogowanym użytkowniku
  const userId = user ? user.userId : null; // Wyciągnij userId z kontekstu użytkownika

  const { selectedCurrency, exchangeRates } = useCurrency(); // Use currency context

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [isInCart, setIsInCart] = useState<boolean>(false); // Nowy stan dla sprawdzenia, czy przedmiot jest w koszyku

  useEffect(() => {
    if (!id) {
      setError('No item ID provided');
      setLoading(false);
      return;
    }

    const fetchItem = async () => {
      try {
        console.log(`Fetching item with ID: ${id}`);
        const response = await axios.get<Item>(`http://localhost:3000/items/id/${id}`);
        setItem(response.data);
        document.title = getPageName(window.location.pathname, response.data.name);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchUserCount = async () => {
      try {
        const response = await axios.get<{ itemId: number, userCount: number }>(`http://localhost:3000/items/${id}/user-count`);
        setUserCount(response.data.userCount);
      } catch (err) {
        console.error('Failed to fetch user count', err);
      }
    };

    const checkIfInCart = async () => {
      try {
        if (userId) {
          const response = await axios.get<{ inCart: boolean }>(`http://localhost:3000/users/${userId}/cart/${id}`);
          setIsInCart(response.data.inCart);
        }
      } catch (err) {
        console.error('Failed to check if item is in cart', err);
      }
    };

    fetchItem();
    fetchUserCount();
    checkIfInCart();
  }, [id, userId]);

  const handleToggleCart = async () => {
    if (!userId) {
      alert('You need to be logged in to add items to your favorites.');
      return;
    }

    if (!item) {
      console.error('Item is not loaded');
      return;
    }

    try {
      if (isInCart) {
        await axios.delete(`http://localhost:3000/users/${userId}/cart/${item.item_id}`);
        setIsInCart(false);
      } else {
        await axios.post(`http://localhost:3000/users/${userId}/cart`, { itemId: item.item_id });
        setIsInCart(true);
      }
    } catch (error) {
      console.error('Failed to toggle item in cart', error);
    }
  };

  const convertPrice = (price: number | undefined) => {
    if (price === undefined) return 'N/A';
    const basePrice = price;
    const exchangeRate = exchangeRates[selectedCurrency];
    return (basePrice * exchangeRate).toFixed(2);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id='item-container'>
      {item?.offer && (
        <div className="offer">
          <img src={item.offer.image_path} alt={item.name} />
        </div>
      )}
      <div className="item-detail">
        <div id='iinfo'>
          <div id='data'>
            <h1>{item?.name}</h1>
            <div className='subsection'>{item?.description}</div>
            <div>Price: {convertPrice(item?.price)} {selectedCurrency}</div>
            {item?.item_category && (
              <div className="category">
                <div className='subsection'>Department  <p>{item.item_category.department}</p> </div>
                <div className='subsection'>Category <p>{item.item_category.category}</p> </div>
                <div className='subsection'>Size  <p>{item.item_category.size}</p> </div>
                <div className='subsection'>Designer <p>{item.item_category.designer}</p></div>
              </div>
            )}
          </div>
          <div id='likecounter'>
            {userCount !== null && (
              <div className="user-count">
                <FontAwesomeIcon icon={faHeart} id='heart-icon' onClick={handleToggleCart} style={{ color: isInCart ? 'red' : 'black' }} />
                <p> {userCount}</p>
              </div>
            )}
          </div>
        </div>
        {item?.measurements && (
          <div className="measurements">
            <table>
              <tr>
                <th className='legend'>Length:</th>
                <th className='value'>{item.measurements.length} cm</th>
              </tr>
              <tr>
                <th className='legend'>Width:</th>
                <th className='value'>{item.measurements.width} cm</th>
              </tr>
            </table>
          </div>
        )}
        <div className='actions'>
          <button className='item-actions-button' id='purchase'>PURCHASE</button>
          <button className='item-actions-button'>OFFER</button>
          <button className='item-actions-button'>MESSAGE</button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
