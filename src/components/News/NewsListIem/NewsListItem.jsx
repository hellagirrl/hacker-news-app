import { StyledListItem } from './NewsListItem.styled.js';
import { Space } from 'antd';
import React, { memo } from 'react';
import { StarOutlined } from '@ant-design/icons';
import { getFormattedDate } from '@/utils/getFormattedDate.js';
import { getHostName } from '@/utils/getHostName.js';
import { Link } from 'react-router-dom';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const NewsListItem = (props) => {
  const showComments = () => {};

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
        props.item.kids && (
          <div onClick={showComments}>{props.item.kids?.length} comments</div>
        ),
      ]}
    >
      <StyledListItem.Meta
        title={
          props.item.id && (
            <Link to={props.item.id?.toString()}>{props.item.title}</Link>
          )
        }
        description={
          <a href={props.item.url} target='_blank'>
            {getHostName(props.item.url)}
          </a>
        }
      />
    </StyledListItem>
  );
};

export default memo(NewsListItem);
