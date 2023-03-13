const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// const bcrypt = require('bcrypt'); // require bcrypt
// const saltRounds = 10; //  Data processing speed

const prisma = new PrismaClient();

// var password = "teste";  // Original Password
// var password2 = "$2b$10$9S0D1Qq0Cbc8EQbhK5LVT.cGFk.Zhujh8wbzi91Lb9qMrWHaC.NGi";

// bcrypt.hash(password, saltRounds, function(err, hash) {
//     console.log(password, hash) // Salt + Hash

//   bcrypt.compare(password2, hash, function(errCrypto, result) {  // Compare
//     console.log(password2, hash, result)
//     // if passwords match
//     if (result) {
//           console.log("It matches!")
//     }
//     // if passwords do not match
//     else {
//           console.log("Invalid password!");
//     }
//   });
// });


// const login = async (req, res) => {

//     const user = await prisma.Users.findMany({
//         where: {
//             AND: [
//                 { username: req.body.username },
//             ]
//         },
//         select: {
//             id: true,
//             name: true,
//             username: true,
//             password: true,
//             management: true
//         }
//     });
  
// console.log(req.body.password)
//     bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
//         console.log(hash)
        
//         bcrypt.compare(user[0].password, hash, function(errCrypto, result) {  // Compare
//             console.log(user[0].password, hash, result)
//             // if passwords match
//             if (result) {
//                   console.log("It matches!")
//                   jwt.sign(user[0], process.env.KEY, { expiresIn: '30m' }, function (err, token) {
//                       console.log(token);
//                       if (err == null) {
//                           user[0]["token"] = token;
//                           res.status(200).json(user[0]).end();
//                       }else {
//                           res.status(401).json(err).end();
//                       }
//                   });
//             }
//             // if passwords do not match
//             else {
//                   console.log("Invalid password!");
//                   res.status(401).json(err).end();
//             }
//           });
          
//     })
// }

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