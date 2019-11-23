-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`devices_ip`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`devices_ip` (
  `id` INT NOT NULL,
  `ip` VARCHAR(16) NULL,
  `port` VARCHAR(6) NULL,
  `descripcion` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`procesamientos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`procesamientos` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `file_path` VARCHAR(200) NOT NULL,
  `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `placa` VARCHAR(6) NULL DEFAULT NULL,
  `devices_ip_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_procesamientos_devices_ip1_idx` (`devices_ip_id` ASC),
  CONSTRAINT `fk_procesamientos_devices_ip1`
    FOREIGN KEY (`devices_ip_id`)
    REFERENCES `mydb`.`devices_ip` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `mydb`.`bahias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`bahias` (
  `id` VARCHAR(5) NOT NULL,
  `devices_ip_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_bahias_devices_ip1_idx` (`devices_ip_id` ASC),
  CONSTRAINT `fk_bahias_devices_ip1`
    FOREIGN KEY (`devices_ip_id`)
    REFERENCES `mydb`.`devices_ip` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`vehiculo_registros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`vehiculo_registros` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `fecha_entrada` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_salida` DATETIME NULL DEFAULT NULL,
  `bahia` VARCHAR(5) NOT NULL,
  `imagePath` VARCHAR(255) NULL,
  `placa` VARCHAR(6) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_vehiculo_registros_bahias1_idx` (`bahia` ASC),
  CONSTRAINT `fk_vehiculo_registros_bahias1`
    FOREIGN KEY (`bahia`)
    REFERENCES `mydb`.`bahias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`factura` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `idUser` VARCHAR(30) NULL DEFAULT NULL,
  `placaVehiculo` VARCHAR(7) NULL DEFAULT NULL,
  `salida` DATE NULL DEFAULT NULL,
  `precio` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`usuario` (
  `idUser` INT(11) NOT NULL,
  `nombre` VARCHAR(20) NULL DEFAULT NULL,
  `correo` VARCHAR(50) NULL DEFAULT NULL,
  `telefono` VARCHAR(30) NULL DEFAULT NULL,
  `tipoUser` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydb`.`vehiculos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`vehiculos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `placa` VARCHAR(7) NULL DEFAULT NULL,
  `ingreso` DATE NULL DEFAULT NULL,
  `idOwner` VARCHAR(30) NULL DEFAULT NULL,
  `tipoVehiculo` VARCHAR(30) NULL DEFAULT NULL,
  `image` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
