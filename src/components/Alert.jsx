import { Alert } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const CustomAlert = () => {
  const error = useSelector((state) => state.news.error);
  return (
    (error || error?.payload) && (
      <>
        <Alert closable message={error || error.payload} type='error' />
      </>
    )
  );
};
export default CustomAlert;
