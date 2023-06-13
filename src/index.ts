import '@components';
import * as cubbyFacilities from '@components/CubbyFacilities/CubbyFacilities';
import * as cubbyFacility from '@components/CubbyFacility/CubbyFacility';

const url = 'http://localhost:8090/cubby-components?api-key=';
let apiKey = '';

// eslint-disable-next-line compat/compat
const currentScript = document.currentScript as HTMLScriptElement;

if (currentScript && currentScript.src.indexOf(url) !== -1) {
  apiKey = currentScript.src.split(url)[1];
}

// eslint-disable-next-line compat/compat
fetch(`http://localhost:8090/get-config/${apiKey}`)
  .then((response) => response.json())
  .then(async () => {
    await customElements.whenDefined('cubby-facilities');
    cubbyFacilities.initialize();

    await customElements.whenDefined('cubby-facility');
    cubbyFacility.initialize();
  })
  .catch((err) => {
    console.error(`Error loading config: ${err}`);
  });
