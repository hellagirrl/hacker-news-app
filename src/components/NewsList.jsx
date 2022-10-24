import { Divider, List, Space } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { getNewStories } from '../utils/api.js';
import { Spin } from 'antd';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getFormattedDate, getHostName } from '../utils/dataManipulation.js';
import { useSelector, useDispatch } from 'react-redux';
import {
  finishInitLoading,
  fetchNewStories,
  resetState,
} from '../store/newsSlice.js';

const StyledItem = styled(List.Item)`
  .ant-list-item-meta {
    margin-bottom: 0px;
  }
  .ant-list-item-meta-title {
    margin-bottom: 0;
    font-size: 14px;
  }

  .ant-list-item-meta-description {
    font-size: 10px;
    word-break: break-all;
  }
  .ant-list-item-action {
    margin-top: 0;
  }
  .ant-space-item {
    font-size: 12px;
  }
`;

const StyledSpin = styled(Spin)`
  .ant-spin-dot-item {
    background-color: #434343;
  }
`;
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
          <StyledItem
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
            <StyledItem.Meta
              // add NavLink here
              title={item.title}
              description={
                <a href={item.url} target='_blank'>
                  {getHostName(item.url)}
                </a>
              }
            />
          </StyledItem>
        )}
      />
    </InfiniteScroll>
  );
};
export default NewsList;
