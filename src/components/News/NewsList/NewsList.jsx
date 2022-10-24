import { Divider, List, Space } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getFormattedDate, getHostName } from '@/utils/dataManipulation.js';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewStories, resetState } from '@/store/newsSlice.js';

import { StyledListItem, StyledSpin } from './NewsList.styled.js';

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

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

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
        renderItem={(item) => (
          <StyledListItem
            key={item.id}
            actions={[
              <IconText
                icon={StarOutlined}
                text={item.score}
                key='list-vertical-star-o'
              />,
              <div className='ant-space-item'>
                {getFormattedDate(item.time)}
              </div>,
            ]}
          >
            <StyledListItem.Meta
              // add NavLink here
              title={item.title}
              description={
                <a href={item.url} target='_blank'>
                  {getHostName(item.url)}
                </a>
              }
            />
          </StyledListItem>
        )}
      />
    </InfiniteScroll>
  );
};
export default NewsList;
