-- MySQL dump 10.13  Distrib 5.6.23, for Win64 (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	5.6.24-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `officeaddress`
--

DROP TABLE IF EXISTS `officeaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `officeaddress` (
  `Street_No_Name` varchar(45) NOT NULL,
  `City_PinCode` varchar(45) NOT NULL,
  `Tel_No` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `Company_Reg_No` varchar(45) NOT NULL,
  `VAT_Reg_No` varchar(45) NOT NULL,
  `Payment_Terms` varchar(255) NOT NULL,
  `Terms` varchar(45) NOT NULL,
  `Website` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `officeaddress`
--

LOCK TABLES `officeaddress` WRITE;
/*!40000 ALTER TABLE `officeaddress` DISABLE KEYS */;
INSERT INTO `officeaddress` VALUES ('49, Edinburgh Avenue','Sawston, CB22 3DW','Tel : 9945215941','accounts@cambridgecareservices.co.uk','Company Reg. No. 09665143','VAT Reg No: GB 297 8055 50','We request you to pay Total Balance Due amount within 30 days from the issue date of this invoice.','TERMS: 30 DAYS','www.cambridgecareservices.co.uk');
/*!40000 ALTER TABLE `officeaddress` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-15  6:44:59
