import { Button, List, Skeleton, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { getNewStories } from '../utils/api.js';
import { StarOutlined } from '@ant-design/icons';

const count = 20;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const NewsList = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    getNewStories().then((stories) => {
      setInitLoading(false);
      setData(stories);
      setList(stories);
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
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <List
      bordered
      header={<div>Hacker News</div>}
      className='demo-loadmore-list'
      loading={initLoading}
      itemLayout='vertical'
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <IconText
              icon={StarOutlined}
              text={item.score}
              key='list-vertical-star-o'
            />,
            <div key='list-loadmore-edit'>{getDate(item.time)}</div>,
          ]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              title={item.title}
              description={
                <a href='{item.url}' target='_blank'>
                  {item.url}
                </a>
              }
            />
            {/* <div>{item.score}</div> */}
          </Skeleton>
        </List.Item>
      )}
    />
  );
};
export default NewsList;
