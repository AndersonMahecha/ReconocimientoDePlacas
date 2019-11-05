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
-- Table `mydb`.`vehiculos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`vehiculos` (
  `idvehiculo` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `placa` VARCHAR(6) NULL,
  PRIMARY KEY (`idvehiculo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`vehiculo_registros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`vehiculo_registros` (
  `idvehiculo_registro` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `fecha_entrada` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_salida` DATETIME NULL,
  `file_path` VARCHAR(200) NULL,
  `park_location` VARCHAR(45) NULL,
  `vehiculo_idvehiculo` BIGINT(20) NOT NULL,
  PRIMARY KEY (`idvehiculo_registro`, `vehiculo_idvehiculo`),
  INDEX `fk_vehiculo_registro_vehiculo_idx` (`vehiculo_idvehiculo` ASC),
  CONSTRAINT `fk_vehiculo_registro_vehiculo`
    FOREIGN KEY (`vehiculo_idvehiculo`)
    REFERENCES `mydb`.`vehiculos` (`idvehiculo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`propietatios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`propietatios` (
  `idpropietatios` BIGINT(20) NOT NULL,
  `documento` VARCHAR(12) NULL,
  `nombre` VARCHAR(60) NULL,
  `telefono` VARCHAR(30) NULL,
  `direccion` VARCHAR(45) NULL,
  PRIMARY KEY (`idpropietatios`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`propietatios_has_vehiculos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`propietatios_has_vehiculos` (
  `propietatios_idpropietatios` BIGINT(20) NOT NULL,
  `vehiculos_idvehiculo` BIGINT(20) NOT NULL,
  PRIMARY KEY (`propietatios_idpropietatios`, `vehiculos_idvehiculo`),
  INDEX `fk_propietatios_has_vehiculos_vehiculos1_idx` (`vehiculos_idvehiculo` ASC),
  INDEX `fk_propietatios_has_vehiculos_propietatios1_idx` (`propietatios_idpropietatios` ASC),
  CONSTRAINT `fk_propietatios_has_vehiculos_propietatios1`
    FOREIGN KEY (`propietatios_idpropietatios`)
    REFERENCES `mydb`.`propietatios` (`idpropietatios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_propietatios_has_vehiculos_vehiculos1`
    FOREIGN KEY (`vehiculos_idvehiculo`)
    REFERENCES `mydb`.`vehiculos` (`idvehiculo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
