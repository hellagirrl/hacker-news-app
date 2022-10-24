import { Layout } from 'antd';
import NewsList from './components/News/NewsList/NewsList.jsx';
import { CustomHeader } from './components/Header/Header.jsx';
import { Switch, Route } from 'react-router-dom';
import NewItem from './components/New/NewItem.jsx';
const { Content } = Layout;

export default function App() {
  return (
    <div className='App'>
      <Layout style={{ backgroundColor: '#f6f6ef' }}>
        <CustomHeader />
        <Content>
          <Switch>
            <Route exact path='/'>
              <NewsList />
            </Route>
            <Route path='/:id'>
              <NewItem />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </div>
  );
}
