import { Divider, List, Skeleton, Space } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { getNewStories } from '../utils/api.js';
import { Spin } from 'antd';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getFormattedDate, getHostName } from '../utils/dataManipulation.js';

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

let count = 0;

const StyledSpin = styled(Spin)`
  .ant-spin-dot-item {
    background-color: #434343;
  }
`;
const NewsList = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const nextCount = initLoading ? count + 100 : count + 20;

    getNewStories(count, nextCount)
      .then((stories) => {
        setData([...data, ...stories]);
        setLoading(false);
        count = initLoading ? count + 100 : count + 20;
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
    setInitLoading(false);

    const interval = setInterval(() => {
      count = 0;
      loadMoreData();
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
    if (!initLoading && data.length) {
      return <Divider plain>Loading...</Divider>;
    }
    return null;
  };

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={loadMoreData}
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
