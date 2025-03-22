// src/contexts/NotificationContext.jsx
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { onForegroundMessage, requestForToken } from '../firebase/firebase';
import { sendFCMToken } from '../api/userApi';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [firebaseToken, setFirebaseToken] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const usertoken = localStorage.getItem("token");

  // Initialize Firebase messaging and request permission
  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        // Request permission and get token
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
  }, [usertoken]);

  // Listen for foreground messages
  useEffect(() => {
    if (!permissionGranted) return;
    
    const unsubscribe = onForegroundMessage((payload) => {
      console.log('Received foreground message:', payload);
      
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
    
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [permissionGranted]);

  // Send token to backend
  const sendTokenToServer = async (token) => {
    try {
      const response = await axios.post('/api/notifications/token', { token }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming this is where you store the auth token
        }
      });
      
      console.log('Token saved to server:', response.data);
      return true;
    } catch (error) {
      console.error('Error saving token to server:', error);
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

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        hasUnread: notifications.some((n) => !n.read),
        markAsRead,
        clearNotifications,
        permissionGranted,
        firebaseToken,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);