import React from 'react';
import './indexx.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faTiktok, faCcMastercard, faCcVisa, faCcPaypal, faCcApplePay } from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
  return (
    <footer className="footer">
      <div id='footer-content'>
        <div id='sections'>
          <div className="footer-section">
            <h4>INFORMATION</h4>
            <ul>
              <li>SHIPPING</li>
              <li>CONTACT</li>
              <li>FAQ</li>
              <li>ABOUT</li>
              <li>RETURNS</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>TERMS & CONDITIONS</h4>
            <ul>
              <li>TERMS</li>
              <li>PRIVACY POLICY</li>
            </ul>
          </div>
          <div className="footer-section">
            <ul id='icons'>
              <li><FontAwesomeIcon icon={faInstagram} className="social-icon" size='2x' data-testid="social-icon" /></li>
              <li><FontAwesomeIcon icon={faFacebookF} className="social-icon" size='2x'data-testid="social-icon"/></li>
              <li><FontAwesomeIcon icon={faTiktok} className="social-icon" size='2x'data-testid="social-icon"/></li>
            </ul>
          </div>
        </div>
        <div id='payment2'>
          <div id='watermark'>
             © GRAILZ
          </div>
          <ul>
            <li><FontAwesomeIcon icon={faCcMastercard} className="payment-icon" size='2x' data-testid="payment-icon"/></li>
            <li><FontAwesomeIcon icon={faCcVisa} className="payment-icon" size='2x' data-testid="payment-icon"/></li>
            <li><FontAwesomeIcon icon={faCcPaypal} className="payment-icon"size='2x' data-testid="payment-icon"/></li>
            <li><FontAwesomeIcon icon={faCcApplePay} className="payment-icon" size='2x' data-testid="payment-icon"/></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
