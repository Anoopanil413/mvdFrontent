// src/contexts/NotificationContext.jsx
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { onForegroundMessage, requestForToken } from '../firebase/firebase';
import { sendFCMToken } from '../api/userApi';
import { useAppContext } from './AppContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [firebaseToken, setFirebaseToken] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [unsubscribeFunction, setUnsubscribeFunction] = useState(null);

  const usertoken = localStorage.getItem("token");
  const {state} = useAppContext();
  const user =  state.user;

  // Initialize Firebase messaging and request permission
  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        // Request permission and get token
        if (!usertoken) {
          // If no user token, unregister service worker
          await unregisterServiceWorker();
          return;
        }
        
        const token = await requestForToken();
        
        if (token) {
          setFirebaseToken(token);
          setPermissionGranted(true);

          if(usertoken)await sendFCMToken({token});
        }
      } catch (error) {
        console.error('Error initializing notifications:', error);
      }
    };

    initializeNotifications();
  }, [usertoken,user]);

  // Listen for foreground messages
  useEffect(() => {
    if (!permissionGranted || !usertoken) return;
    
    const unsubscribe = onForegroundMessage((payload) => {
      
      // Add notification to state
      setNotifications((prev) => [
        {
          id: Date.now().toString(),
          title: payload.notification?.title || 'New Notification',
          body: payload.notification?.body || '',
          data: payload.data,
          timestamp: new Date(),
          read: false,
        },
        ...prev,
      ]);
      
      // Show browser notification
      if (Notification.permission === 'granted') {
        new Notification(payload.notification?.title || 'New Notification', {
          body: payload.notification?.body || '',
        });
      }
    });
    setUnsubscribeFunction(() => unsubscribe);

     
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [permissionGranted,usertoken,user]);

  const unregisterServiceWorker = async () => {
    try {
      // Clean up subscription
      if (unsubscribeFunction) {
        unsubscribeFunction();
        setUnsubscribeFunction(null);
      }
      
      // Reset states
      setFirebaseToken(null);
      setPermissionGranted(false);
      setNotifications([]);
      
      // Unregister the service worker
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        
        for (const registration of registrations) {
          // You might want to be more specific about which service worker to unregister
          // by checking the script URL if you have multiple service workers
          await registration.unregister();
          console.log('Service worker unregistered successfully');
        }
      }
      
      localStorage.removeItem('fcm_token');
      localStorage.removeItem('token');
      
      return true;
    } catch (error) {
      console.error('Error unregistering service worker:', error);
      return false;
    }
  };

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // Clear notifications
  const clearNotifications = () => {
    setNotifications([]);
  };
  const handleLogout = async () => {
    await unregisterServiceWorker();
    
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        hasUnread: notifications.some((n) => !n.read),
        markAsRead,
        clearNotifications,
        permissionGranted,
        firebaseToken,
        handleLogout,
        unregisterServiceWorker
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);