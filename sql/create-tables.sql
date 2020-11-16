-- Script is used to create all tables

DROP TABLE IF EXISTS `PMSUsers`;
CREATE TABLE `PMSUsers` (
    `userId` INT AUTO_INCREMENT,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `departmentName` VARCHAR(255) NOT NULL,
    `userType` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`userId`)
);

DROP TABLE IF EXISTS `PMSTasks`;
CREATE TABLE `PMSTasks` (
    `taskId` INT AUTO_INCREMENT,
    `userId` INT NOT NULL,
    `taskName` VARCHAR(255) NOT NULL,
    `taskDueDate` DATE NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`taskId`),
    FOREIGN KEY (`userId`) REFERENCES `PMSUsers`(`userId`)
);
