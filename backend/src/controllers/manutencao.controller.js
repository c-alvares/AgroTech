const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    let { vehicle_id, description } = req.body;

    const [service, vehicle] = await prisma.$transaction([
        prisma.Maintenance.create({
            data: {
                description : description,
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
    let service = await prisma.Maintenance.findMany();

    res.status(200).json(service).end();
}


const readOne = async (req, res) => {
    let service = await prisma.Maintenance.findUnique({
        where: {
            id: Number(req.params.id) 
        },
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
    let { description } = req.body;
    let service = await prisma.Maintenance.update({
        where: {
            id: Number(req.params.id) 
        },
        data: {
            description,
        }
    });

    res.status(200).json(service).end();
}


const updateStatus = async (req, res) => {
    let { vehicle_id } = req.body;

    const [service, vehicle] = await prisma.$transaction([
        prisma.Maintenance.update({
            where: {
                id: Number(req.params.id) 
            },
            data: {
                checkout: new Date(),
            }
        }),
        prisma.Fleet.update({
            where: {
                id: vehicle_id
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
    let service = await prisma.Maintenance.delete({
        where: {
            id: Number(req.params.id)
        }
    });

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

