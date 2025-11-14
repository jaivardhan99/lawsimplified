import React, { useEffect, useState } from 'react';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const TestFirebase = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('TestFirebase mounted');
    console.log('Auth object:', auth);
    
    // Log environment variables
    console.log('Environment variables:');
    console.log('VITE_FIREBASE_API_KEY:', import.meta.env.VITE_FIREBASE_API_KEY);
    console.log('VITE_FIREBASE_AUTH_DOMAIN:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
    console.log('VITE_FIREBASE_PROJECT_ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);
    
    if (!auth) {
      console.error('Firebase auth is not initialized');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed in TestFirebase, user:', user);
      setUser(user);
      setLoading(false);
    }, (error) => {
      console.error('Auth state error in TestFirebase:', error);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="p-4">
      <h1>Firebase Test</h1>
      <p>Loading: {loading ? 'Yes' : 'No'}</p>
      <p>User: {user ? user.email : 'None'}</p>
      <p>Auth object: {auth ? 'Available' : 'Not available'}</p>
      <div>
        <h2>Environment Variables:</h2>
        <p>VITE_FIREBASE_API_KEY: {import.meta.env.VITE_FIREBASE_API_KEY ? 'Set' : 'Not set'}</p>
        <p>VITE_FIREBASE_AUTH_DOMAIN: {import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? 'Set' : 'Not set'}</p>
        <p>VITE_FIREBASE_PROJECT_ID: {import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'Set' : 'Not set'}</p>
      </div>
    </div>
  );
};

export default TestFirebase;