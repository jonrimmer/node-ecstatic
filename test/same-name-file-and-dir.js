'use strict';

const tap = require('tap');
const ecstatic = require('../lib/ecstatic');
const http = require('http');
const request = require('request');

const test = tap.test;

const root = `${__dirname}/public`;
const baseDir = 'base';

test('directory and file have the same name', (t) => {
  const port = Math.floor((Math.random() * ((1 << 16) - 1e4)) + 1e4);

  const server = http.createServer(
    ecstatic({
      root,
      baseDir,
      showDir: false,
      autoIndex: false,
    })
  );

  server.listen(port, () => {
    request.get({
      uri: `http://localhost:${port}/public/g`
    }, (err, res, body) => {
      t.equals(body, 'g!!!');
      server.close();
      t.end();
    });
  });
});

