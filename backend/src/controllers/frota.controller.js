const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    let vehicle = await prisma.Fleet.create({
        data: req.body
    });

    res.status(201).json(vehicle).end();
}

const read = async (req, res) => {
    let fleet = await prisma.Fleet.findMany();

    res.status(200).json(fleet).end();
}

module.exports = {
    create,
    read
}