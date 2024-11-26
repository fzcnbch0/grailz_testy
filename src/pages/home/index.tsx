import React, { useEffect } from 'react';
import Navbar from '../../components/navbar';
import Choice from '../../components/choice';
import ItemList from '../../components/item';
import Footer from '../../components/footer';
import './style.css';

function HomePage() {
  useEffect(() => {
    document.title = 'Grailz - Homepage';
  }, []);

  return (
    <>
      <Navbar />
      <Choice />
      <div id="heading">
        <a id="directory">View all products</a>
      </div>
      <ItemList />
      <Footer />
    </>
  );
}

export default HomePage;
