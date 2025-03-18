import Pusher from 'pusher-js';
import { useEffect } from 'react';

// Get userId from sessionStorage
const userId = sessionStorage.getItem('userId') || '1';

// Create Pusher instance with the correct port
const pusher = new Pusher('e5186d916d8ab2f20692', {
  cluster: 'ap2',
  authEndpoint: 'http://0.0.0.0:8787/api/v1/auth/pusher/auth', // Correct port
  auth: {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJBc2hhbiIsImVtYWlsIjoiYXNoYW4uaGV0dGlhcmFjaGNoaUBpZGVhaHViLmxrIiwiZmlyc3ROYW1lIjoiQXNoYW4iLCJsYXN0TmFtZSI6IkhldHRpYXJhY2hjaGkiLCJjb250YWN0TnVtYmVyIjoiMDcwNDMwMjY4NCIsImlzRmlyc3RUaW1lTG9naW4iOjEsImlhdCI6MTc0MjI3NTQzOCwiZXhwIjoxNzQyMjgyNjM4fQ.zmJNtUJURDscfo9KWaUvAKYm2aTydpW2ccX98r7kya0`,
    }
  }
});

export const usePusher = () => {
  console.log("hit");
  
  useEffect(() => {
    if (userId) {
      console.log("hit ******************");
      
      // Subscribe to the correct channel
      const channelName = `private-user-${userId}`;
      console.log("Attempting to subscribe to:", channelName);
      
      const channel = pusher.subscribe(channelName);
      
      // Add debugging for subscription events
      channel.bind('pusher:subscription_error', (error) => {
        console.error('Subscription error:', error);
      });
      
      channel.bind('pusher:subscription_succeeded', () => {
        console.log('Successfully subscribed to channel:', channelName);
      });
      

      channel.bind('user-logged-in', (data) => {
        console.log('Login Event:', data);
      });
      
      return () => {
        console.log("Cleaning up Pusher subscription");
        pusher.unsubscribe(channelName);
      };
    }
  }, []);
};