import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";

function NotificationComponent() {
  const { usersDetails } = useSelector((state) => {
    return {
      usersDetails: state?.user?.usersDetails
    };
  });
  
  // Get userId from Redux state instead of hardcoding
  const userId = usersDetails?.id || 1;
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    // Add debugging for connection issues
    Pusher.logToConsole = true;
    
    const pusher = new Pusher('e5186d916d8ab2f20692', {
      cluster: 'ap2',
      authEndpoint: 'http://0.0.0.0:3000/api/v1/auth/pusher/auth',
      auth: {
        headers: {
          'Content-Type': 'application/json',
        }
      },
      authorizer: (channel, options) => {
        return {
          authorize: (socketId, callback) => {
            fetch(options.authEndpoint, {
              method: 'POST',
              headers: options.auth.headers || {},
              body: JSON.stringify({
                socket_id: socketId,
                channel_name: channel.name,
              }),
            })
            .then(response => response.json())
            .then(data => {
              callback(false, data);
            })
            .catch(error => {
              callback(true, error);
            });
          }
        };
      }
    });
  
    pusher.connection.bind('state_change', (states) => {
    });
  
    pusher.connection.bind('error', (err) => {
      console.error('Pusher connection error:', err);
    });
    
    const channel = pusher.subscribe(`private-user-${userId}`);
    
    channel.bind('pusher:subscription_succeeded', () => {
    });
    
    channel.bind('pusher:subscription_error', (error) => {
    });
    channel.bind('task-created', (data) => {
      setNotifications(prev => [...prev, {
        id: Date.now(),
        ...data,
        read: false
      }]);
      if (Notification.permission === 'granted') {
        new Notification('New Task Created', {
          body: data.message
        });
      }
    });
    channel.bind('task-assigned', (data) => {
      setNotifications(prev => [...prev, {
        id: Date.now(),
        ...data,
        read: false
      }]);
      
      if (Notification.permission === 'granted') {
        new Notification('Task Assigned', {
          body: data.message
        });
      }
    });
    
    return () => {
      channel.unbind_all();
      pusher.unsubscribe(`private-user-${userId}`);
      pusher.disconnect();
    };
  }, [userId]);
  
  return (
    <div className="notifications-container">
      <h3>Notifications</h3>
      {notifications.map(notification => (
        <li key={notification.id} className={notification.read ? 'read' : 'unread'}>
          <span>{notification.message || 'No message available'}</span>
          <small>
            {notification.timestamp
              ? new Date(notification.timestamp).toLocaleTimeString()
              : 'Just now'}
          </small>
        </li>
      ))}
    </div>
  );
}

export default NotificationComponent;