// src/hooks/useNotifications.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { messaging,getToken } from '../firebase/firebase';
const { VITE_APP_VAPID_KEY } = import.meta.env;


const useNotifications = (userId) => {
  const [token, setToken] = useState(null);
  const [notification, setNotification] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Request permission and get token
  const requestPermissionAndToken = async () => {
    setLoading(true);
    
    try {
      // Check if the browser supports service workers and notifications
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        throw new Error('Browser does not support push notifications');
      }
      
      // Request permission
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);
      
      if (permission !== 'granted') {
        throw new Error('Notification permission not granted');
      }
      
      // Get token
      const currentToken = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY 
      });
      
      if (!currentToken) {
        throw new Error('Failed to generate token');
      }
      
      setToken(currentToken);
        if (userId) {
        await saveTokenToServer(currentToken, userId);
      }
      
      return currentToken;
    } catch (err) {
      setError(err.message);
      console.error('An error occurred while setting up push notifications:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  // Save token to server
  const saveTokenToServer = async (fcmToken, userId) => {
    try {
      await axios.post('/api/notifications/token', {
        userId,
        token: fcmToken
      });
    } catch (err) {
      console.error('Error saving token to server:', err);
      setError('Failed to save notification token to server');
    }
  };
  
  // Handle incoming foreground messages
  // useEffect(() => {
  //   const unsubscribe = onMessage(messaging, (payload) => {
  //     console.log('Received foreground message:', payload);
  //     setNotification(payload);
      
  //     // Optionally show a notification even when in foreground
  //     if (payload.data && payload.data.forceShow === 'true') {
  //       new Notification(payload.notification.title, {
  //         body: payload.notification.body,
  //         icon: '/logo192.png'
  //       });
  //     }
  //   });
    
  //   return () => unsubscribe();
  // }, []);
  
  // Check for existing token on mount or when userId changes
  useEffect(() => {
    if (!userId) return;
    
    const checkExistingToken = async () => {
      try {
        // Check if permission is already granted
        const permission = Notification.permission;
        setPermissionStatus(permission);
        
        if (permission === 'granted') {
          // Check for existing token
          const response = await checkUserNotificationToken();    
          
          if (response.data && response.data.token) {
            // Validate the token
            try {
              const currentToken = await getToken(messaging, {
                vapidKey: VITE_APP_VAPID_KEY,
                serviceWorkerRegistration: await navigator.serviceWorker.getRegistration()
              });
              
              if (currentToken) {
                setToken(currentToken);
                
                // Update token if it has changed
                if (currentToken !== response.data.token) {
                  await saveTokenToServer(currentToken, userId);
                }
              } else {
                // Token is invalid, request a new one
                await requestPermissionAndToken();
              }
            } catch (err) {
              console.error('Error validating existing token:', err);
              await requestPermissionAndToken();
            }
          } else {
            // No token in database, request a new one
            await requestPermissionAndToken();
          }
        }
      } catch (err) {
        console.error('Error checking existing token:', err);
        setError('Failed to check notification setup');
      } finally {
        setLoading(false);
      }
    };
    
    checkExistingToken();
  }, [userId]);
  
  return {
    token,
    notification,
    permissionStatus,
    loading,
    error,
    requestPermissionAndToken
  };
};

export default useNotifications;