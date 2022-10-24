import React, { useEffect, useMemo } from 'react';
import { showGoBack } from '@/store/newsSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const NewItem = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showGoBack());
  });
  return <h1>Item Component</h1>;
};

export default NewItem;
