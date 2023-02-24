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


const readOne = async (req, res) => {
    let driver = await prisma.Drivers.findUnique({
        where: {
            id: Number(req.params.id) 
        },
    });
    res.status(200).json(driver).end();
};

const readByAvailability = async (req, res) => {
    let driver = await prisma.Drivers.findMany({
        where: {
            availability: true
        },
    });
    res.status(200).json(driver).end();
}

const update = async (req, res) => {
    let { name, licence } = req.body;

    let driver = await prisma.Drivers.update({
        where: {
            id: Number(req.params.id) 
        },
        data: {
            name, 
            licence,
        }
    });

    res.status(200).json(driver).end();
}


const updateStatus = async (req, res) => {
    let { availability } = req.body;
    let driver = await prisma.Drivers.update({
        where: {
            id: Number(req.params.id) 
        },
        data: {
            availability
        }
    });

    res.status(200).json(driver).end();
}


const remove = async (req, res) => {
    let driver = await prisma.Drivers.delete({
        where: {
            id: Number(req.params.id)
        }
    });

    res.status(200).json(driver).end();
}

module.exports = {
    create,
    read,
    readOne,
    readByAvailability,
    update,
    updateStatus,
    remove
}