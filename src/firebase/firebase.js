

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);

  const messaging = getMessaging(firebaseApp);


export const requestForToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {

    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_APP_VAPID_KEY
    });
    if (currentToken) {
      console.log('Current token:', currentToken);
      return currentToken;
    }
    console.log('No registration token available');
  } else {
    throw new Error('Notification permission denied');
  }
  } catch (err) {
    console.log('An error occurred while retrieving token:', err);
  }
};



export const onForegroundMessage = (callback) => {
  return onMessage(messaging, (payload) => {
    callback(payload);
  });
};

export { messaging, firebaseApp };


