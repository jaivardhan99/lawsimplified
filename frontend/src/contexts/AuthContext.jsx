import { createContext, useContext, useState, useEffect } from 'react'
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import { auth } from '../config/firebase'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if auth is properly initialized
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    }, (error) => {
      console.error('Auth state error:', error)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signInWithGoogle = async () => {
    if (!auth) {
      throw new Error('Firebase is not configured. Please set up Firebase credentials.')
    }
    
    // Check if Google Auth is properly configured
    if (!import.meta.env.VITE_FIREBASE_API_KEY) {
      throw new Error('Firebase API key is missing. Please check your .env file.')
    }
    
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      return result.user
    } catch (error) {
      console.error('Error signing in with Google:', error)
      // Provide more specific error messages
      if (error.code === 'auth/configuration-not-found') {
        throw new Error('Google Authentication is not enabled for this Firebase project. Please enable it in the Firebase Console.')
      } else if (error.code === 'auth/popup-blocked') {
        throw new Error('Sign-in popup was blocked by your browser. Please allow popups for this site.')
      } else if (error.code === 'auth/cancelled-popup-request') {
        // This is not a real error, user cancelled the popup
        return;
      }
      throw error
    }
  }

  const signUpWithEmail = async (email, password, displayName = null) => {
    if (!auth) {
      throw new Error('Firebase is not configured. Please set up Firebase credentials.')
    }
    
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      
      // Update display name if provided
      if (displayName) {
        await updateProfile(result.user, { displayName })
      }
      
      return result.user
    } catch (error) {
      console.error('Error signing up with email:', error)
      // Provide more specific error messages
      if (error.code === 'auth/configuration-not-found') {
        throw new Error('Email/Password Authentication is not enabled for this Firebase project. Please enable it in the Firebase Console.')
      }
      throw error
    }
  }

  const signInWithEmail = async (email, password) => {
    if (!auth) {
      throw new Error('Firebase is not configured. Please set up Firebase credentials.')
    }
    
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result.user
    } catch (error) {
      console.error('Error signing in with email:', error)
      // Provide more specific error messages
      if (error.code === 'auth/configuration-not-found') {
        throw new Error('Email/Password Authentication is not enabled for this Firebase project. Please enable it in the Firebase Console.')
      } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
        throw new Error('Account not found. Please register before signing in.')
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Incorrect password. Please try again or reset it.')
      }
      throw error
    }
  }

  const signOut = async () => {
    if (!auth) {
      return
    }
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const value = {
    user,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    signOut,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
