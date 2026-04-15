import React from 'react';
import { Link } from 'react-router-dom';
import { useTryOn } from '../context/TryOnContext';

const parsePrice = (priceText) => {
  const cleaned = String(priceText || '')
    .replace(/[^\d.]/g, '');
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatInr = (value) =>
  `₹${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value)}`;

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartQuantity, clearCart } = useTryOn();

  const subtotal = cartItems.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
  const shipping = cartItems.length ? 99 : 0;
  const total = subtotal + shipping;

  if (!cartItems.length) {
    return (
      <section className="container" style={{ padding: '80px 20px', minHeight: '60vh', textAlign: 'center' }}>
        <h1 className="editorial-title" style={{ fontSize: 'clamp(40px, 8vw, 80px)', marginBottom: '20px' }}>Cart</h1>
        <p className="editorial-subtitle" style={{ marginBottom: '30px' }}>Your cart is currently empty.</p>
        <Link to="/collections">
          <button className="btn-black" style={{ display: 'inline-block', width: 'auto' }}>Continue Shopping</button>
        </Link>
      </section>
    );
  }

  return (
    <section className="container" style={{ padding: '56px 20px 80px', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center', margin: '40px 0 60px' }}>
        <h1 className="editorial-title" style={{ fontSize: 'clamp(40px, 8vw, 80px)' }}>Cart</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <article
              key={item.itemKey}
              className="cart-item-card"
            >
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-img"
              />

              <div>
                <h3 style={{ marginBottom: '6px', fontSize: '18px', fontWeight: '500' }}>{item.name}</h3>
                <p style={{ color: '#666', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Size: {item.size} | Color: {item.color}</p>
                <p style={{ marginTop: '12px', fontWeight: 600, fontSize: '16px' }}>{item.price}</p>
              </div>

              <div style={{ display: 'grid', alignContent: 'space-between', justifyItems: 'end' }}>
                <div style={{ display: 'inline-flex', border: '1px solid #ddd' }}>
                  <button
                    style={{ border: 0, background: '#f7f7f7', padding: '6px 10px', cursor: 'pointer' }}
                    onClick={() => updateCartQuantity(item.itemKey, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span style={{ padding: '6px 12px', minWidth: '34px', textAlign: 'center' }}>{item.quantity}</span>
                  <button
                    style={{ border: 0, background: '#f7f7f7', padding: '6px 10px', cursor: 'pointer' }}
                    onClick={() => updateCartQuantity(item.itemKey, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.itemKey)}
                  style={{ border: 0, background: 'transparent', color: '#a40000', cursor: 'pointer', fontSize: '12px' }}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary-card">
          <h2 style={{ fontSize: '20px', marginBottom: '24px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Order Summary</h2>
          <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
            <p style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal</span>
              <span>{formatInr(subtotal)}</span>
            </p>
            <p style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Shipping</span>
              <span>{formatInr(shipping)}</span>
            </p>
            <p style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, borderTop: '1px solid #000', paddingTop: '16px', marginTop: '8px' }}>
              <span>Total</span>
              <span>{formatInr(total)}</span>
            </p>
          </div>

          <button className="btn-black" style={{ marginBottom: '10px' }}>
            Proceed to Payment
          </button>
          <button className="btn-outline" onClick={clearCart} style={{ width: '100%' }}>
            Clear Cart
          </button>
        </aside>
      </div>
    </section>
  );
};

export default CartPage;
