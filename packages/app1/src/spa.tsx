import * as React from "react";
import * as ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import App from './app';

const spa = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: App,
    errorBoundary() {
      // https://reactjs.org/docs/error-boundaries.html
      return (
        <div>Error in app1</div>
      );
    },
  });


console.log(spa);
export default spa;
  
export const bootstrap = spa.bootstrap;
export const mount = spa.mount;
export const unmount = spa.unmount;