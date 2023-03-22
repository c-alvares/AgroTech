const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const bcrypt = require('bcrypt'); // require bcrypt
const saltRounds = 10; //  Data processing speed

const prisma = new PrismaClient();

const encryptedLogin = async (req, res) => {
// https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/
    let pw = req.body.password;

    const hasAccess = (result, user, res) => {
        if(result) {
            // console.log("Access Granted!");
            jwt.sign(user, process.env.KEY, { expiresIn: '30m' }, function (err, token) {
                if (err == null) {
                    user["token"] = token;
                    let userFormated = {
                        'id': user.id,
                        'name': user.name,
                        'username': user.username,
                        'management': user.management,
                        'token': user.token
                    }
                    res.status(200).json(userFormated).end();
                }else {
                    res.status(401).json(err).end();
                }
            });
        }
        else {
            // console.log("Access Denied!");
            res.status(401).end();
        }
    }

    const user = await prisma.Users.findUnique({
        where: {
            username: req.body.username
        }
    });

    if(user != null) {
        let hash = user.password;
        bcrypt.compare(pw, hash, function(err, result) {
            hasAccess(result, user, res);
        })
    }else {
        res.status(404).end();
    };
}


const creatEncrypted = async (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, async function(errCrypto, hash) {
        if(errCrypto == null) {
            req.body.password = hash
            let user = await prisma.Users.create({
                data: req.body
            });
            res.status(201).json(user).end();
        }
    });
}


const login = async (req, res) => {

    const user = await prisma.Users.findMany({
        where: {
            AND: [
                { username: req.body.username },
                { password: req.body.password }
            ]
        },
        select: {
            id: true,
            name: true,
            username: true,
            management: true
        }
    });

    if(user.length > 0) {
        jwt.sign(user[0], process.env.KEY, { expiresIn: '30m' }, function (err, token) {
            // console.log(token);
            if (err == null) {
                user[0]["token"] = token;
                res.status(200).json(user[0]).end();
            }else {
                res.status(401).json(err).end();
            }
        });
    }else {
        res.status(404).end();
    }
}


const create = async (req, res) => {
    let user = await prisma.Users.create({
        data: req.body
    });

    res.status(201).json(user).end();
}


const read = async (req, res) => {
    let users = await prisma.Users.findMany();

    res.status(200).json(users).end();
}


const readOne = async (req, res) => {
    let users = await prisma.Users.findUnique({
        where: {
            id: Number(req.params.id) 
        },
    });
    res.status(200).json(users).end();
}


const update = async (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, async (errCrypto, hash) => {
        if(errCrypto == null) {
            req.body.password = hash

            let { username, password } = req.body;
        
            let users = await prisma.Users.update({
                where: {
                    id: Number(req.params.id)
                },
                data: {
                    username,
                    password
                }
            });
            res.status(200).json(users).end();
        }else { throw errCrypto }
    });
}


const updateLevel = async (req, res) => {
    let { management } = req.body;

    let users = await prisma.Users.update({
        where: {
            id: Number(req.params.id) 
        },
        data: {
            management
        }
    });

    res.status(200).json(users).end();
}


const remove = async (req, res) => {
    let users = await prisma.Users.delete({
        where: {
            id: Number(req.params.id)
        }
    });

    res.status(200).json(users).end();
}

module.exports = {
    login,
    encryptedLogin,
    create,
    creatEncrypted,
    read,
    readOne,
    update,
    updateLevel,
    remove
}