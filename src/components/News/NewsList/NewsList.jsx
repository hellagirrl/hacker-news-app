import { Divider, List } from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewStories, resetState, showReload } from '@/store/newsSlice.js';
import { StyledSpin } from './NewsList.styled.js';
import NewsListItem from '../NewsListIem/NewsListItem.jsx';

const NewsList = () => {
  const { initLoading, loading } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    let ignore = false;

    dispatch(fetchNewStories()).then((stories) => {
      if (!ignore) {
        setData([...data, ...stories.payload]);
      }
    });

    dispatch(showReload(true));

    const interval = setInterval(() => {
      dispatch(resetState());
      setData([]);
      dispatch(fetchNewStories()).then((stories) => {
        setData([...data, ...stories.payload]);
      });
      dispatch(showReload(true));
    }, 60000);

    return () => {
      ignore = true;
      clearInterval(interval);
    };
  }, []);

  const showLoader = () => {
    if (!initLoading && data.length) {
      return <Divider plain>Loading...</Divider>;
    }
    return null;
  };

  const nextLoad = () => {
    if (loading) {
      return;
    }
    dispatch(fetchNewStories()).then((stories) => {
      setData([...data, ...stories.payload]);
    });
  };

  return (
    <InfiniteScroll
      dataLength={data.length}
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
        dataSource={data}
        renderItem={(item) => <NewsListItem item={item} key={item.id} />}
      />
    </InfiniteScroll>
  );
};
export default NewsList;
