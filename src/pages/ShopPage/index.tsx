import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar';
import ItemList from '../../components/item';
import Heading from '../../components/heading';
import Footer from '../../components/footer';

const ShopPage: React.FC = () => {
  const { department, category } = useParams<{ department: string, category?: string }>();

  return (
    <div>
      <Navbar />
      <Heading />
      <ItemList department={department} category={category} />
      <Footer />
    </div>
  );
};

export default ShopPage;
