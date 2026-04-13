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
      <div className="top-bar">
        <p>
          {accountData.loggedIn
            ? `Member access active for ${accountData.profile.firstName || 'Eshine User'}`
            : 'Eshine'}
        </p>
      </div>

      <header>
        <div className="container header-content">
          <Link to="/" className="logo-link">
            <span className="logo-text">ESHINE</span>
          </Link>

          <nav className="nav-center">
            <Link to="/new-arrival">New</Link>
            <Link to="/men">Men</Link>
            <Link to="/women">Women</Link>
            <Link to="/collections">Collections</Link>
          </nav>

          <div className="nav-icons">
            <Link to="/account" className="nav-icon-link nav-account-link" title="Account">
              {accountData.loggedIn ? (
                <span className="nav-account-status">{accountData.profile.firstName || 'Member'}</span>
              ) : null}
              <User size={22} strokeWidth={1.8} />
            </Link>

            <Link to="/cart" className="nav-icon-link" title="Cart">
              <ShoppingBag size={22} strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
