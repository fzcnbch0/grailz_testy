import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import Cart from '../cart';
import './index.css';
import { useCurrency } from '../../contexts/CurrencyContext';

interface Currency {
  code: string;
  name: string;
}

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState<boolean>(false);
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const { department = 'all' } = useParams<{ department?: string }>();
  const { user } = useUser();
  const userId = user ? user.userId : null;

  const currencies: Currency[] = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'PLN', name: 'Zloty' }
  ];

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleCart = () => {
    if (!userId) {
      alert('You need to be logged in to use the cart.');
      return;
    }
    setCartOpen(!cartOpen);
    document.body.style.overflow = cartOpen ? 'auto' : 'hidden';
  };
  const toggleCurrencyDropdown = () => setCurrencyDropdownOpen(!currencyDropdownOpen);
  const handleCurrencySelect = (code: string) => {
    setSelectedCurrency(code);
    setCurrencyDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="text">GRAILZ</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">HOME</Link></li>
        <li className="dropdown">
          <button className="dropbtn" onClick={toggleDropdown}>SHOP</button>
          {dropdownOpen && (
            <div className="dropdown-content">
              <Link to={`/shop/${department}/bottoms`}>BOTTOMS</Link>
              <Link to={`/shop/${department}/tops`}>TOPS</Link>
              <Link to={`/shop/${department}/shoes`}>SHOES</Link>
              <Link to={`/shop/${department}/accessories`}>ACCESSORIES</Link>
            </div>
          )}
        </li>
        <li id="blanc"><Link to="/blanc-by-grailz">BLANK BY GRAILZ</Link></li>
      </ul>
      <ul className="navbar-actions">
        <li className="dropdown">
          <button className="dropbtn" onClick={toggleCurrencyDropdown}>{selectedCurrency}</button>
          {currencyDropdownOpen && (
            <div className="dropdown-content-c">
              {currencies.map(currency => (
                <button key={currency.code} onClick={() => handleCurrencySelect(currency.code)}>{currency.name}</button>
              ))}
            </div>
          )}
        </li>
        <li><Link to="/search">SEARCH</Link></li>
        <li><Link to="/account">ACCOUNT</Link></li>
        <li><a onClick={toggleCart} id="cart-button">CART</a></li>
      </ul>
      {userId && <Cart cartOpen={cartOpen} toggleCart={toggleCart} userId={userId} />}
    </nav>
  );
};

export default Navbar;
