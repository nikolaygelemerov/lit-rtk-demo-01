/* eslint-disable compat/compat */
import '@components';
import * as cubbyFacilities from '@components/CubbyFacilities/CubbyFacilities';
import { initializeProxy } from '@services';

const url = 'http://localhost:8090/cubby-components?api-key=';
let apiKey = '';

const currentScript = document.currentScript as HTMLScriptElement;

if (currentScript && currentScript.src.indexOf(url) !== -1) {
  apiKey = currentScript.src.split(url)[1];
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// fetch(`http://localhost:8090/get-config/${apiKey}`)
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then((response) => response.json())
  // .then((data) => delay(10000).then(() => data)) // Delay for 10 seconds before consuming data
  .then((data) => {
    initializeProxy[cubbyFacilities.ID] = {
      data: { id: cubbyFacilities.ID, payload: { date: new Date().toISOString() } }
    };
  })
  .catch((err) => {
    console.error(`Error loading config: ${err}`);
  });
