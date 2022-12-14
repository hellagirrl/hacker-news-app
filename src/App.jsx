import { Layout } from 'antd';
import NewsList from './components/News/NewsList/NewsList.jsx';
import { CustomHeader } from './components/Header/Header.jsx';
import { Switch, Route } from 'react-router-dom';
import NewItem from './components/Story/StoryItem.jsx';
import CustomAlert from './components/Alert.jsx';

const { Content } = Layout;

export default function App() {
  return (
    <div className='App'>
      <Layout style={{ backgroundColor: '#f6f6ef' }}>
        <CustomHeader />
        <Content>
          <CustomAlert />
          <Switch>
            <Route exact path='/hacker-news-app'>
              <NewsList />
            </Route>
            <Route path='/hacker-news-app/:id'>
              <NewItem />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </div>
  );
}
