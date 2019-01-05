
import 'styles/main.scss';
import './App.scss';
import * as React from 'react';
import { hot } from 'react-hot-loader';
import {
  Home
} from 'routes';
import {
  Switcher
} from 'components';

const App = () => (
  <div className='app-container'>
    <div className='content-container'>
      <Switcher
        routes={{
          HOME: Home
        }}
      />
    </div>
  </div>
);
export default hot(module)(App);