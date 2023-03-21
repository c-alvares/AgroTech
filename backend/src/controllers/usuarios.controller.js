const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const con = require("./agrotech.dao");

const bcrypt = require('bcrypt'); // require bcrypt
const saltRounds = 10; //  Data processing speed

const prisma = new PrismaClient();

const loginVariable = (model) => {
    return `SELECT * FROM user WHERE user_name = '${model.user_name}' AND senha = '${model.senha}'`;
}

const test = (req, res) => {
    con.query(loginVariable(req.body), (err, user) =>{
        if (err == null) {
            console.log("teste")
        }else {
            res.status(404).json(err).end();        
        }
    }); 
   
}

const encryptedLogin = async (req, res) => {
// https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/

    let pw = req.body.password;

    const hasAccess = (result) => {
        if(result) {
            console.log("Access Granted!");
        }
        else {
          // insert access denied code here
          console.log("Access Denied!");
        }
      }

    const user = await prisma.Users.findMany({
        where: {
            // username: req.body.username
            AND: [
                { username: req.body.username },
                { password: req.body.password }
            ]
        },
        select: {
            id: true,
            name: true,
            password: true,
            username: true,
            management: true
        }
        
    });

    if(res.status == 200) {
        let hash = res.rows[0].password;
        bcrypt.compare(pw, hash, function(err, result) {
            hasAccess(result);
        })
    }else {
        res.status(404).end();
    };

    res.status(200).json(user).end();

    // bcrypt.compare(user[0].password, hash, function(errCrypto, result) {  // Compare
        // console.log(user[0].password, hash, result)
        // if passwords match
        // if (result) {
            //   console.log("It matches!")
            //   jwt.sign(user[0], process.env.KEY, { expiresIn: '30m' }, function (err, token) {
            //       console.log(token);
            //       if (err == null) {
            //           user[0]["token"] = token;
            //           res.status(200).json(user[0]).end();
            //       }else {
            //           res.status(401).json(err).end();
            //       }
            //   });
        // }
        // if passwords do not match
        // else {
            //   console.log("Invalid password!");
            //   res.status(401).json(err).end();
        // }
    // });
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

    if(user. length > 0) {
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