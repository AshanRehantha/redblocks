
import React from 'react';
import { useSelector } from 'react-redux';

const Loader = () => {
    const { loading } = useSelector((state) => {
        return {
            loading: state.loading
        };
    });

  return (
    loading?.show && (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    )
  );
};




const ShowLoader = () => {


return (
    <div className="loader">
      <div className="spinner"></div>
    </div>
);
};

export default Loader;
export  {ShowLoader};
