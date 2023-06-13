const scripts = document.getElementsByTagName('script');

let apiKey = '';

const url = 'http://localhost:8090/cubby-components?api-key=';

for (const script of scripts) {
  if (script.src.indexOf(url) === -1) {
    continue;
  }

  apiKey = script.src.split(url)[1];
  break;
}

// eslint-disable-next-line compat/compat
fetch(`http://localhost:8090/get-config/${apiKey}`)
  .then((response) => response.json())
  .then((config) => {
    import('@components');

    import('@components/CubbyFacilities/CubbyFacilities').then(({ initialize }) => {
      console.log('config: ', config);

      initialize(config);
    });
  })
  .catch((err) => {
    console.error(`Error loading config: ${err}`);
  });
