const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const bcrypt = require('bcrypt');

const saltRounds = 10;
var password = "Fkdj^45ci@Jad";
var password2 = "djlfhjd(456";

bcrypt.genSalt(saltRounds, function(err, salt) {
    // returns salt
    bcrypt.hash(password, salt, function(err, hash) {
        // returns hash
        console.log(hash);
        // Store hash in database here
        bcrypt.compare(password2, hash, function(err, result) {  // Compare
            // if passwords match
            if (result) {
                  console.log("It matches!")
            }
            // if passwords do not match
            else {
                  console.log("Invalid password!");
            }
          });
    });
});


// https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/
// https://www.npmjs.com/package/bcryptjs
  
// const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync("B4c0/\/", salt);

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