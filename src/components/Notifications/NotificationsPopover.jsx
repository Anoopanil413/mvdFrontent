import React, { useRef, useState, useEffect } from 'react';
import { Bell, X, Check } from 'lucide-react';
import { useNotifications } from '../../context/Notificationcontext';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { clearAllNotifications, getunreadNotifications } from '../../api/userApi';

const NotificationsPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiNotifications, setApiNotifications] = useState([]);
  const { notifications, hasUnread, markAsRead, clearNotifications } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);

  const popoverRef = useRef(null);

  useOnClickOutside(popoverRef, () => setIsOpen(false));
  const fetchApiNotifications = async () => {
    try {
      setIsLoading(true);
      const unreadNotifications = await getunreadNotifications();
      setApiNotifications(unreadNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchApiNotifications();
    }
  }, [isOpen]);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAsRead = (id) => {
    markAsRead(id);
  };

  const clearAllReadNotifications =async() => {
    try {
        await clearAllNotifications();
        await clearNotifications()
        setApiNotifications([]);
        
    } catch (error) {
        
    }

  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    const date = typeof timestamp === 'object' ? timestamp : new Date(timestamp);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const combinedNotifications = [
    ...apiNotifications.map(notif => ({
      id: notif._id,
      title: notif.senderId?.name || 'Vehicle Alert',
      body: notif.content,
      timestamp: notif.sentAt,
      read: notif.read,
      source: 'api',
      originalData: notif // Keep original data for reference
    })),
    ...notifications.map(notif => ({
      ...notif,
      source: 'firebase'
    }))
  ];

  const sortedNotifications = combinedNotifications.sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div className="relative" ref={popoverRef}>
      <button 
        onClick={togglePopover}
        className="relative rounded p-1 hover:bg-gray-100 focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="h-6 w-6 text-gray-500" />
        {hasUnread && (
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-80 max-h-96 overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            <div className="flex space-x-2">
              {sortedNotifications.length > 0 && (
                <button 
                  onClick={clearAllReadNotifications}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Clear all
                </button>
              )}
              <button 
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
          {isLoading ? (
              <div className="p-4 text-center text-gray-500">
                Loading notifications...
              </div>
            ) :sortedNotifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
                sortedNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 ${!notification.read ? 'bg-indigo-50' : ''} hover:bg-gray-50`}
                >
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                    <span className="text-xs text-gray-500">{formatTimestamp(notification.timestamp)}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{notification.body}</p>
                  {!notification.read && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="mt-2 flex items-center text-xs text-indigo-600 hover:text-indigo-800"
                    >
                      <Check className="mr-1 h-3 w-3" />
                      Mark as read
                    </button>
                  )}
                  {notification.source === 'api' && notification.originalData.senderId?.phone && (
                    <div className="mt-1 text-xs text-gray-400">
                      From: {notification.originalData.senderId.phone}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPopover;