/* eslint-disable compat/compat */
import { exec } from 'child_process';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import util from 'util';
import zlib from 'zlib';

import { STOREFRONT_STYLES } from './dummyStyles';

const execPromise = util.promisify(exec);

const server = express();

const PORT = process.env.PORT || 8090;

const staticMiddleware = express.static('dist');

server.use(staticMiddleware);

server.get('/cubby-components', async (req, res) => {
  // Run the build command from the correct directory
  try {
    // const apiKey = req.query['api-key'] || '';

    // Run the build command from the correct directory and wait for it to complete
    // const stdout = await execPromise(`webpack --mode production --env STOREFRONT_KEY=${apiKey}`);

    // console.log('stdout: ', stdout);

    // Read the built JavaScript file and return it
    const builtFilesPath = path.resolve(__dirname, '..', 'dist', 'public');
    const files = await new Promise<string[]>((resolve, reject) => {
      glob(`${builtFilesPath}/app.*.js`, {}, (err, files) => {
        if (err) reject(err);
        else resolve(files);
      });
    });

    if (files.length === 0) {
      res.status(404).send('Built file not found');
      return;
    }

    const builtFilePath = files[0];
    const data = await fs.promises.readFile(builtFilePath, 'utf-8');

    const apiKey = req.query['api-key'] || '';
    const isManager = req.query['is-manager'] || '';

    // const modifiedData = data.replace(/STOREFRONT_KEY/g, `${apiKey}`);

    const modifiedData = `(function() {
      const STOREFRONT_KEY = "${apiKey}";
      ${isManager ? '' : `const STOREFRONT_STYLES = \`${STOREFRONT_STYLES}\`;`}

      ${data}
    })();`;

    // res.setHeader('Content-Type', 'application/javascript');
    // res.send(modifiedData);

    try {
      // gzip the modifiedData
      const gzippedData = await new Promise<Buffer>((resolve, reject) => {
        zlib.gzip(modifiedData, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Content-Encoding', 'gzip');
      res.send(gzippedData);
    } catch (err) {
      console.error(`gzip error: ${err}`);
      res.status(500).send('An error occurred while gzipping the modified data');
    }
  } catch (err) {
    console.error(`build error: ${err}`);
    res.status(500).send('An error occurred while building the file');
  }
});

// Set up CORS middleware to allow localhost:8090
const corsOptions = {
  optionsSuccessStatus: 200,
  origin: 'http://localhost:8090'
};

server.use(cors(corsOptions));

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
