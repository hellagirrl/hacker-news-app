import { StyledListItem } from './NewsListItem.styled.js';
import { Space } from 'antd';
import React from 'react';
import { StarOutlined } from '@ant-design/icons';
import { getFormattedDate, getHostName } from '@/utils/dataManipulation.js';
import { Link } from 'react-router-dom';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const NewsListItem = (props) => {
  return (
    <StyledListItem
      key={props.item.id}
      actions={[
        <IconText
          icon={StarOutlined}
          text={props.item.score}
          key='list-vertical-star-o'
        />,
        <div className='ant-space-item'>
          {getFormattedDate(props.item.time)}
        </div>,
      ]}
    >
      <StyledListItem.Meta
        title={<Link to={props.item.id.toString()}>{props.item.title}</Link>}
        description={
          <a href={props.item.url} target='_blank'>
            {getHostName(props.item.url)}
          </a>
        }
      />
    </StyledListItem>
  );
};

export { NewsListItem };