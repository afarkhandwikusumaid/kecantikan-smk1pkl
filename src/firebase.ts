import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBvz8NtyHwp4KSKuUZ8vXhBXLcED-rVG8s",
  authDomain: "web-admin-smk1pkl.firebaseapp.com",
  projectId: "web-admin-smk1pkl",
  storageBucket: "web-admin-smk1pkl.firebasestorage.app",
  messagingSenderId: "275478734942",
  appId: "1:275478734942:web:758d13e68b3700e16e2ccf",
  measurementId: "G-T5PWMJ75Y7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
