const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    let driver = await prisma.Drivers.create({
        data: req.body
    });
    
    res.status(201).json(driver).end();
}

const read = async (req, res) => {
    let drivers = await prisma.Drivers.findMany();

    res.status(200).json(drivers).end();
};

module.exports = {
    create,
    read
}