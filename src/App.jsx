import { useState } from 'react';
import './App.css';
import { ReactComponent as HackerNewsLogo } from './assets/logo.svg';
import { Layout, PageHeader } from 'antd';
import NewsList from './components/NewsList.jsx';
import styled from 'styled-components';

const { Content } = Layout;
const StyledHeader = styled(PageHeader)`
  .ant-page-header-heading-left {
    margin: 0;
  }
  .ant-avatar-icon {
    background: #ff6600;
  }
`;

export default function App() {
  const handleReload = () => {};
  return (
    <div className='App'>
      <Layout style={{ backgroundColor: '#f6f6ef' }}>
        <StyledHeader
          ghost={false}
          title='Hacker News'
          backIcon={false}
          extra={[
            <div
              className='ant-header-menu-button'
              key='1'
              onClick={handleReload}
            >
              reload
            </div>,
          ]}
          // These styles weren't appliable
          style={{
            border: '1px solid #d9d9d9',
            backgroundColor: '#ff6600',
            padding: '0',
          }}
          avatar={{
            icon: <HackerNewsLogo />,
            shape: 'square',
          }}
        ></StyledHeader>
        <Content>
          {' '}
          <NewsList />
        </Content>
      </Layout>
    </div>
  );
}
