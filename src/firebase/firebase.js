

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
let messaging;
if (typeof window !== 'undefined'){
  messaging = getMessaging(firebaseApp);
}
export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: 'YOUR_VAPID_KEY'
    });
    if (currentToken) {
      console.log('Current token:', currentToken);
      return currentToken;
    }
    console.log('No registration token available');
  } catch (err) {
    console.log('An error occurred while retrieving token:', err);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});

export { messaging, firebaseApp };


