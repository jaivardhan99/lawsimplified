import React from 'react';

const TestEnv = () => {
  console.log('Environment variables:');
  console.log('VITE_FIREBASE_API_KEY:', import.meta.env.VITE_FIREBASE_API_KEY);
  console.log('VITE_FIREBASE_AUTH_DOMAIN:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
  console.log('VITE_FIREBASE_PROJECT_ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);

  return (
    <div className="p-4">
      <h1>Environment Variables Test</h1>
      <p>VITE_FIREBASE_API_KEY: {import.meta.env.VITE_FIREBASE_API_KEY}</p>
      <p>VITE_FIREBASE_AUTH_DOMAIN: {import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}</p>
      <p>VITE_FIREBASE_PROJECT_ID: {import.meta.env.VITE_FIREBASE_PROJECT_ID}</p>
    </div>
  );
};

export default TestEnv;