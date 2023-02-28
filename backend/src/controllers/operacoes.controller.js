const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    let { description, driver_id, vehicle_id } = req.body;

    const [ operation ] = await prisma.$transaction([
        prisma.Operations.create({
            data: {
                departure: new Date(),
                description: description,
                driver_id: driver_id,
                vehicle_id: vehicle_id,
            }
        }),
        prisma.Drivers.update({
            where: {
                id: driver_id
            },
            data : {
                availability: false
            }
        }),
        prisma.Fleet.update({
            where: {
                id: vehicle_id
            },
            data : {
                availability: false
            }
        })
    ]);

    res.status(201).json(operation).end();
}


const read = async (req, res) => {
    let operation = await prisma.Operations.findMany({
        select: {
            id: true,
            departure: true,
            arrival: true,
            description: true,
            driver: {
                select: {
                    id: true,
                    name: true,
                    licence: true,
                }
            },
            vehicle: {
                select: {
                    id: true,
                    type: true,
                    plate: true
                }
            }
        }
    });
    
    res.status(200).json(operation).end();
}


const readOne = async (req, res) => {
    let operation = await prisma.Operations.findUnique({
        where: {
            id: Number(req.params.id) 
        },
        select: {
            id: true,
            departure: true,
            arrival: true,
            description: true,
            driver: {
                select: {
                    id: true,
                    name: true,
                    licence: true,
                }
            },
            vehicle: {
                select: {
                    id: true,
                    type: true,
                    plate: true
                }
            }
        }
    });
    res.status(200).json(operation).end();
}


const readOngoing = async (req, res) => {
    let operation = await prisma.Operations.findMany({
        where: {
            arrival: null
        },
        select: {
            id: true,
            departure: true,
            description: true,
            driver: {
                select: {
                    id: true,
                    name: true,
                    licence: true,
                }
            },
            vehicle: {
                select: {
                    id: true,
                    type: true,
                    plate: true
                }
            }
        }
    });
    res.status(200).json(operation).end();
}


const update = async (req, res) => {
    
    let operation = await prisma.Operations.update({
        where: {
            id: Number(req.params.id) 
        },
        data: req.body,
    });

    res.status(200).json(operation).end();
}


const updateStatus = async (req, res) => {

    const [operation] = await prisma.$transaction([
        prisma.Operations.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                arrival: new Date(),
            }
        }),
        prisma.Drivers.update({
            where: {
                id: Number(req.params.driver_id)
            },
            data: {
                availability: true
            }
        }),
        prisma.Fleet.update({
            where: {
                id: Number(req.params.vehicle_id)
            },
            data: {
                availability: true
            }
        })
    ]);

    res.status(200).json(operation).end();
}


const remove = async (req, res) => {

    const [operation] = await prisma.$transaction([
        prisma.Operations.delete({
            where: {
                id: Number(req.params.id)
            }
        }),
        prisma.Drivers.update({
            where: {
                id: Number(req.params.driver_id)
            },
            data: {
                availability: true
            }
        }),
        prisma.Fleet.update({
            where: {
                id: Number(req.params.vehicle_id)
            },
            data: {
                availability: true
            }
        })
    ]);

    res.status(200).json(operation).end();
}

module.exports = {
    create,
    read,
    readOne,
    readOngoing,
    update,
    updateStatus,
    remove
}