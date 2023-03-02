const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const bcrypt = require('bcrypt'); // require bcrypt
const saltRounds = 10; //  Data processing speed

const prisma = new PrismaClient();


const login = async (req, res) => {


    const user = await prisma.Users.findMany({
        where: {
            AND: [
                { username: req.body.username },
                {  password: req.body.password }
            ]
        },
        select: {
            id: true,
            name: true,
            username: true,
            password: true,
            management: true
        }
    });

    if(user. length > 0) {
        jwt.sign(user[0], process.env.KEY, { expiresIn: '30m' }, function (err, token) {
            console.log(token);
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
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if(err == null) {
            bcrypt.hash(req.body.password, salt, async function (errCrypto, hash) {
                if(errCrypto == null) {
                    req.body.password = hash;
                    let user = await prisma.Users.create({
                        data: req.body
                    });
                    res.status(201).json(user).end();
                }else {
                    res.status(500).json(errCrypto).end();
                }
            })
        }else {
            res.status(500).json(err).end();
        }
    })
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
    let { username, password } = req.body;

    let users = await prisma.Users.update({
        where: {
            id: Number(req.params.id) 
        },
        data: {
            username, 
            password,
        }
    });

    res.status(200).json(users).end();
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
    let user = await prisma.Users.delete({
        where: {
            id: Number(req.params.id)
        }
    });

    res.status(200).json(user).end();
}

module.exports = {
    login,
    create,
    read,
    readOne,
    update,
    updateLevel,
    remove
}