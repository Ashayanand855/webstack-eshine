import React from 'react';
import { Link } from 'react-router-dom';
import { womenProducts } from '../data/products';

const WomenPage = () => {
  return (
    <div className="product-page-wrapper" style={{ minHeight: '80vh' }}>
      <section className="container">
        <div style={{ textAlign: 'center', margin: '40px 0 30px' }}>
          <h1 className="section-title" style={{ marginBottom: '10px' }}>Women's Collection</h1>
          <p style={{ color: '#666', letterSpacing: '1px' }}>Curated essentials for every occasion.</p>
        </div>

        <div className="grid-4" style={{ marginBottom: '80px' }}>
          {womenProducts.map((item, idx) => (
            <div className="product-card" key={item.id || idx}>
              <Link to="/product" state={{ product: item }} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="product-img-wrapper">
                    <img src={item.img} alt={item.name} />
                </div>
                <div className="product-info" style={{ textAlign: 'center', marginTop: '15px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '400', marginBottom: '5px' }}>{item.name}</h3>
                    <p className="price" style={{ color: '#555' }}>{item.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WomenPage;
