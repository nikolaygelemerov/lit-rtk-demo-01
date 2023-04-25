// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

const keys = ['STOREFRONT_KEY'];

const envConfig = dotenv.config().parsed;

module.exports = {
  generateEnvKeys: (isDev, env) =>
    keys.reduce((accum, key) => {
      accum[key] = isDev ? JSON.stringify(envConfig[key]) : JSON.stringify(key);

      return accum;
    }, {})
};
