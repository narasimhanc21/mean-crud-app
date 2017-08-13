import mongoose from 'mongoose';
import util from 'util';

import config from './config/config';
import app from './config/express';

const debug = require('debug')('hot-reload-all-the-things:index');

Promise = require('bluebird');
mongoose.Promise = Promise;

const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
});

if (config.MONGOOSE_DEBUG) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
        debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
}

if (!module.parent) {
    // listen on port config.port
    app.listen(config.port, () => {
        console.info(`server started on port ${config.port} (${config.env})`);
    });
}

export default app;
