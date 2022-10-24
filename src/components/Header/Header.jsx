import { StyledHeader } from './Header.styled.js';
import { ReactComponent as HackerNewsLogo } from '@/assets/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewStories, resetState, showReload } from '@/store/newsSlice.js';
import { Link } from 'react-router-dom';

export const CustomHeader = () => {
  const dispatch = useDispatch();

  const onStoryView = useSelector((state) => state.news.onStoryView);
  const onMainView = useSelector((state) => state.news.onMainView);

  const handleReload = () => {
    dispatch(resetState());
    dispatch(fetchNewStories());
    dispatch(showReload(true));
  };

  const GoBackButton = () => {
    return (
      onStoryView.payload && (
        <Link to='/' className='ant-header-menu-button'>
          go back
        </Link>
      )
    );
  };

  const ReloadButton = () => {
    return (
      onMainView.payload && (
        <div className='ant-header-menu-button' key='1' onClick={handleReload}>
          reload
        </div>
      )
    );
  };
  return (
    <StyledHeader
      ghost={false}
      title='Hacker News'
      backIcon={false}
      extra={[<GoBackButton key='2' />, <ReloadButton key='1' />]}
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
  );
};
