'use Strict' 

const userSchema = require('../Model/user');
const authController = require('./AuthController');

function UserController(){
    const auth = authController();

    function Login(req, res, cb){
        const usr = {};
        usr.user = req.body.username;
        usr.psw = req.body.password;

        const token = req.cookie.token;
        try{

            if(token){
                const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
                if((auth.ValidatToken(token).exp - nowUnixSeconds) > 30){
                    res.status(400);
                    res.send({ message: 'Token is still valid'});
                    return cb();
                }
                else{
                    const newToken = auth.CreateToken(auth.ValidatToken(token).payload);
                    res.status(200);
                    res.cookie("token", newToken, { maxAge: auth.GetExpiredTimer() });
                    return cb();
                }
            }
            else{
                const user = userSchema.findOne({user: usr.user, pwd: usr.psw});
                if(user){
                    const tkn = auth.CreateToken(user);
                    res.status(200);
                    res.cookie("token", tkn, { maxAge: auth.GetExpiredTimer() });
                    return cb();
                }
            }
        } catch(error){
            res.status(500);
            res.send(error);
            return cb();
        }
    }

    function GetUser(req, res, cb){
        const token = req.cookie.token;

        if(!token){
            return res.status(401).end();
        }

        var payload = auth.ValidatToken(token);

        if(payload?.autorizated){
            const user = userSchema.findOne({user: req.body.username});
            if(user){
                res.status(200);
                res.json(user);
                return cb();
            }
            else{
                res.status(404);
                res.send({});
                return cb();
            }
        } else
            return res.status(payload?.type).end();
    }

    function CreateUser(req, res, cb){
        const token = req.cookie.token;

        if(!token)
            return res.status(401).end();

        var payload = auth.ValidatToken(token);

        if(payload?.autorizated){
            const user = userSchema.findOne({user: req.body.user});
            if(user){
                res.status(400);
                res.send({ message: 'User arready exists'});
                return cb();
            }
            else{
                var newUser = new userSchema(req.body);
                newUser.save((err, obj) => {
                    if(err){
                        res.status(500);
                        res.send(err);
                        return cb();
                    }

                    res.json(obj);
                });
            }
        }
        else{
            return res.status(payload?.type).end();
        }
    }

    function UpdateUser(req, res, cb){
        const token = req.cookie.token;

        if(!token)
            return res.status(401).end();

        var payload = auth.ValidatToken(token);

        if(payload?.autorizated){
            const user = userSchema.findOneAndUpdate({user: req.body.user}, req.body, { new: true, returnDocument: true });

            if(user){
                res.status(200);
                res.json(user);
                return cb();
            }
            else
                return res.status(404).end();
        }
        else
            return res.status(payload?.type).end();
    }

    return {
        Login,
        GetUser,
        CreateUser,
        UpdateUser
    }
}

module.exports = UserController;