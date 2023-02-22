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

    console.log(service, vehicle);

    res.status(201).json(service).end();
}


const read = async (req, res) => {
    let service = await prisma.Maintenance.findMany();

    res.status(200).json(service).end();
}

module.exports = {
    create,
    read
}

