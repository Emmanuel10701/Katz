-- CreateTable
CREATE TABLE `Assignment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `className` VARCHAR(191) NOT NULL,
    `teacher` VARCHAR(191) NOT NULL,
    `dueDate` DATETIME(3) NOT NULL,
    `dateAssigned` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `instructions` VARCHAR(191) NULL,
    `assignmentFiles` JSON NOT NULL,
    `attachments` JSON NOT NULL,
    `priority` VARCHAR(191) NOT NULL,
    `estimatedTime` VARCHAR(191) NULL,
    `additionalWork` VARCHAR(191) NULL,
    `teacherRemarks` VARCHAR(191) NULL,
    `feedback` VARCHAR(191) NULL,
    `learningObjectives` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
