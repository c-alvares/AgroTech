const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    let user = await prisma.Users.create({
        data: req.body
    });
    
    res.status(201).json(user).end();
}

const read = async (req, res) => {
    let users = await prisma.Users.findMany();

    res.status(200).json(users).end();
};

const update = async (req, res) => {
    let { name, password } = req.body;
    let users = await prisma.Users.update({
        where: {
            name,
        },
        data: {
            password,
        }
    })
}

module.exports = {
    create,
    read,
    update,
}