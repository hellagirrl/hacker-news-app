import { Divider, List, Space } from 'antd';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewStories, resetState } from '@/store/newsSlice.js';
import { StyledSpin } from './NewsList.styled.js';
import { NewsListItem } from '../NewsListIem/NewsListItem.jsx';
import uuid from 'react-uuid';

const NewsList = () => {
  // it's better not to destructure it bc of performance issues (rerender)
  const initLoading = useSelector((state) => state.initLoading);
  const loading = useSelector((state) => state.loading);
  const news = useSelector((state) => state.news.news);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewStories());

    const interval = setInterval(() => {
      dispatch(resetState());
      dispatch(fetchNewStories());
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  const showLoader = () => {
    if (!initLoading && news.length) {
      return <Divider plain>Loading...</Divider>;
    }
    return null;
  };

  const nextLoad = () => {
    if (loading) {
      return;
    }
    dispatch(fetchNewStories());
  };

  return (
    <InfiniteScroll
      dataLength={news.length}
      next={nextLoad}
      hasMore={true}
      loader={showLoader()}
      endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
    >
      <List
        bordered
        size='small'
        loading={initLoading}
        locale={{
          emptyText: <StyledSpin />,
        }}
        className='demo-loadmore-list'
        itemLayout='vertical'
        dataSource={news}
        renderItem={(item) => <NewsListItem item={item} key={uuid()} />}
      />
    </InfiniteScroll>
  );
};
export default NewsList;
