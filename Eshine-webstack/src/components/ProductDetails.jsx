import React, { useEffect, useState } from 'react';
import { ShoppingBag, Star, CheckCircle2, XCircle, Truck } from 'lucide-react';
import { useTryOn } from '../context/TryOnContext';

const ProductDetails = ({ product }) => {
  const { addToCart } = useTryOn();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.id || '');
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    setActiveImage(0);
    setSelectedSize(product.sizes?.[0] || 'M');
    setSelectedColor(product.colors?.[0]?.id || '');
    setPincode('');
    setDeliveryStatus(null);
  }, [product]);

  const currentColor =
    product.colors?.find((color) => color.id === selectedColor) || product.colors?.[0];
  const galleryImages =
    currentColor?.images?.length ? currentColor.images : product.images?.length ? product.images : [product.img];
  const reviews = product.reviews || [
    { name: 'Priya M.', text: 'Absolutely love the quality and fit. The finish feels premium.', stars: 5 },
    { name: 'Rohan K.', text: 'Very wearable and stylish. Looks even better in person.', stars: 4 },
    { name: 'Ananya S.', text: 'True to size and easy to style for multiple occasions.', stars: 5 },
  ];

  const handlePincodeCheck = () => {
    if (pincode.length !== 6) {
      setDeliveryStatus('invalid');
      return;
    }

    setDeliveryStatus(pincode.endsWith('0') ? 'error' : 'success');
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: galleryImages[activeImage] || product.img,
      color: currentColor?.label || 'Default',
      size: selectedSize,
    });
    setCartMessage('Added to cart.');
    window.setTimeout(() => setCartMessage(''), 1800);
  };

  return (
    <div className="product-page-wrapper container">
      <div className="product-grid">
        <div className="gallery-section">
          <div className="main-image-container">
            <img src={galleryImages[activeImage] || product.img} alt={product.name} className="main-image" />
          </div>

          <div className="thumbnail-strip">
            {galleryImages.map((img, idx) => (
              <div
                key={`${product.id}-${idx}`}
                className={`thumbnail ${activeImage === idx ? 'active' : ''}`}
                onClick={() => setActiveImage(idx)}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="product-details">
          <div className="product-header">
            <h1>{product.name}</h1>
            <p className="product-price">{product.price}</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div className="stars">
              <Star /><Star /><Star /><Star /><Star />
            </div>
            <span style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              ({reviews.length * 42} Reviews)
            </span>
          </div>

          <p className="product-desc">{product.description}</p>

          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '15px 0' }} />

          <div className="selector-group">
            <span className="selector-label">Size: {selectedSize}</span>
            <div className="options-row">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="selector-group" style={{ marginTop: '10px' }}>
            <span className="selector-label">
              Color: <span style={{ textTransform: 'capitalize' }}>{currentColor?.label || 'Default'}</span>
            </span>
            <div className="options-row">
              {product.colors.map((color) => (
                <button
                  key={color.id}
                  className={`color-btn ${selectedColor === color.id ? 'selected' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(color.id)}
                  aria-label={color.label}
                  title={color.label}
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              className="btn-black"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} /> Add to Cart
            </button>
          </div>
          {cartMessage ? (
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#1d5f2b', letterSpacing: '0.5px' }}>
              {cartMessage}
            </p>
          ) : null}

          <div className="pincode-checker">
            <div className="pincode-header">
              <Truck size={18} />
              <span>Check Delivery Availability</span>
            </div>

            <div className="pincode-input-group">
              <input
                type="text"
                placeholder="Enter 6-digit Pincode"
                className="pincode-input"
                maxLength={6}
                value={pincode}
                onChange={(event) => setPincode(event.target.value.replace(/\D/g, ''))}
              />
              <button className="btn-check" onClick={handlePincodeCheck}>
                Check
              </button>
            </div>

            {deliveryStatus === 'success' && (
              <div className="pincode-result pincode-success">
                <CheckCircle2 size={16} /> Delivery available for {pincode}. Standard delivery in 3-5 days.
              </div>
            )}

            {deliveryStatus === 'error' && (
              <div className="pincode-result pincode-error">
                <XCircle size={16} /> Sorry, we currently do not deliver to {pincode}.
              </div>
            )}

            {deliveryStatus === 'invalid' && (
              <div className="pincode-result pincode-error" style={{ color: '#888' }}>
                Please enter a valid 6-digit pincode.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <div className="reviews-header">
          <h2>Customer Reviews</h2>
          <button className="btn-black" style={{ width: 'auto', padding: '10px 20px', fontSize: '12px' }}>
            Write a Review
          </button>
        </div>

        <div className="review-list">
          {reviews.map((review, index) => (
            <div key={`${product.id}-review-${index}`} className="review-card">
              <div className="review-meta">
                <div className="avatar">{review.name.charAt(0)}</div>
                <div className="reviewer-info">
                  <h4>{review.name}</h4>
                  <div className="stars">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} fill={idx < review.stars ? 'currentColor' : 'none'} strokeWidth={idx < review.stars ? 0 : 1} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="review-body">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
