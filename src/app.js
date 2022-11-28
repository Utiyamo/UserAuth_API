const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const createDatabase = require('./database.js');
const createRoutes = require('./routes.js');

function App(configurations = {}){
    const database = configurations.database || createDatabase();
    const router = configurations.router || createRoutes();

    function Start(){
        console.log('> [app] Starting...');

        const app = express();
        const port = process.env.PORT || 3000;

        app.use(bodyParser.urlencoded(
            { extended: true}
        ));
        app.use(bodyParser.json());
        app.use(cookieParser());

        database.Start();
        router.getRoutes(app);

        app.listen(port);
        console.log('RESTful API server started on: ' + port);
    }

    return {
        Start
    }
}

module.exports = App;