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


module.exports = {
    create,
    read,
    // readOne,
    // readOngoing,
    // update,
    // updateStatus,
    // remove
}