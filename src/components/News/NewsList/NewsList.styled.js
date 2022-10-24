import styled from 'styled-components';
import { Spin } from 'antd';
import { List } from 'antd';

const StyledListItem = styled(List.Item)`
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

export { StyledListItem, StyledSpin };
