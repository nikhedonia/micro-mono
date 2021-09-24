import * as singleSpa from 'single-spa';
import {test} from "./test";

console.log(test);

singleSpa.registerApplication(
  "app1",
  () => {
    const x = import('app1/spa');
    return x;
  }, 
  () => true
);

singleSpa.start();