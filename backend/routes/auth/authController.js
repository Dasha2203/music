const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')

const pool = require('../../mode');
const userSQL = require('../../models/user/userSQL');
const rolesSQL = require('../../models/roles/rolesSQL');
const TrackSQL = require('../../models/TrackSQL');
const favoritesSQL = require('../../models/favoritesSQL');
const {secret} = require('../../config/authConfig');


const generateAccessToken = (id, role) => {
    const payload = {id, role};
    return jwt.sign(payload, secret,{ expiresIn: "24h" });
}

class authController {
    async registration(req, res) {
        console.log('выполняем')
        console.log('req body', req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('errors', errors)
            return res.status(400).json({message: 'Ошибка при регистрации', errors})
        }
        console.log('req body', req.body)
        const {userName, email, password} = req.body;

        try {
            let user = await pool.query(userSQL.getUserLikeEmail, [email]);
            console.log('user email', user[0])
            if (user[0].length) {
                return res.status(400).json({type: 0, message: 'Введенная почта уже зарегистрирована'})
            }
        } catch (err) {
            console.log(err)
            return res.status(400).json({type: 0, message: 'Register error'});
        }


        let roleUser;
        try {
            let role = await pool.query(rolesSQL.getRoleByName, ['user'])
            console.log('res roles', res[0])
            if (role[0].length) {
                roleUser = role[0][0].id
            }
        } catch (err) {
            console.log('roles error');
            return res.status(400).json({type: 0, message: 'Register error'});
        }


        let hashPassword = bcrypt.hashSync(password, 6);
        let now = new Date();
        let utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

        // const user = new User(userName, hashPassword, email, roleUser, utcNow);
        const userData = [userName, email, hashPassword, utcNow, roleUser,]
        try {
            let newUser = await pool.query(userSQL.insert,userData);
            return  res.json({isCompleted: true})
            console.log('new create user', newUser);
        } catch(err) {
            console.log('createUser error')
        }
    }

    async login(req, res) {
        const {email, password} = req.body;

        console.log('login', req.body);
        let userDB;

        //check email user
        try {
            let user = await pool.query(userSQL.getUserLikeEmail, [email]);

            if (!user[0].length) {
                console.log('нет пользователя')
                return res.status(400).json({type: 0, message: 'Entered user is not registered'})
            }
            userDB = user[0][0];
        } catch (err) {
            console.log(err)
            res.status(400).json({type: 0, message: 'Incorrect data'});
        }

        //check password
        const validPassword = bcrypt.compareSync(password, userDB.password);

        if(!validPassword) {
            console.log('пароль ошибка')
            return res.status(400).json({type: 1, message: 'Incorrect password'})
        }

        const token = generateAccessToken(userDB.id, userDB['role_id']);
        return res.json(token);
    }

    async getUser(req, res) {

        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(403).json({message: "User is not authorized"});
            }
            const {id: idUser} = jwt.verify(token, secret);

            try {
                let user = await pool.query(userSQL.getUserById, [idUser]);

                if (!user[0].length) {
                    console.log('нет пользователя')
                    return res.status(400).json({type: 0, message: 'Entered user is not registered'})
                }
                // userDB = user[0][0];
                const {id, name, email, dateRegister, role_id} = user[0][0]

                return res.json({id, name, email, dateRegister, role: role_id});
            } catch (err) {
                console.log(err)
                res.status(400).json({type: 0, message: 'Incorrect data'});
            }
            // res.json('server work')
        } catch (e) {
            return res.status(400).json({type: 0, message: 'error get user'});
        }
    }

    async getFavorites(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "User is not authorized"});
            }

            const {id: idUser} = jwt.verify(token, secret);

            try {
                let resPool = await pool.query(favoritesSQL.queryAll, [idUser])
                console.log('get favorites', resPool[0]);

                return res.json({isCompleted: true, tracks: resPool[0].reverse()})
            } catch(err) {
                console.log('get favorite', err);
                return res.status(400).json({message: 'error add track to favorites'});
            }
        }
         catch(err) {
            console.log('get favorites', err);
            return res.status(400).json({message: 'error get track to favorites'});
        }
    }

    async removeTrackFavorites(req, res) {
        console.log(' like')
        try {
            const { id } = req.body;
            console.log('idTrack', id)
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "User is not authorized"});
            }

            const {id: idUser} = jwt.verify(token, secret);

            try {
                const resPool = await pool.query(favoritesSQL.deleteFavorites,[idUser, id]);

                console.log('res like', resPool[0])

                return res.json({isCompleted: true});
            } catch(err) {
                console.log('error')
                return res.status(400).json({message: 'error add track to favorites'});
            }

        } catch (err) {
            console.log('add favorities', err);
            res.status(400).json({message: 'error add track to favorites'});
        }
    }

    async addTrackFavorites(req, res) {
        console.log(' like')
        try {
            const { id } = req.body;
            console.log('idTrack', id)
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "User is not authorized"});
            }

            const {id: idUser} = jwt.verify(token, secret);

            try {
                const resPool = await pool.query(favoritesSQL.insert,[idUser, id]);

                console.log('res like', resPool[0])

                return res.json({isCompleted: true});
            } catch(err) {
                console.log('error')
                return res.status(400).json({message: 'error add track to favorites'});
            }

        } catch (err) {
            console.log('add favorities', err);
            res.status(400).json({message: 'error add track to favorites'});
        }
    }

    async setHistory(req,res) {
        try {
            const {id} = req.body
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "User is not authorized"});
            }
            const {id: idUser} = jwt.verify(token, secret);

            let now = new Date();
            let utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

            try {
                let resPool = await pool.query(TrackSQL.addHistory, [idUser, id, utcNow]);
                res.json({message: 'Get albums', isCompleted: true, albums: resPool[0]})
            } catch(err) {
                console.log('Get albums ',err)
                return res.status(400).json({message: 'get wasnt given albums'})
            }

        } catch (err) {
            console.log('set history', err)
            return res.status(400).json({message: 'set history'})
        }
    }

    async getHistory(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(403).json({message: "User is not authorized"});
            }
            const {id: idUser} = jwt.verify(token, secret);

            try {
                let resPool = await pool.query(TrackSQL.history,[idUser]);

                // if (!user[0].length) {
                //     console.log('нет пользователя')
                //     return res.status(400).json({type: 0, message: 'Entered user is not registered'})
                // }
                // userDB = user[0][0];
                // const {id, name, email, dateRegister, role} = user[0][0]

                return res.json({tracks: resPool[0].reverse()});
            } catch (err) {
                console.log(err)
                res.status(400).json({type: 0, message: 'Incorrect data'});
            }

            // res.json('server work')
        } catch (e) {
            return res.status(400).json({message: 'error get history'});
        }
    }

    async removeTrackFavorites(req, res) {
        try {
            const { id } = req.body;
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "User is not authorized"});
            }

            const {id: idUser} = jwt.verify(token, secret);

            try {
                const resPool = await pool.query(favoritesSQL.deleteFavorites,[idUser, id]);

                return res.json({isCompleted: true});
            } catch(err) {
                res.status(400).json({message: 'error add track to favorites'});
            }

        } catch (err) {
            console.log('add favorities', err);
            return res.status(400).json({message: 'error add track to favorites'});
        }
    }

    async editUser(req, res) {
        try {
            const {email, name} = req.body;
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "User is not authorized"});
            }
            const {id: idUser} = jwt.verify(token, secret);

            try {
                let user = await pool.query(userSQL.updateUser, [name, email, idUser]);
                res.json({message: 'Успешно', edit: true})
            } catch(err) {
                console.log('Ошибк изменения пользователя')
            }

        } catch (err) {
            console.log(err);
        }
    }

    async getUsers(req, res) {

    }
}

module.exports = new authController();