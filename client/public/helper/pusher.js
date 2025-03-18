import Pusher from 'pusher-js';
import Cookies from 'js-cookie';

const pusher = new Pusher("e5186d916d8ab2f20692", {
    cluster: "ap2",
    authEndpoint: 'http://localhost:3000/auth/pusher-auth',
    auth: {
      headers: {
        Authorization: `Bearer ${Cookies.get('auth-token')}`,
      },
    },

  });

export default pusher;