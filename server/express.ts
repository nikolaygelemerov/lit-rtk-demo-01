/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable compat/compat */
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
// POST endpoint to save CSS variables
import { Request, Response } from 'express';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import zlib from 'zlib';

import { STYLES_CACHE, STYLES_CACHE_READY } from './cache';
import { config } from './config';
import { buildCSSVars } from './utils';

const server = express();

const PORT = process.env.PORT || 8090;

const staticMiddleware = express.static('dist');

server.use(staticMiddleware);

const mapCSSVars = () => {
  Object.keys(STYLES_CACHE).forEach((key) => {
    if (STYLES_CACHE[key]?.cssVariables) {
      STYLES_CACHE_READY[key] = {
        cssVariables: JSON.stringify(buildCSSVars(STYLES_CACHE[key].cssVariables))
      };
    }
  });

  return STYLES_CACHE_READY;
};

// Middleware to set headers for every HTTP request
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Use body-parser middleware to parse JSON request bodies
server.use(bodyParser.json());

server.get('/cubby-components', async (req, res) => {
  // Run the build command from the correct directory
  try {
    /*
    const apiKey = req.query['api-key'] || '';

    Run the build command from the correct directory and wait for it to complete
    const stdout = await execPromise(`webpack --mode production --env STOREFRONT_KEY=${apiKey}`);

    console.log('stdout: ', stdout);
    */

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
    // const isManager = req.query['is-manager'] || '';

    // const modifiedData = data.replace(/STOREFRONT_KEY/g, `${apiKey}`);

    const modifiedData = `(function() {
      const STOREFRONT_KEY = "${apiKey}";
      const STOREFRONT_STYLES = ${JSON.stringify(mapCSSVars())};

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

server.get('/get-config/:apiKey', (req, res) => {
  const { apiKey } = req.params;

  res.setHeader('Content-Type', 'application/json');
  res.send(config);
});

// POST endpoint to save CSS variables
server.post('/save-styles/:componentId/:versionId', async (req: Request, res: Response) => {
  try {
    const { cssVariables } = req.body;
    const { componentId, versionId } = req.params;

    STYLES_CACHE[`${componentId}-${versionId}`] = { cssVariables };

    return res.status(200).json({ message: 'Styles saved successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save styles' });
  }
});

server.get('/get-styles/:componentId/:versionId', (req, res) => {
  try {
    const { componentId, versionId } = req.params;

    if (!STYLES_CACHE[`${componentId}-${versionId}`]) {
      return res.status(404).json({ error: 'Styles not found' });
    }

    return res.status(200).json({
      cssVariables: STYLES_CACHE[`${componentId}-${versionId}`].cssVariables,
      message: 'Styles fetched successfully'
    });
  } catch (error) {
    console.error('Failed to read styles:', error);
    return res.status(500).json({ error: 'Failed to get styles' });
  }
});

// Set up CORS middleware to allow localhost:8090
const corsOptions = {
  optionsSuccessStatus: 200,
  origin: true // 'http://localhost:8090'
};

server.use(cors(corsOptions));

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
