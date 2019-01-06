
import 'styles/main.scss';
import './App.scss';
import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import { getLocationType } from 'state/selectors';
import { hot } from 'react-hot-loader';
import {
  Home
} from 'routes';
// import {
//   Switcher
// } from 'components';
import { constants } from 'app';
import { getScrollFactor, interpolateColor } from 'lib/interpolateColor';

ReactGA.initialize(constants.googleAnalyticsID);
ReactGA.pageview(window.location.pathname + window.location.search);

export class App extends React.Component {
  static propTypes = {
    locationType: PropTypes.string
  };

  state = {
    background: 'rgb(255,255,255)'
  }

  componentDidMount() {
    this.interpolateBackgroundOnScroll();
    document.addEventListener('scroll', this.interpolateBackgroundOnScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.interpolateBackgroundOnScroll);
  }
  
  interpolateBackgroundOnScroll = () => {
    // this code interpolates the bg color of the page between 2 colors as you scroll
    let scrollFactor = getScrollFactor();
    if (scrollFactor === 0) return;
    if (scrollFactor < .011) scrollFactor = 0;
  
    const topColor = [255, 255, 255];
    const bottomColor = [0, 0, 0];
    const interpolatedColor = interpolateColor(topColor, bottomColor, scrollFactor);
    this.setState({ background: interpolatedColor });
  }
  
  render() {
    const { locationType } = this.props;
    const { background } = this.state;
    return (
      <div className={`${locationType} app-container`} style={{ background }}>
        <div className='content-container'>
          {/* routes disabled for now */}
          <Home />
          {/* <Switcher
            routes={{
              HOME: Home
            }}
          /> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locationType: getLocationType(state)
});

export default hot(module)(connect(mapStateToProps)(App));