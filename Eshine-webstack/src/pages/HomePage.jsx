import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const slides = [
    '/landing-page/srcimgs/hover1.png',
    '/landing-page/srcimgs/hover2.jpg',
    '/landing-page/srcimgs/hover3.webp',
  ];
  const featuredLooks = [
    { img: '/landing-page/srcimgs/model1.png', name: 'Signature Wrap', price: 'Rs. 4,599' },
    { img: '/landing-page/srcimgs/model2.png', name: 'Signature Wrap', price: 'Rs. 4,599' },
    { img: '/landing-page/srcimgs/model3.png', name: 'Signature Wrap', price: 'Rs. 4,599' },
  ];
  const gridLooks = [
    { img: '/landing-page/srcimgs/grid4img1.webp', name: 'Summer Dress', price: 'Rs. 3,499' },
    { img: '/landing-page/srcimgs/grid4img2.jpg', name: 'Classic Fit', price: 'Rs. 2,899' },
    { img: '/landing-page/srcimgs/grid4img3.jpg', name: 'Monochrome Set', price: 'Rs. 5,200' },
    { img: '/landing-page/srcimgs/grid4img4.webp', name: 'Premium Coat', price: 'Rs. 8,100' },
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <section className="hero">
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <img 
              key={index}
              src={slide} 
              className={`hero-img ${index === activeIndex ? 'active' : ''}`} 
              alt="Hero Slide"
            />
          ))}
        </div>
        <div className="hero-overlay"></div>
        
        <div className="hero-content-box">
          <p className="brand">Eshine</p>
          <h1>Collections</h1>
          <p className="description">
            Experience our exclusive minimal designs, curated specifically for premium looks.
          </p>
          <Link to="/collections">
             <button className="btn-black">Shop Now</button>
          </Link>
        </div>

        <div className="hero-pagination">
          {slides.map((_, index) => (
            <div 
              key={index}
              className={`pagination-bar ${index === activeIndex ? 'active' : ''}`}
            ></div>
          ))}
        </div>
      </section>

      <section className="container section-padding">
        <div className="grid-3">
          {featuredLooks.map((item, index) => (
            <div className="product-card" key={index}>
              <div style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="product-img-wrapper">
                    <img src={item.img} alt={item.name} />
                </div>
                <div className="product-info">
                    <h3>{item.name}</h3>
                    <p className="price">{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="featured-banner">
          <img src="/landing-page/srcimgs/feature.png" alt="Featured" className="featured-banner-img" />
          <div className="featured-box">
            <p className="cloth-name">Editorial Fit</p>
            <h2>SUMMER<br/>EDITORIAL</h2>
            <p className="context">Discover pieces that elevate your wardrobe to the next level of minimalism.</p>
            <Link to="/collections">
              <button className="btn-black">RS. 8,990</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container ai-stylist">
        <div className="ai-stylist-content">
          <p className="presenting">Presenting You</p>
          <h2>AI Chat Stylist</h2>
          <p className="brief">Get personalized fashion recommendations based on your event, style, and preferences from your account dashboard.</p>
          <Link to="/account">
            <button className="btn-outline">Open Account Chat</button>
          </Link>
        </div>
        <img src="/landing-page/srcimgs/hover2.jpg" alt="Stylist" className="ai-stylist-img" />
      </section>

      <section className="container mb-16">
        <div className="grid-4">
          {gridLooks.map((item, idx) => (
            <div className="product-card" key={idx}>
              <div style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="product-img-wrapper">
                    <img src={item.img} alt={item.name} />
                </div>
                <div className="product-info">
                    <h3>{item.name}</h3>
                    <p className="price">{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="review-section" style={{ marginTop: '80px' }}>
        <h2 className="section-title text-center">What Our Customers Say</h2>
        <div className="marquee-container">
          <div className="marquee-track">
            {/* Duplicated for smooth infinite scroll */}
            {[1, 2].map((group) => (
              <React.Fragment key={group}>
                <div className="review-card" style={{marginRight: '30px'}}>
                  <div className="review-content">
                    <div className="review-header">
                      <img src="https://i.pravatar.cc/100?img=1" alt="Priya" className="customer-pfp" />
                      <div className="review-meta" style={{marginBottom: 0}}>
                        <h4 style={{margin: 0}}>Priya M.</h4>
                        <div className="stars">⭐⭐⭐⭐⭐</div>
                      </div>
                    </div>
                    <p className="review-text">"Absolutely love the quality and fit of the Midnight Silk Dress. Eshine never disappoints!"</p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&auto=format&fit=crop" alt="Dress" className="bought-item-img" />
                </div>

                <div className="review-card" style={{marginRight: '30px'}}>
                  <div className="review-content">
                    <div className="review-header">
                      <img src="https://i.pravatar.cc/100?img=11" alt="Rohan" className="customer-pfp" />
                      <div className="review-meta" style={{marginBottom: 0}}>
                        <h4 style={{margin: 0}}>Rohan K.</h4>
                        <div className="stars">⭐⭐⭐⭐⭐</div>
                      </div>
                    </div>
                    <p className="review-text">"The Urban Chic Bomber is my new go-to jacket. The material is premium and shipping was fast."</p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&auto=format&fit=crop" alt="Bomber" className="bought-item-img" />
                </div>

                <div className="review-card" style={{marginRight: '30px'}}>
                  <div className="review-content">
                    <div className="review-header">
                      <img src="https://i.pravatar.cc/100?img=5" alt="Ananya" className="customer-pfp" />
                      <div className="review-meta" style={{marginBottom: 0}}>
                        <h4 style={{margin: 0}}>Ananya S.</h4>
                        <div className="stars">⭐⭐⭐⭐</div>
                      </div>
                    </div>
                    <p className="review-text">"A perfect wardrobe staple. The white blouse fits beautifully and pairs with everything."</p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=100&auto=format&fit=crop" alt="Blouse" className="bought-item-img" />
                </div>

                <div className="review-card" style={{marginRight: '30px'}}>
                  <div className="review-content">
                    <div className="review-header">
                      <img src="https://i.pravatar.cc/100?img=15" alt="Vikram" className="customer-pfp" />
                      <div className="review-meta" style={{marginBottom: 0}}>
                        <h4 style={{margin: 0}}>Vikram P.</h4>
                        <div className="stars">⭐⭐⭐⭐⭐</div>
                      </div>
                    </div>
                    <p className="review-text">"Love the vintage wash on this denim jacket. It feels instantly broken-in and comfortable."</p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=100&auto=format&fit=crop" alt="Jacket" className="bought-item-img" />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default HomePage;
