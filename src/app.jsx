'use strict';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';

import './app.css';
import TrafficFlow from './components/trafficFlow';

function fontsActive () {
  ReactDOM.render(
    <TrafficFlow />,
    document.getElementById('traffic')
  );
}

// TODO:
// Start the thread to retrieve latest info from db ?
// const AsyncPolling = require('async-polling');
// const util = require('util');

// TODO: Add async-poll here ?
// AsyncPolling(function (end) {
//   // Do whatever you want.
//   util.log('well...well...well...');
//   // Then notify the polling when your job is done:
//   end();
//   // This will schedule the next call.
// }, 3000).run();

// Only load the app once we have the webfonts.
// This is necessary since we use the fonts for drawing on Canvas'...

// imports are loaded and elements have been registered

WebFont.load({
  custom: {
    families: ['Source Sans Pro:n3,n4,n6,n7'],
    urls: ['/fonts/source-sans-pro.css']
  },
  active: fontsActive
});
