'use Strict' 

function Routes(){
    function getRoutes(app){
        app.get('/', (req, res, next) => {
            res.json({message: 'Hello World'});
            next();
        });

    }

    return {
        getRoutes
    };
}

module.exports = Routes;