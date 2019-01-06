import './Home.scss';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import story from './story';

export const Home = () => (
  <div className='home-container'>
    <h1 className='title'>In Profundis.</h1>
    {story}
    <p className='signature'>
      <a
        href='http://erikmichaelswan.com'
        target='_blank'
        rel='noopener noreferrer'
      >
        – E.M.S.
      </a>
    </p>
  </div>
);

export default hot(module)(Home);
