import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Warn in console if critical env vars are missing (common cause of white screen on Vercel)
const requiredKeys = ['apiKey', 'authDomain', 'databaseURL', 'projectId'];
requiredKeys.forEach((key) => {
  if (!firebaseConfig[key]) {
    console.error(
      `⚠️ Missing Firebase config: ${key}. ` +
      `Make sure VITE_FIREBASE_* environment variables are set in your Vercel project settings.`
    );
  }
});

let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getDatabase(app);
} catch (err) {
  console.error('Firebase initialization failed:', err);
}

export { app, db };
