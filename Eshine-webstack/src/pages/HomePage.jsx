import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, User } from 'lucide-react'

const featuredLooks = [
  { img: '/landing-page/srcimgs/model1.png', name: 'Oversized Cotton Tee', price: 'Rs. 899' },
  { img: '/landing-page/srcimgs/model2.png', name: 'Tailored Wool Trousers', price: 'Rs. 1,999' },
  { img: '/landing-page/srcimgs/model3.png', name: 'Knitted V-Neck Sweater', price: 'Rs. 1,599' },
]

const gridLooks = [
  { img: '/landing-page/srcimgs/grid4img1.webp', name: 'Midnight Silk Dress', price: 'Rs. 1,099' },
  { img: '/landing-page/srcimgs/grid4img2.jpg', name: 'Urban Chic Bomber', price: 'Rs. 1,299' },
  { img: '/landing-page/srcimgs/grid4img3.jpg', name: 'Classic White Blouse', price: 'Rs. 1,499' },
  { img: '/landing-page/srcimgs/grid4img4.webp', name: 'Vintage Denim Jacket', price: 'Rs. 1,699' },
]

const reviews = [
  {
    name: 'Priya M.',
    rating: '⭐⭐⭐⭐⭐',
    text: 'Absolutely love the quality and fit of the Midnight Silk Dress. Eshine never disappoints!',
    avatar: 'https://i.pravatar.cc/100?img=1',
    item: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&auto=format&fit=crop',
    itemAlt: 'Midnight Silk Dress',
  },
  {
    name: 'Rohan K.',
    rating: '⭐⭐⭐⭐⭐',
    text: 'The Urban Chic Bomber is my new go-to jacket. The material feels premium and delivery was smooth.',
    avatar: 'https://i.pravatar.cc/100?img=11',
    item: 'https://images.unsplash.com/photo-1434389670869-c4147f15414f?w=100&auto=format&fit=crop',
    itemAlt: 'Urban Chic Bomber',
  },
  {
    name: 'Ananya S.',
    rating: '⭐⭐⭐⭐',
    text: 'A perfect wardrobe staple. The white blouse fits beautifully and pairs with everything.',
    avatar: 'https://i.pravatar.cc/100?img=5',
    item: 'https://images.unsplash.com/photo-1550614000-4b95d4edae1f?w=100&auto=format&fit=crop',
    itemAlt: 'Classic White Blouse',
  },
  {
    name: 'Vikram P.',
    rating: '⭐⭐⭐⭐⭐',
    text: 'Love the vintage wash on this denim jacket. It feels instantly broken-in and comfortable.',
    avatar: 'https://i.pravatar.cc/100?img=15',
    item: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=100&auto=format&fit=crop',
    itemAlt: 'Vintage Denim Jacket',
  },
]

const HomePage = () => {
  return (
    <>
      <section className="editorial-landing">
        <div className="editorial-shell">
          <header className="editorial-topbar">
            <Link to="/" className="editorial-brand-link">E-SHINE</Link>

            <nav className="editorial-nav">
              <a href="#editorial-story">About</a>
              <Link to="/men">Men</Link>
              <Link to="/women">Women</Link>
              <Link to="/collections">Collection</Link>
              <a href="#footer-contact">Contact</a>
            </nav>

            <div className="editorial-actions">
              <Link to="/account" className="editorial-top-link">AI STUDIO <span>→</span></Link>
              <Link to="/account" className="nav-icon-link editorial-icon-link" title="Account">
                <User size={22} strokeWidth={1.8} />
              </Link>
              <Link to="/cart" className="nav-icon-link editorial-icon-link" title="Cart">
                <ShoppingBag size={22} strokeWidth={1.8} />
              </Link>
            </div>
          </header>

          <div className="editorial-hero" id="editorial-story">
            <div className="editorial-word">SH....INE</div>

            <div className="editorial-copy editorial-panel editorial-panel-left editorial-interactive">
              <p className="editorial-eyebrow">OUR CAMPAIGN</p>
              <h2>👀</h2>
              <p>Fashion that feels soft,modern.</p>
            </div>

            <div className="editorial-copy editorial-panel editorial-panel-right editorial-interactive">
              <p className="editorial-eyebrow">FALL / WINTER 2026</p>
              <h2>⛄️🍂</h2>
              <p>Make you feel cozy...</p>
            </div>

            <div className="editorial-model-stack">
              <article className="editorial-model-card editorial-back-card editorial-interactive">
                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80"
                  alt="Fashion model"
                />
              </article>

              <article className="editorial-model-card editorial-middle-card editorial-interactive">
                <img
                  src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80"
                  alt="Editorial portrait"
                />
              </article>

              <article className="editorial-model-card editorial-front-card editorial-interactive">
                <video
                  src="/landing-page/srcimgs/fashion-video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label="Luxury campaign video portrait"
                />
              </article>
            </div>

            <div className="editorial-mini editorial-panel editorial-score-card editorial-interactive">
              <span className="editorial-mini-label">WEAR...</span>
            </div>

            <div className="editorial-mini editorial-panel editorial-category-card editorial-interactive">
              <span className="editorial-mini-label">CATEGORY</span>
              <p>That fit you</p>
            </div>

            <div className="editorial-mini editorial-panel editorial-ai-card editorial-interactive">
              <span className="editorial-mini-label">AI SUGGESTION</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-padding">
        <div className="grid-3">
          {featuredLooks.map((item) => (
            <div className="product-card" key={item.name}>
              <div className="product-img-wrapper">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="product-info">
                <h3>{item.name}</h3>
                <p className="price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="featured-banner">
          <img src="/landing-page/srcimgs/feature.png" alt="Featured" className="featured-banner-img" />
          <div className="featured-box">
            <p className="cloth-name">Limited Edition</p>
            <h2>Exclusive pieces crafted for those who dare to stand out.</h2>
            <Link to="/collections">
              <button className="btn-black">Shop Now</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mb-16">
        <div className="grid-4">
          {gridLooks.map((item) => (
            <div className="product-card" key={item.name}>
              <div className="product-img-wrapper">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="product-info">
                <h3>{item.name}</h3>
                <p className="price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="big-text-section">
        <h2>WEAR YOUR STORY</h2>
      </section>

      <section className="review-section">
        <h2 className="section-title text-center">What Our Customers Say</h2>
        <div className="marquee-container">
          <div className="marquee-track">
            {[1, 2].map((group) => (
              <React.Fragment key={group}>
                {reviews.map((review) => (
                  <div className="review-card" key={`${group}-${review.name}`}>
                    <div className="review-content">
                      <div className="review-header">
                        <img src={review.avatar} alt={review.name} className="customer-pfp" />
                        <div className="review-meta">
                          <h4>{review.name}</h4>
                          <div className="stars">{review.rating}</div>
                        </div>
                      </div>
                      <p className="review-text">"{review.text}"</p>
                    </div>
                    <img src={review.item} alt={review.itemAlt} className="bought-item-img" />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
