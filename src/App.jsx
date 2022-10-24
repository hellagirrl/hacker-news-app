import { useState } from 'react';
import { Layout } from 'antd';
// import NewsList from './components/NewsList.jsx';
import NewsList from './components/News/NewsList/NewsList.jsx';
import { CustomHeader } from './components/Header/Header.jsx';
const { Content } = Layout;

export default function App() {
  return (
    <div className='App'>
      <Layout style={{ backgroundColor: '#f6f6ef' }}>
        <CustomHeader />
        <Content>
          {' '}
          <NewsList />
        </Content>
      </Layout>
    </div>
  );
}
