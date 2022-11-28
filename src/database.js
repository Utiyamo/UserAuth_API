const mongoose = require('mongoose');

function Database() {

    function Start(){
        console.log('> [database] Starting...');
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.connectionString || 'mongodb+srv://DanielUtiyama:a1b2c3d4e5@dcclustersp-exlfo.gcp.mongodb.net/Web', 
                process.env.mongodbOptions ||  { useNewUrlParser: true, useUnifiedTopology: true});

        console.log('> [database] Starteing done!');
    }

    function Stop(){
        console.log('> [database] Stopping...');
        console.log('> [database] Stopping done!');
    }

    return {
        Start,
        Stop
    };
}

module.exports = Database;
