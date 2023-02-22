const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    let gear = await prisma.Maintenance.create({
        data: req.body
    });

    res.status(201).json(gear).end();
}

const read = async (req, res) => {
    let gear = await prisma.Maintenance.findMany();

    res.status(200).json(gear).end();
}

module.exports = {
    create,
    read
}