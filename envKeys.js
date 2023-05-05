// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

const keys = ['STOREFRONT_KEY', 'STOREFRONT_STYLES'];

const envConfig = dotenv.config().parsed;

module.exports = {
  generateEnvKeys: (isDev) =>
    keys.reduce((accum, key) => {
      if (isDev) {
        accum[key] = JSON.stringify(envConfig[key]);

        return accum;
      }

      // accum[key] = isDev ? JSON.stringify(envConfig[key]) : JSON.stringify(key);

      return accum;
    }, {})
};
