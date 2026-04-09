import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

// Pages
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import MenPage from './pages/MenPage'
import WomenPage from './pages/WomenPage'
import CollectionsPage from './pages/CollectionsPage'
import NewArrivalsPage from './pages/NewArrivalsPage'
import CartPage from './pages/CartPage'
import AccountPage from './pages/AccountPage'

// Main CSS
import './index.css'

// Context
import { TryOnProvider } from './context/TryOnContext'

function App() {
  return (
    <TryOnProvider>
      <BrowserRouter>
        {/* Global Header */}
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/men" element={<MenPage />} />
            <Route path="/women" element={<WomenPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/new-arrival" element={<NewArrivalsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/account" element={<AccountPage />} />
            
            <Route path="*" element={
              <div className="container" style={{ textAlign: 'center', padding: '100px 0', minHeight: '50vh' }}>
                <h2>Page under construction.</h2>
                <p>Explore the <a href="/" style={{ color: '#000' }}>Home Page</a> instead.</p>
              </div>
            } />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </BrowserRouter>
    </TryOnProvider>
  )
}

export default App
