"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = app;
const common_1 = require("@angular/common");
// import { CommonEngine } from '@angular/ssr';  // Removed this line
const express_engine_1 = require("@nguniversal/express-engine");
const express_1 = __importDefault(require("express"));
const node_path_1 = require("node:path");
const main_server_1 = __importDefault(require("./src/main.server"));
require("localstorage-polyfill");
global['localStorage'] = localStorage;
// The Express app is exported so that it can be used by serverless Functions.
function app() {
    const server = (0, express_1.default)();
    // Path to the Angular app distribution folder
    const angularDistFolder = (0, node_path_1.resolve)(__dirname, '../dist/wallet-watch-frontend');
    const indexHtml = (0, node_path_1.join)(angularDistFolder, 'index.html');
    // Use ngExpressEngine instead of CommonEngine
    server.engine('html', (0, express_engine_1.ngExpressEngine)({
        bootstrap: main_server_1.default, // the bootstrap function (or AppServerModule) to initialize SSR
    }));
    server.set('view engine', 'html');
    server.set('views', angularDistFolder);
    // Serve static files from the Angular app
    server.use(express_1.default.static(angularDistFolder, { maxAge: '1y' }));
    // All regular routes use the Angular engine
    server.get('**', (req, res, next) => {
        const { protocol, originalUrl, baseUrl, headers } = req;
        res.render(indexHtml, {
            req,
            providers: [{ provide: common_1.APP_BASE_HREF, useValue: baseUrl }],
        }); // Error handling is passed to Express' next() function
    });
    return server;
}
function run() {
    const port = process.env['PORT'] || 4000;
    // Start up the Node server
    const server = app();
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}
run();
