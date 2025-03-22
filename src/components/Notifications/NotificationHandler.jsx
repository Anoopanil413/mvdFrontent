// src/components/NotificationHandler.js
import React, { useEffect } from 'react';
import useNotifications from '../../hooks/useNotification';
import { useAppContext } from '../../context/AppContext';

const NotificationHandler = () => {
    const {state} = useAppContext()
    const userId = state?.user?._id
    if(!userId)return null;
  const {
    token,
    notification,
    permissionStatus,
    loading,
    error,
    requestPermissionAndToken
  } = useNotifications(userId);
  
  // Process in-app notifications
  useEffect(() => {
    
    if (notification) {
      // Handle different notification types based on data
      if (notification.data) {
        switch (notification.data.type) {
          case 'alert':
            // Trigger an alert in your app
            break;
          case 'update':
            // Update some UI component
            break;
          case 'redirect':
            // Redirect to a specific page
            break;
          default:
            // Default handling
            break;
        }
        
        // Dispatch an event that other components can listen for
        window.dispatchEvent(
          new CustomEvent('app-notification', { 
            detail: notification 
          })
        );
      }
    }
  }, [notification]);
  
  // Request permissions button (if needed)
  const handleRequestPermission = async () => {
    await requestPermissionAndToken();
  };
  
  if (error) {
    return (
      <div className="notification-error">
        <p>Error setting up notifications: {error}</p>
        <button onClick={handleRequestPermission}>Try Again</button>
      </div>
    );
  }
  
  // Only show request button if permission isn't granted
  if (permissionStatus !== 'granted') {
    return (
      <div className="notification-permission">
        <p>Enable notifications to stay updated</p>
        <button 
          onClick={handleRequestPermission}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Enable Notifications'}
        </button>
      </div>
    );
  }
  
  // Nothing to render if permissions are already granted
  return null;
};

export default NotificationHandler;