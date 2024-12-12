import { APP_BASE_HREF } from '@angular/common';
// import { CommonEngine } from '@angular/ssr';  // Removed this line
import { ngExpressEngine } from '@nguniversal/express-engine';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import 'localstorage-polyfill';

global['localStorage'] = localStorage;

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();

  // Path to the Angular app distribution folder
  const angularDistFolder = resolve(__dirname, '../dist/wallet-watch-frontend');
  const indexHtml = join(angularDistFolder, 'index.html');

  // Use ngExpressEngine instead of CommonEngine
  server.engine('html', ngExpressEngine({
    bootstrap: bootstrap, // the bootstrap function (or AppServerModule) to initialize SSR
  }));

  server.set('view engine', 'html');
  server.set('views', angularDistFolder);

  // Serve static files from the Angular app
  server.use(express.static(angularDistFolder, { maxAge: '1y' }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    })  // Error handling is passed to Express' next() function
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
