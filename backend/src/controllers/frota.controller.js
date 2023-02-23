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


const readOne = async (req, res) => {
    let vehicle = await prisma.Fleet.findUnique({
        where: {
            id: Number(req.params.id) 
        },
    });
    res.status(200).json(vehicle).end();
};


const update = async (req, res) => {
    let { type } = req.body;
    let vehicle = await prisma.Fleet.update({
        where: {
            id: Number(req.params.id) 
        },
        data: {
            type,
        }
    });

    res.status(200).json(vehicle).end();
}


const updateStatus = async (req, res) => {
    let { availability } = req.body;
    let vehicle = await prisma.Fleet.update({
        where: {
            id: Number(req.params.id) 
        },
        data: {
            availability
        }
    });

    res.status(200).json(vehicle).end();
}


const remove = async (req, res) => {
    let vehicle = await prisma.Fleet.delete({
        where: {
            id: Number(req.params.id)
        }
    });

    res.status(200).json(vehicle).end();
}


module.exports = {
    create,
    read,
    readOne,
    update,
    updateStatus,
    remove
}