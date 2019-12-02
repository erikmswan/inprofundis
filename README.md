# In Profundis

A horror story.




## Setup

- `npm i` to install packages.
- Setup an `env.js` file from the `env.js.template`.
 - In `env.js`, you set the value of `activeHosts` to select which environment context to use.
 - The environment context, or the service -> url maps, are configured in `app.js`.
 
```javascript
// app.js
serviceHosts: {
  default: {
    apiHost: 'http://host:port'
  }
}

// ...

// env.js
activeHosts: 'default',
 ```

## Usage

### Development

For the development server, use `npm run dev`. This will build files to memory and host the app by default on `http://localhost:9080`.

### Production

To build the production verson of the app, use `npm run build` and serve the files from the `/dist` folder.