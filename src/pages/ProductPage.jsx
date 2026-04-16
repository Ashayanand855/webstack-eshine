import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductDetails from '../components/ProductDetails';
import { defaultProduct } from '../data/products';

const ProductPage = () => {
  const location = useLocation();
  const product = location.state?.product || defaultProduct;

  return <ProductDetails product={product} />;
};

export default ProductPage;
