import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const sanitize = (v) => {
  if (typeof v !== 'string') return v
  // Trim spaces and strip surrounding quotes if pasted with quotes
  return v.trim().replace(/^['"]|['"]$/g, '')
}

let rawConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

console.log('--- Firebase Config Debug ---');
Object.keys(rawConfig).forEach(k => {
  const v = rawConfig[k];
  console.log(`${k}: ${v ? (v.length > 5 ? v.substring(0, 5) + '...' : 'PRESENT') : 'MISSING/UNDEFINED'}`);
});

// Sanitize all string values
const firebaseConfig = Object.fromEntries(
  Object.entries(rawConfig).map(([k, v]) => [k, sanitize(v)])
)

// Fix common Storage bucket typo if present
if (
  firebaseConfig.storageBucket &&
  typeof firebaseConfig.storageBucket === 'string' &&
  /firebasestorage\.app$/i.test(firebaseConfig.storageBucket) &&
  firebaseConfig.projectId
)
  firebaseConfig.storageBucket = `${firebaseConfig.projectId}.appspot.com`

function validateConfig(cfg) {
  const missing = []
  for (const key of [
    'apiKey',
    'authDomain',
    'projectId',
    'appId',
  ]) {
    if (!cfg[key]) missing.push(key)
  }
  if (missing.length) {
    const detail = missing.join(', ')
    console.error(
      `Firebase config missing: ${detail}. Check your frontend/.env values.`
    )
    return false
  }
  // Basic API key format sanity check
  if (typeof cfg.apiKey === 'string' && !/^[A-Za-z0-9_\-]{20,}$/.test(cfg.apiKey)) {
    console.error('Firebase API key format looks invalid. Verify .env value.')
  }
  return true
}

let auth = null
let app = null

try {
  if (validateConfig(firebaseConfig)) {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
  }
} catch (error) {
  console.error('Firebase initialization error:', error)
  if (
    error &&
    typeof error.message === 'string' &&
    error.message.toLowerCase().includes('invalid-api-key')
  ) {
    console.error(
      'The Firebase API key is invalid for this project. In Firebase Console → Project settings → General, copy the Web API Key and update VITE_FIREBASE_API_KEY in frontend/.env.'
    )
  }
}

export { auth, app }
