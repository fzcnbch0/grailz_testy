import React from 'react';
import HomePage from '../pages/home';
import ShopPage from '../pages/ShopPage';
import AccountPage from '../pages/account';
import ItemPage from '../pages/item';
import RegisterPage from '../pages/registerPage';
import LogPage from '../pages/loginPage';
import CheckoutPage from '../pages/checkoutPage';
interface RouteItem {
  path: string;
  element: React.JSX.Element;
  label: string;
}

export const routes: Array<RouteItem> = [
  {
    path: '/',
    element: <HomePage />,
    label: 'Home',
  },
  {
    path: '/shop/:department/:category?',
    element: <ShopPage />,
    label: 'shop',
  },
  {
    path: '/account',
    element: <AccountPage />,
    label: 'account',
  },
  {
    path: '/account/register',
    element: <RegisterPage />,
    label: 'account',
  },
  {
    path: '/items/:id',
    element: <ItemPage />,
    label: 'account',
  },
  {
    path: '/login',
    element: <LogPage />,
    label: 'account',
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
    label: 'checkout',
  },
];
