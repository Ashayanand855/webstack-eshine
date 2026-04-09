const STORAGE_KEY = 'eshine-account'
const AUTH_EVENT = 'eshine-auth-change'

export const defaultAccountData = {
  loggedIn: false,
  profile: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  addresses: [],
  styleProfile: {
    categories: ['Minimal'],
    fitPreference: 'Tailored',
    colorMood: 'Neutrals',
    notes: '',
  },
  preferences: {
    newsletter: true,
    smsUpdates: false,
    preferredSize: 'M',
    budget: 'Mid Range',
  },
}

export const readAccountData = () => {
  if (typeof window === 'undefined') {
    return defaultAccountData
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    return defaultAccountData
  }

  try {
    const parsed = JSON.parse(raw)
    return {
      ...defaultAccountData,
      ...parsed,
      profile: {
        ...defaultAccountData.profile,
        ...parsed.profile,
      },
      addresses: Array.isArray(parsed.addresses) ? parsed.addresses : defaultAccountData.addresses,
      styleProfile: {
        ...defaultAccountData.styleProfile,
        ...parsed.styleProfile,
      },
      preferences: {
        ...defaultAccountData.preferences,
        ...parsed.preferences,
      },
    }
  } catch {
    return defaultAccountData
  }
}

export const saveAccountData = (data) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  window.dispatchEvent(new Event(AUTH_EVENT))
}

export const clearAccountData = () => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new Event(AUTH_EVENT))
}

export const AUTH_CHANGE_EVENT = AUTH_EVENT
