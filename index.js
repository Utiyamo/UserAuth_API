const createApp = require('./src/app');

const app = createApp();
try{
    app.Start();
} catch(error) {
    console.log('> [index] Uncaught error!');
    console.log(`> [index] ${error}`);
}