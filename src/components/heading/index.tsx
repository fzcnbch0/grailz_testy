import "./index.css";
import { useLocation } from "react-router-dom";
import React from "react";
function Heading() {
  const location = useLocation();

  const getPageName = (path: string): string => {
    if (path === '/') {
      return 'HOME';
    }else if (path === '/shop/men') {
      return 'HOME / MEN';
    } else if (path.startsWith('/items/')) {
      return 'HOME / ITEM';
    } else if (path === '/shop/women') {
      return 'HOME / WOMEN';
    } else if (path === '/account') {
      return 'HOME / ACCOUNT';
    } else if (path === '/account/register') {
      return 'HOME / REGISTER';
    }else if (path === '/checkout') {
      return ' CHECKOUT';
    }else {
      return 'HOME / PAGE';
    }
  };
  

  const currentPath = location.pathname;
  const pageName = getPageName(currentPath);
  console.log(pageName);

  return (
    <>
      <div id="heading">
        <a id="directory"> {pageName}</a>
      </div>
    </>
  );
}

export default Heading;
