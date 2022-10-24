import { Divider, List } from 'antd';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewStories, resetState, showReload } from '@/store/newsSlice.js';
import { StyledSpin } from './NewsList.styled.js';
import NewsListItem from '../NewsListIem/NewsListItem.jsx';
import uuid from 'react-uuid';

const NewsList = () => {
  const { initLoading, loading, news } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewStories());
    dispatch(showReload(true));

    const interval = setInterval(() => {
      dispatch(resetState());
      dispatch(fetchNewStories());
      dispatch(showReload(true));
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
