import { Button, List, Skeleton, Space } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { getNewStories } from '../utils/api.js';
import { ReactComponent as HackerNewsLogo } from '../assets/logo.svg';
import styled from 'styled-components';

const StyledItem = styled(List.Item)`
  .ant-list-item-meta {
    margin-bottom: 8px;
  }
  .ant-list-item-meta-title {
    margin-bottom: 0;
  }

  .ant-list-item-meta-description {
    color: red;
    font-size: 12px;
    word-break: break-all;
  }
  .ant-list-item-action {
    margin-top: 0;
  }
  .ant-space-item {
    font-size: 12px;
  }
`;
let count = 100;

const NewsList = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    getNewStories(count).then((stories) => {
      setInitLoading(false);
      setData(stories);
      setList(stories);
      count += 10;
      console.log(stories);
    });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      )
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const getDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <List
      bordered
      header={<h1>Hacker News</h1>}
      size='small'
      className='demo-loadmore-list'
      loading={initLoading}
      itemLayout='vertical'
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <StyledItem
          key={item.id}
          actions={[
            <IconText
              icon={StarOutlined}
              text={item.score}
              key='list-vertical-star-o'
            />,
            <div key='list-loadmore-edit' className='ant-space-item'>
              {getDate(item.time)}
            </div>,
          ]}
        >
          {/* <Skeleton avatar title={false} loading={item.loading} active> */}
          <StyledItem.Meta
            // add NavLink here
            title={item.title}
            description={
              <a href={item.url} target='_blank'>
                {item.url}
              </a>
            }
          />
          {/* </Skeleton> */}
        </StyledItem>
      )}
    />
  );
};
export default NewsList;
