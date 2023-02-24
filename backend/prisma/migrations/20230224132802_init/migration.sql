-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `management` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Drivers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `licence` VARCHAR(191) NOT NULL,
    `availability` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Drivers_licence_key`(`licence`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fleet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `plate` VARCHAR(191) NOT NULL,
    `availability` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Maintenance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `checkin` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `checkout` DATETIME(3) NULL,
    `description` VARCHAR(191) NOT NULL,
    `cost` DOUBLE NOT NULL,
    `vehicle_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Operations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `departure` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `arrival` DATETIME(3) NULL,
    `description` VARCHAR(191) NOT NULL,
    `driver_id` INTEGER NOT NULL,
    `vehicle_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Maintenance` ADD CONSTRAINT `Maintenance_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `Fleet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operations` ADD CONSTRAINT `Operations_driver_id_fkey` FOREIGN KEY (`driver_id`) REFERENCES `Drivers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operations` ADD CONSTRAINT `Operations_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `Fleet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
