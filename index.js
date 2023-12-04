'use strict';

const bootstrap = require('./lib/infrastructure/config/bootstrap');
const createServer = require('./lib/infrastructure/webserver/server');

// Start the server
const start = async () => {

  try {
    await bootstrap.init();

    
    const corsConfig = {
      origin: ['*'],
      routes: ['*'],

    };

    const server = await createServer(corsConfig);

    await server.start();



    console.log('Server running at:', server.info.uri);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();