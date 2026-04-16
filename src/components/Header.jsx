import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { User, ShoppingBag } from 'lucide-react'
import { AUTH_CHANGE_EVENT, readAccountData } from '../utils/accountStorage'

const Header = () => {
  const [accountData, setAccountData] = useState(readAccountData())

  useEffect(() => {
    const syncAccount = () => {
      setAccountData(readAccountData())
    }

    window.addEventListener('storage', syncAccount)
    window.addEventListener(AUTH_CHANGE_EVENT, syncAccount)

    return () => {
      window.removeEventListener('storage', syncAccount)
      window.removeEventListener(AUTH_CHANGE_EVENT, syncAccount)
    }
  }, [])

  return (
    <>
      <header className="global-editorial-header">
        <div className="editorial-topbar" style={{ backgroundColor: '#fff', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '24px', position: 'sticky', top: 0, zIndex: 100 }}>
          <Link to="/" className="editorial-brand-link">E-SHINE</Link>

          <nav className="editorial-nav">
            <Link to="/new-arrival">New</Link>
            <Link to="/men">Men</Link>
            <Link to="/women">Women</Link>
            <Link to="/collections">Collections</Link>
          </nav>

          <div className="editorial-actions">
            <Link to="/account" className="editorial-top-link" style={{ marginRight: '15px' }}>
              {accountData.loggedIn ? accountData.profile.firstName?.toUpperCase() || 'MEMBER' : 'AI STUDIO'} <span>→</span>
            </Link>
            <Link to="/account" className="nav-icon-link editorial-icon-link" title="Account">
              <User size={22} strokeWidth={1.8} />
            </Link>
            <Link to="/cart" className="nav-icon-link editorial-icon-link" title="Cart">
              <ShoppingBag size={22} strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
