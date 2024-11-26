import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { useNavigate } from "react-router-dom";

interface CartProps {
  cartOpen: boolean;
  toggleCart: () => void;
  userId: number; // Assuming you pass userId as a prop to Cart component
}

interface CartItem {
  item: {
    item_id: number;
    name: string;
    description: string;
    price: string; // Changed to number type for easier calculation
    item_category: {
      size: string;
      designer: string;
    };
    offer: {
      image_path: string;
    };
  };
}

const Cart: React.FC<CartProps> = ({ cartOpen, toggleCart, userId }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0); // State variable to hold total price
  const [agreed, setAgreed] = useState<boolean>(false); // State variable to track agreement
  const navigate = useNavigate(); // Move useNavigate here

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}/cart`);
        setCartItems(response.data);
      } catch (error) {
        setError('Failed to fetch cart items');
      }
    };

    if (cartOpen) {
      fetchCartItems();
    }
  }, [cartOpen, userId]);

  // Calculate total price whenever cart items change
  useEffect(() => {
    const totalPrice = cartItems.reduce((acc, curr) => acc + parseFloat(curr.item.price), 0);
    setTotalPrice(totalPrice);
  }, [cartItems]);

  const handleCheckout = () => {
    if (!agreed) {
      alert("Please agree to the terms and conditions.");
    } else {
      navigate('/checkout');
    }
  };

  return (
    <>
      {cartOpen && (
        <div className="cart-popup">
          <div className="cart-content">
            <div className="cart-heading">
              <div className="carttext">Cart</div>
              <button className="close-btn" onClick={toggleCart}>
                X
              </button>
            </div>
            {error ? (
              <div className="error">{error}</div>
            ) : (
              <>
                {cartItems.length === 0 ? (
                  <div className="empty-cart">Cart empty</div>
                ) : (
                  <>
                    <ul className="cart-items">
                      {cartItems.map((cartItem) => (
                        <li key={cartItem.item.item_id} className="cart-item">
                          <img src={cartItem.item.offer.image_path} alt={cartItem.item.name} />
                          <div className='prod-inf'>
                            <h3>{cartItem.item.name}</h3>
                            <div>Size: {cartItem.item.item_category.size}</div>
                            <div>Price: {cartItem.item.price} zł</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div id='generalinfo'>
                      <label>
                        <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} id='checkbox'/>
                        I agree to the terms and conditions
                      </label>
                      <p id='price'>Total: {totalPrice.toFixed(2)}złPLN</p>
                      <p id='tax'>Tax included and shipping calculated at checkout</p>
                      <div id='buttons'>
                        <button className='cart-buttons'>View Cart</button>
                        <button className='cart-buttons' onClick={handleCheckout}>Checkout</button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
