// eslint-disable-next-line compat/compat
fetch(`http://localhost:8090/get-config/${STOREFRONT_KEY}`)
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
