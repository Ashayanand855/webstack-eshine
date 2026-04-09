import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AccountPage.css'
import StylistChatbot from '../components/StylistChatbot'
import {
  AUTH_CHANGE_EVENT,
  clearAccountData,
  readAccountData,
  saveAccountData,
} from '../utils/accountStorage'

const accountBenefits = [
  'Track your orders and delivery status',
  'Save your wishlist and go through checkout faster',
  'Get early member access to new drops and offers',
]

const clothingChoices = ['Minimal', 'Streetwear', 'Formal', 'Smart Casual', 'Ethnic', 'Athleisure']

const emptyAddress = {
  label: 'Home',
  fullName: '',
  line1: '',
  city: '',
  state: '',
  pincode: '',
  phone: '',
}

const AccountPage = () => {
  const navigate = useNavigate()
  const [accountData, setAccountData] = useState(readAccountData())
  const [mode, setMode] = useState(readAccountData().loggedIn ? 'dashboard' : 'login')
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [signupErrors, setSignupErrors] = useState({})
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    updates: false,
  })
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  })
  const [profileForm, setProfileForm] = useState(readAccountData().profile)
  const [addressDraft, setAddressDraft] = useState(emptyAddress)
  const [editingAddressId, setEditingAddressId] = useState(null)
  const [dashboardNotice, setDashboardNotice] = useState('')

  useEffect(() => {
    const syncAccount = () => {
      const nextData = readAccountData()
      setAccountData(nextData)
      setProfileForm(nextData.profile)
      if (nextData.loggedIn) {
        setMode('dashboard')
      }
    }

    window.addEventListener('storage', syncAccount)
    window.addEventListener(AUTH_CHANGE_EVENT, syncAccount)

    return () => {
      window.removeEventListener('storage', syncAccount)
      window.removeEventListener(AUTH_CHANGE_EVENT, syncAccount)
    }
  }, [])

  const persistAccount = (updater, notice) => {
    const nextData = typeof updater === 'function' ? updater(readAccountData()) : updater
    saveAccountData(nextData)
    setAccountData(nextData)
    setProfileForm(nextData.profile)
    if (notice) {
      setDashboardNotice(notice)
    }
  }

  const handleModeChange = (nextMode) => {
    setMode(nextMode)
    setSignupErrors({})
    setLoginError('')
    setDashboardNotice('')
  }

  const handleSignupChange = (event) => {
    const { id, type, checked, value } = event.target
    const nextValue = type === 'checkbox' ? checked : value

    setSignupForm((current) => ({
      ...current,
      [id]: nextValue,
    }))

    setSignupErrors((current) => {
      const nextErrors = { ...current }

      if (id === 'password') {
        delete nextErrors.password
        if (signupForm.confirmPassword && nextValue !== signupForm.confirmPassword) {
          nextErrors.confirmPassword = 'confirmation password wrong'
        } else {
          delete nextErrors.confirmPassword
        }
      }

      if (id === 'confirmPassword') {
        delete nextErrors.confirmPassword
      }

      return nextErrors
    })
  }

  const handleSignupSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}

    if (signupForm.password.length < 8) {
      nextErrors.password = 'too small password'
    }

    if (signupForm.confirmPassword !== signupForm.password) {
      nextErrors.confirmPassword = 'confirmation password wrong'
    }

    setSignupErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsCreatingAccount(true)

    window.setTimeout(() => {
      const nextData = {
        ...accountData,
        loggedIn: true,
        profile: {
          firstName: signupForm.firstName || 'Eshine',
          lastName: signupForm.lastName || 'Member',
          email: signupForm.email,
          password: signupForm.password,
        },
        preferences: {
          ...accountData.preferences,
          newsletter: signupForm.updates,
        },
      }

      persistAccount(nextData)
      setIsCreatingAccount(false)
      navigate('/', { replace: true })
    }, 1400)
  }

  const handleLoginChange = (event) => {
    const { id, value } = event.target
    setLoginForm((current) => ({
      ...current,
      [id]: value,
    }))

    if (loginError) {
      setLoginError('')
    }
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault()

    if (!loginForm.email || !loginForm.password) {
      setLoginError('enter email and password')
      return
    }

    setIsLoggingIn(true)

    window.setTimeout(() => {
      const stored = readAccountData()
      const fallbackName = loginForm.email.split('@')[0] || 'Member'
      const nextData = {
        ...stored,
        loggedIn: true,
        profile: {
          ...stored.profile,
          firstName: stored.profile.firstName || fallbackName,
          lastName: stored.profile.lastName || '',
          email: loginForm.email,
          password: loginForm.password,
        },
      }

      persistAccount(nextData)
      setIsLoggingIn(false)
      navigate('/', { replace: true })
    }, 1000)
  }

  const handleProfileChange = (event) => {
    const { id, value } = event.target
    setProfileForm((current) => ({
      ...current,
      [id]: value,
    }))
  }

  const handleProfileSave = (event) => {
    event.preventDefault()

    if (profileForm.password && profileForm.password.length < 8) {
      setDashboardNotice('Password update skipped because it is too small password.')
      return
    }

    persistAccount((current) => ({
      ...current,
      profile: {
        ...current.profile,
        ...profileForm,
      },
    }), 'Profile updated successfully.')
  }

  const handleAddressChange = (event) => {
    const { id, value } = event.target
    setAddressDraft((current) => ({
      ...current,
      [id]: value,
    }))
  }

  const resetAddressDraft = () => {
    setAddressDraft(emptyAddress)
    setEditingAddressId(null)
  }

  const handleAddressSubmit = (event) => {
    event.preventDefault()

    persistAccount((current) => {
      const addresses = editingAddressId
        ? current.addresses.map((address) =>
            address.id === editingAddressId ? { ...addressDraft, id: editingAddressId } : address
          )
        : [...current.addresses, { ...addressDraft, id: Date.now() }]

      return {
        ...current,
        addresses: addresses.slice(0, 3),
      }
    }, editingAddressId ? 'Address updated.' : 'Address saved.')

    resetAddressDraft()
  }

  const handleAddressEdit = (address) => {
    setAddressDraft({
      label: address.label,
      fullName: address.fullName,
      line1: address.line1,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      phone: address.phone,
    })
    setEditingAddressId(address.id)
  }

  const handleAddressDelete = (addressId) => {
    persistAccount((current) => ({
      ...current,
      addresses: current.addresses.filter((address) => address.id !== addressId),
    }), 'Address removed.')

    if (editingAddressId === addressId) {
      resetAddressDraft()
    }
  }

  const handleStyleChoiceToggle = (choice) => {
    persistAccount((current) => {
      const categories = current.styleProfile.categories.includes(choice)
        ? current.styleProfile.categories.filter((item) => item !== choice)
        : [...current.styleProfile.categories, choice]

      return {
        ...current,
        styleProfile: {
          ...current.styleProfile,
          categories,
        },
      }
    }, 'Style choices updated.')
  }

  const handleStyleProfileChange = (event) => {
    const { id, value } = event.target
    persistAccount((current) => ({
      ...current,
      styleProfile: {
        ...current.styleProfile,
        [id]: value,
      },
    }), 'Style profile updated.')
  }

  const handlePreferenceChange = (event) => {
    const { id, type, checked, value } = event.target
    const nextValue = type === 'checkbox' ? checked : value

    persistAccount((current) => ({
      ...current,
      preferences: {
        ...current.preferences,
        [id]: nextValue,
      },
    }), 'Preferences saved.')
  }

  const handleLogout = () => {
    clearAccountData()
    setAccountData(readAccountData())
    setProfileForm(readAccountData().profile)
    setMode('login')
    setLoginForm({ email: '', password: '' })
    setSignupForm({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      updates: false,
    })
    setDashboardNotice('')
  }

  const fullName = [accountData.profile.firstName, accountData.profile.lastName].filter(Boolean).join(' ')

  if (mode === 'dashboard' && accountData.loggedIn) {
    return (
      <section className="account-page">
        <div className="container account-dashboard">
          <div className="account-dashboard-hero">
            <div>
              <p className="account-kicker">Member Dashboard</p>
              <h1>{fullName || 'Eshine Member'}</h1>
              <p className="account-dashboard-copy">
                Manage your saved addresses, style profile, preferences, and account details from one place.
              </p>
            </div>

            <div className="account-dashboard-meta">
              <span>{accountData.profile.email}</span>
              <button type="button" className="btn-outline account-logout-btn" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>

          {dashboardNotice ? <p className="account-success">{dashboardNotice}</p> : null}

          <div className="account-dashboard-grid">
            <section className="account-panel">
              <div className="account-panel-header">
                <h2>Saved Addresses</h2>
                <p>You can save up to 3 addresses.</p>
              </div>

              <div className="account-address-list">
                {accountData.addresses.length ? (
                  accountData.addresses.map((address) => (
                    <article key={address.id} className="account-address-card">
                      <div>
                        <span className="account-address-label">{address.label}</span>
                        <h3>{address.fullName}</h3>
                        <p>{address.line1}</p>
                        <p>{address.city}, {address.state} {address.pincode}</p>
                        <p>{address.phone}</p>
                      </div>
                      <div className="account-address-actions">
                        <button type="button" onClick={() => handleAddressEdit(address)}>Edit</button>
                        <button type="button" onClick={() => handleAddressDelete(address.id)}>Delete</button>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="account-empty-state">No address saved yet.</p>
                )}
              </div>

              <form className="account-form account-subform" onSubmit={handleAddressSubmit}>
                <div className="account-form-grid">
                  <div>
                    <label htmlFor="label">Address label</label>
                    <input id="label" type="text" value={addressDraft.label} onChange={handleAddressChange} />
                  </div>
                  <div>
                    <label htmlFor="fullName">Full name</label>
                    <input id="fullName" type="text" value={addressDraft.fullName} onChange={handleAddressChange} />
                  </div>
                </div>

                <label htmlFor="line1">Address line</label>
                <input id="line1" type="text" value={addressDraft.line1} onChange={handleAddressChange} />

                <div className="account-form-grid">
                  <div>
                    <label htmlFor="city">City</label>
                    <input id="city" type="text" value={addressDraft.city} onChange={handleAddressChange} />
                  </div>
                  <div>
                    <label htmlFor="state">State</label>
                    <input id="state" type="text" value={addressDraft.state} onChange={handleAddressChange} />
                  </div>
                </div>

                <div className="account-form-grid">
                  <div>
                    <label htmlFor="pincode">Pincode</label>
                    <input id="pincode" type="text" value={addressDraft.pincode} onChange={handleAddressChange} />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" type="text" value={addressDraft.phone} onChange={handleAddressChange} />
                  </div>
                </div>

                <div className="account-inline-actions">
                  <button
                    type="submit"
                    className="btn-black"
                    disabled={!editingAddressId && accountData.addresses.length >= 3}
                  >
                    {editingAddressId ? 'Update Address' : 'Save Address'}
                  </button>
                  {editingAddressId ? (
                    <button type="button" className="btn-outline" onClick={resetAddressDraft}>
                      Cancel
                    </button>
                  ) : null}
                </div>
              </form>
            </section>

            <section className="account-panel">
              <div className="account-panel-header">
                <h2>Edit Profile</h2>
                <p>Update your name, email, or password.</p>
              </div>

              <form className="account-form account-subform" onSubmit={handleProfileSave}>
                <div className="account-form-grid">
                  <div>
                    <label htmlFor="firstName">First name</label>
                    <input id="firstName" type="text" value={profileForm.firstName} onChange={handleProfileChange} />
                  </div>
                  <div>
                    <label htmlFor="lastName">Last name</label>
                    <input id="lastName" type="text" value={profileForm.lastName} onChange={handleProfileChange} />
                  </div>
                </div>

                <label htmlFor="email">Email address</label>
                <input id="email" type="email" value={profileForm.email} onChange={handleProfileChange} />

                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={profileForm.password} onChange={handleProfileChange} />

                <button type="submit" className="btn-black">Save Profile</button>
              </form>
            </section>

            <section className="account-panel">
              <div className="account-panel-header">
                <h2>Clothing Choices</h2>
                <p>Help the AI stylist understand your personal taste better.</p>
              </div>

              <div className="account-choice-grid">
                {clothingChoices.map((choice) => (
                  <button
                    key={choice}
                    type="button"
                    className={`account-choice-chip ${
                      accountData.styleProfile.categories.includes(choice) ? 'active' : ''
                    }`}
                    onClick={() => handleStyleChoiceToggle(choice)}
                  >
                    {choice}
                  </button>
                ))}
              </div>

              <form className="account-form account-subform">
                <label htmlFor="fitPreference">Preferred fit</label>
                <select id="fitPreference" value={accountData.styleProfile.fitPreference} onChange={handleStyleProfileChange}>
                  <option value="Tailored">Tailored</option>
                  <option value="Relaxed">Relaxed</option>
                  <option value="Oversized">Oversized</option>
                  <option value="Regular">Regular</option>
                </select>

                <label htmlFor="colorMood">Color mood</label>
                <select id="colorMood" value={accountData.styleProfile.colorMood} onChange={handleStyleProfileChange}>
                  <option value="Neutrals">Neutrals</option>
                  <option value="Monochrome">Monochrome</option>
                  <option value="Warm Tones">Warm Tones</option>
                  <option value="Bold Colors">Bold Colors</option>
                </select>

                <label htmlFor="notes">Style notes for AI</label>
                <textarea
                  id="notes"
                  rows="4"
                  value={accountData.styleProfile.notes}
                  onChange={handleStyleProfileChange}
                  placeholder="Example: prefer clean silhouettes, no loud prints, and sharper evening looks."
                />
              </form>
            </section>

            <section className="account-panel">
              <div className="account-panel-header">
                <h2>Extra Preferences</h2>
                <p>Useful account features that improve recommendations and updates.</p>
              </div>

              <form className="account-form account-subform">
                <label htmlFor="preferredSize">Preferred size</label>
                <select id="preferredSize" value={accountData.preferences.preferredSize} onChange={handlePreferenceChange}>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>

                <label htmlFor="budget">Shopping budget</label>
                <select id="budget" value={accountData.preferences.budget} onChange={handlePreferenceChange}>
                  <option value="Entry">Entry</option>
                  <option value="Mid Range">Mid Range</option>
                  <option value="Premium">Premium</option>
                  <option value="Luxury">Luxury</option>
                </select>

                <label className="checkbox-row" htmlFor="newsletter">
                  <input
                    id="newsletter"
                    type="checkbox"
                    checked={accountData.preferences.newsletter}
                    onChange={handlePreferenceChange}
                  />
                  <span>Email me drop alerts and curated offers</span>
                </label>

                <label className="checkbox-row" htmlFor="smsUpdates">
                  <input
                    id="smsUpdates"
                    type="checkbox"
                    checked={accountData.preferences.smsUpdates}
                    onChange={handlePreferenceChange}
                  />
                  <span>Send SMS for shipping and priority sale updates</span>
                </label>
              </form>
            </section>

            <StylistChatbot accountData={accountData} />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="account-page">
      <div className="container account-shell">
        <div className="account-card">
          <p className="account-kicker">Account</p>

          <div className="account-card-header">
            <h1>{mode === 'login' ? 'Welcome back' : 'Become a member'}</h1>
            <p>
              {mode === 'login'
                ? 'If you already have an account, log in directly below.'
                : 'Create your account to save looks, manage orders, and unlock member perks.'}
            </p>
          </div>

          <div className="account-toggle" role="tablist" aria-label="Account access">
            <button
              type="button"
              className={`account-toggle-btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => handleModeChange('login')}
            >
              I Have an Account
            </button>
            <button
              type="button"
              className={`account-toggle-btn ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => handleModeChange('signup')}
            >
              Be a Member
            </button>
          </div>

          {mode === 'login' ? (
            <form className="account-form" onSubmit={handleLoginSubmit}>
              <label htmlFor="email">Email address</label>
              <input id="email" type="email" placeholder="you@example.com" value={loginForm.email} onChange={handleLoginChange} />

              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={loginForm.password}
                onChange={handleLoginChange}
              />

              {loginError ? <p className="account-error">{loginError}</p> : null}

              <div className="account-form-row">
                <label className="checkbox-row" htmlFor="remember-me">
                  <input id="remember-me" type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="/" onClick={(event) => event.preventDefault()}>
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="btn-black" disabled={isLoggingIn}>
                {isLoggingIn ? (
                  <>
                    <span className="account-spinner" aria-hidden="true" />
                    Logging In...
                  </>
                ) : (
                  'Log In'
                )}
              </button>
            </form>
          ) : (
            <>
              <div className="account-member-note">
                <span className="account-member-label">Member Benefits</span>
                <ul className="account-benefits-list">
                  {accountBenefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <form className="account-form" onSubmit={handleSignupSubmit} noValidate>
                <div className="account-form-grid">
                  <div>
                    <label htmlFor="firstName">First name</label>
                    <input id="firstName" type="text" placeholder="First-Name" value={signupForm.firstName} onChange={handleSignupChange} />
                  </div>

                  <div>
                    <label htmlFor="lastName">Last name</label>
                    <input id="lastName" type="text" placeholder="Last-Name" value={signupForm.lastName} onChange={handleSignupChange} />
                  </div>
                </div>

                <label htmlFor="email">Email address</label>
                <input id="email" type="email" placeholder="you@example.com" value={signupForm.email} onChange={handleSignupChange} />

                <label htmlFor="password">Create password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={signupForm.password}
                  onChange={handleSignupChange}
                  className={signupErrors.password ? 'input-error' : ''}
                />
                {signupErrors.password ? <p className="account-error">{signupErrors.password}</p> : null}

                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  value={signupForm.confirmPassword}
                  onChange={handleSignupChange}
                  className={signupErrors.confirmPassword ? 'input-error' : ''}
                />
                {signupErrors.confirmPassword ? <p className="account-error">{signupErrors.confirmPassword}</p> : null}

                <label className="checkbox-row" htmlFor="updates">
                  <input id="updates" type="checkbox" checked={signupForm.updates} onChange={handleSignupChange} />
                  <span>Send me launch updates and member-only offers</span>
                </label>

                <button type="submit" className="btn-black" disabled={isCreatingAccount}>
                  {isCreatingAccount ? (
                    <>
                      <span className="account-spinner" aria-hidden="true" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default AccountPage
