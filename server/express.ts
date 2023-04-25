import { exec } from 'child_process';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import util from 'util';

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
    glob(`${builtFilesPath}/app.*.js`, {}, (err, files) => {
      if (err) {
        console.error(`glob error: ${err}`);
        res.status(500).send('An error occurred while searching for the built file');
        return;
      }

      if (files.length === 0) {
        res.status(404).send('Built file not found');
        return;
      }

      const builtFilePath = files[0];
      fs.readFile(builtFilePath, 'utf-8', (err, data) => {
        if (err) {
          console.error(`readFile error: ${err}`);
          res.status(500).send('An error occurred while reading the built file');
          return;
        }

        // Replace the API key with the dynamic query parameter
        const apiKey = req.query['api-key'] || '';
        const modifiedData = data.replace(/STOREFRONT_KEY/g, `${apiKey}`);

        res.setHeader('Content-Type', 'application/javascript');
        res.send(modifiedData);
      });
    });
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
