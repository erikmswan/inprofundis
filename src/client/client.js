import axios from 'axios';
// import { getApiKey } from 'state/selectors';
import * as daos from './dao';
import { serviceHosts } from 'app';
// import { store } from 'src';

class Client {
  constructor(serviceHosts) {
    // we save our serviceHosts map object set in env.js
    this.serviceHosts = serviceHosts;

    // we import our daos and pass the class context as the first argument.
    //  so our daos will be like python where the first arg is always `self`
    Object.keys(daos).forEach(key => {
      this[key] = (...args) => daos[key](this, ...args);
    });
  }

  request = ({ url, method, data, ...options }) => (
    axios({
      url,
      method,
      data,
      // ...this.addAuthData(auth),
      ...options,
    })
  )

  // addAuthData = auth => auth
  //   ? this.addKey(getKey(store.getState()))
  //   : {}
  
  addKey = apiKey => ({
    headers: {
      'Bearer': apiKey
    }
  })
}

// add our hosts env
export default new Client(serviceHosts[process.env.activeHosts]);
