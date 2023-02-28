const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    let { description, cost, vehicle_id } = req.body;

    const [service, vehicle] = await prisma.$transaction([
        prisma.Maintenance.create({
            data: {
                description : description,
                cost: cost,
                vehicle_id : vehicle_id
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

    // console.log(service, vehicle);

    res.status(201).json(service).end();
}


const read = async (req, res) => {
    let service = await prisma.Maintenance.findMany({
        select: {
            id: true,
            checkin: true,
            checkout: true,
            description: true,
            cost: true,
            vehicle: {
                select: {
                    id: true,
                    type: true,
                    plate: true
                }
            }
        }
    });
    
    res.status(200).json(service).end();
}


const readOne = async (req, res) => {
    let service = await prisma.Maintenance.findUnique({
        where: {
            id: Number(req.params.id) 
        },
        select: {
            id: true,
            checkin: true,
            checkout: true,
            description: true,
            cost: true,
            vehicle: {
                select: {
                    id: true,
                    type: true,
                    plate: true
                }
            }
        }
    });
    res.status(200).json(service).end();
}


const readOngoing = async (req, res) => {
    let service = await prisma.Maintenance.findMany({
        where: {
            checkout: null
        },
        select: {
            id: true,
            checkin: true,
            description: true,
            cost: true,

            vehicle: {
                select: {
                    id: true,
                    type: true,
                    plate: true
                }
            }
        }
    });
    res.status(200).json(service).end();
}


const update = async (req, res) => {
    let { description, cost } = req.body;
    let service = await prisma.Maintenance.update({
        where: {
            id: Number(req.params.id) 
        },
        data: {
            description,
            cost,
        }
    });

    res.status(200).json(service).end();
}


const updateStatus = async (req, res) => {

    const [service] = await prisma.$transaction([
        prisma.Maintenance.update({
            where: {
                id: Number(req.params.id) 
                // checkout: null -> retirar o params.id da manutenção e só passar o id do veículo
            },
            data: {
                checkout: new Date(),
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

    // console.log(service, vehicle);

    res.status(200).json(service).end();
}


const remove = async (req, res) => {
    const [service] = await prisma.$transaction([
        prisma.Maintenance.delete({
            where: {
                id: Number(req.params.id)
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

    res.status(200).json(service).end();
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

