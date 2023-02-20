-- AlterTable
ALTER TABLE `drivers` MODIFY `availability` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `fleet` MODIFY `availability` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `users` MODIFY `management` BOOLEAN NOT NULL DEFAULT false;
