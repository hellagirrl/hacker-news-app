import { StyledHeader } from './Header.styled.js';
import { ReactComponent as HackerNewsLogo } from '@/assets/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewStories, resetState } from '@/store/newsSlice.js';

export const CustomHeader = () => {
  const dispatch = useDispatch();

  const isBack = useSelector((state) => state.isBack);

  const handleReload = () => {
    dispatch(resetState());
    dispatch(fetchNewStories());
  };

  const GoBackButton = () => {
    console.log(isBack);
    if (!isBack) {
      return;
    }
    return (
      <div className='ant-header-menu-button' onClick={handleReload}>
        go back
      </div>
    );
  };

  return (
    <StyledHeader
      ghost={false}
      title='Hacker News'
      backIcon={false}
      extra={[
        <GoBackButton key='2' />,
        <div className='ant-header-menu-button' key='1' onClick={handleReload}>
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
  );
};
