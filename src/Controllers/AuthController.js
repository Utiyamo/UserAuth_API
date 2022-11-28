const jwt = require('jsonwebtoken');

const jwtSchema = require('../Model/JwtConfiguration');

function AuthController(){
    function Auth(req, res, cb){
        const secret = process.env.Jtw || jwtSchema.findOne({_id: 000001});
        const tkn = req.body.token;
        if(tkn){
            const decode = jwt.verify(token, secret.key, {
                algorithms: 'HS256'
            });

            res.json({
                login: true,
                data: decode
            });
            return cb();
        } else {
            res.json({
                login: false,
                data: 'error'
            });
            return cb();
        }
    }

    function ValidatToken(tkn){
        const secret = process.env.Jtw || jwtSchema.findOne({_id: 000001});
        if(tkn){
            try{
                const decode = jwt.verify(tkn, secret.key, {
                    algorithms: 'HS256'
                });
                
                return {
                    autorizated: true,
                    payload: decode,
                    type: 200
                };
            } catch (e){
                if(e instanceof jwt.JsonWebTokenError)
                    return {
                        autorizated: false,
                        payload: {},
                        type: 401
                    }

                return {
                    autorizated: false,
                    payload: {},
                    type: 400
                }
            }
            
        }
        else{
            return { error: 'Impossible to verify!' };
        }
    }

    function CreateToken(user){
        const secret = process.env.jwtSchema || jwtSchema.findOne({_id: 000001});
        const tkn = jwt.sign(user, secret.key, {
            algorithm: 'HS256',
            expiresIn: secret.expiresTime
        });

        return tkn;
    }

    function GetExpiredTimer(){
        const secret = process.env.Jtw || jwtSchema.findOne({_id: 000001});

        return (secret.expiresTime * 1000);
    }

    return {
        Auth,
        CreateToken,
        ValidatToken,
        GetExpiredTimer
    }
}

module.exports = AuthController;