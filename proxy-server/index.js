const express = require('express');
const logger = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');

// Create an Express Server
const app = express();

// Configuration variables
const PORT = 3000;
const HOST = 'localhost';
const API_SERVICE_URL = 'https://nerd.cesnet.cz/nerd/api/v1';

// Logging
// Log to file
app.use(logger('common', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
// Log to console
app.use(logger('dev'));

// Info about this proxy
app.get('/info', (req, res, next) => {
   res.send('This is a proxy service which proxies to the NERD API.');
});

// Authorization headers setting
app.use('', (req, res, next) => {
    if (req.headers.authorization) {
        next();
    } else {
        res.sendStatus(403);
    }
 });

 // Proxy endpoints
app.use('/proxy', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/proxy`]: '',
    },
 }));

 // Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
 });