import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { useCurrency } from '../../contexts/CurrencyContext';
interface CartItem {
  item: {
    item_id: number;
    name: string;
    description: string;
    price: string;
    item_category: {
      size: string;
      designer: string;
    };
    offer: {
      image_path: string;
    };
  };
}
interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

interface FullShippingInfo extends ShippingInfo {
  user: {
    name: string;
  };
}

const Checkout: React.FC = () => {
  const { user } = useUser();
  const { selectedCurrency, exchangeRates } = useCurrency();
  const userId  = user ? user.userId : 1;
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const [shippingInfo, setShippingInfo] = useState<FullShippingInfo | null>(null);
  const [phone, setPhone] = useState<string>('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:3000/users/${userId}/cart`);
          setCartItems(response.data);
        } catch (error) {
          setError('Failed to fetch cart items');
        }
      }
    };


    fetchCartItems();


    
    // Fetch shipping address and phone number when component mounts
    const fetchShippingDetails = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:3000/users/${userId}/shipping`);
          const shippingData = response.data;
          setShippingAddress(shippingData.address + ', ' + shippingData.city + ', ' + shippingData.state + ', ' + shippingData.country);
          setPhone(shippingData.phone_number);
          setShippingInfo(response.data);
          console.log(shippingInfo);
        } catch (error) {
          setError('Failed to fetch shipping details');
        }
      }
    };
    

    fetchShippingDetails();
  }, [userId]);

  useEffect(() => {
    const totalPrice = cartItems.reduce((acc, curr) => acc + parseFloat(curr.item.price), 0);
    setTotalPrice(totalPrice);
  }, [cartItems]);

  const handleOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    if (userId) {
      try {
        await axios.post(`http://localhost:3000/users/${userId}/order`, {
          items: cartItems.map(cartItem => cartItem.item.item_id)
        });
        setOrderPlaced(true);
        setCartItems([]);
      } catch (error) {
        setError('Failed to place order');
      }
    } else {
      setError('User is not logged in');
    }
  };
  

  if (orderPlaced) {
    return <div>Order has been placed successfully!</div>;
  }
  const convertPrice = (price: string) => {
    const basePrice = parseFloat(price);
    const exchangeRate = exchangeRates[selectedCurrency];
    return (basePrice * exchangeRate).toFixed(2);
  };

  return (
    <div className="checkout">
      <div className='formal-info'>
        <form>
          <div id='shipping'>
            <label htmlFor='shippingAddress' className='labels'>Shipping Address</label>
            <div className='data'>
            <div className='input-filed'> 
              <div id='common-info'>
                <p className='big-font-size'>{shippingInfo?.user?.name ? `${shippingInfo.user.name} ` : ''} </p>
                <p className='big-font-size'>{shippingInfo?.address} </p>
                <p className='small-font-size'> {shippingInfo?.city}, {shippingInfo?.state} </p>
                <p className='small-font-size'>{shippingInfo?.country}</p>
              </div>
            </div>
            </div>
          </div>
          <div id='phone'>
            <label htmlFor='phone' className='labels'>Phone</label>
            <div className='data'>
              <div className='input-filed'>
              <p>{phone}</p>
              </div>
            </div>
          </div>
          <div id='payment'>
  <label htmlFor='payment' className='labels'>Select Your Payment Method</label>
  <div className='data'>
    <div className='input-filed' id='payment-buttons-container'>
      <button className='payment-button'>
        <span className='payment-info'>Kartka</span>
      </button>
      <button className='payment-button' >
        <span className='payment-info'>Gotówka</span>
      </button>
    </div>
  </div>
</div>

          <button className='order-button' type='submit' onClick={handleOrder}>Order</button>
        </form>
      </div>

      <div className='checkout-items'>
        {error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            {cartItems.length === 0 ? (
              <div className="empty-cart">Cart is empty</div>
            ) : (
              <>
                <ul className="checkout-cart-items">
                  {cartItems.map((cartItem) => (
                    <li key={cartItem.item.item_id} className="checkout-cart-item">
                      <img src={cartItem.item.offer.image_path} alt={cartItem.item.name} />
                      <div className='checkout-prod-inf'>
                        <h3>{cartItem.item.name}</h3>
                        <div>Size: {cartItem.item.item_category.size}</div>
                        <div>Price: {cartItem.item.price} zł</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div id='generalinfo'>
                  <div id='order-details'>
                    <p className='checkout-heading'>Order Details</p>
                    <div id='checkout-price'>
                      <p>Listing Price</p>
                      <p className='total-prices'>{convertPrice(totalPrice.toFixed(2))} {selectedCurrency}</p>
                    </div>
                    <div id='checkout-shipping'>
                      <p>Shipping</p>
                      <p className='total-prices'>50{selectedCurrency}</p>
                    </div>
                    <div id='checkout-tax'>
                      <p>Estimated Tax</p>
                      <p className='total-prices'>0{selectedCurrency}</p>

                    </div>
                  </div>
                  <div id='agreement'>

                  </div>
                  
                 
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
