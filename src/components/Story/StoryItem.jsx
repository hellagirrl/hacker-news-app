import React, { useEffect, useMemo, useState } from 'react';
import { showGoBack, showReload } from '@/store/newsSlice.js';
import { useDispatch } from 'react-redux';
import { getStory } from '../../utils/api';
import { useParams } from 'react-router';
import { NewsListItem } from '../News/NewsListIem/NewsListItem';
import { List } from 'antd';
const NewItem = () => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  let { id } = useParams();

  useMemo(() => {
    getStory(id).then((story) => {
      setData({ ...story });
      console.log(story);
    });
  }, []);

  useEffect(() => {
    dispatch(showGoBack(true));
    dispatch(showReload(false));
    return () => {
      dispatch(showGoBack(false));
      dispatch(showReload(true));
    };
  }, []);
  return (
    <List itemLayout='vertical'>
      <NewsListItem item={data} />
    </List>
  );
};

export default NewItem;
