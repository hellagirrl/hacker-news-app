import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { Layout } from 'antd';
import NewsList from './components/NewsList.jsx';

const { Header, Footer, Content } = Layout;

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <Layout>
        {/* <Header>Header</Header> */}
        <Content>
          {' '}
          <NewsList />
        </Content>
      </Layout>
    </div>
  );
}
