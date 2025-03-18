import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectPusher, disconnectPusher } from '../../redux/actions';


const PusherListener = ({ userId }) => {
  const dispatch = useDispatch();
      const {  pusherEvents } = useSelector((state) => {
          return {
              pusherEvents: state?.user
          };
        });

        console.log('pusherEvents', pusherEvents);
        

  useEffect(() => {
    dispatch(connectPusher(`private-user-${userId}`));

    return () => {
      dispatch(disconnectPusher(1));
    };
  }, [dispatch, userId]);

  return (
    <div>
      <h2>Pusher Events</h2>
      <ul>
        {/* {pusherEvents.map((event, index) => (
          <li key={index}>{JSON.stringify(event)}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default PusherListener;