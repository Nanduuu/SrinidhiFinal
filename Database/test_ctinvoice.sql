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
-- Table structure for table `ctinvoice`
--

DROP TABLE IF EXISTS `ctinvoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ctinvoice` (
  `staff_type` varchar(255) DEFAULT NULL,
  `Long_day` decimal(10,2) DEFAULT NULL,
  `Early` decimal(10,2) DEFAULT NULL,
  `Late` decimal(10,2) DEFAULT NULL,
  `Night` decimal(10,2) DEFAULT NULL,
  `Saturday` decimal(10,2) DEFAULT NULL,
  `Sunday` decimal(10,2) DEFAULT NULL,
  `Sleep_night` decimal(10,2) DEFAULT NULL,
  `Bank_holiday` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ctinvoice`
--

LOCK TABLES `ctinvoice` WRITE;
/*!40000 ALTER TABLE `ctinvoice` DISABLE KEYS */;
INSERT INTO `ctinvoice` VALUES ('Doctor',20.00,10.00,10.00,10.00,45.33,20.00,10.00,10.00),('Nurse',56.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00),('Health Care assistant (HCA)',10.00,10.00,10.00,22.50,10.00,10.00,10.00,10.00),('Domestic worker',10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00),('Domestic assistant',10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00),('Domiciliary carer',10.00,10.00,10.00,10.00,10.00,10.00,10.00,10.00);
/*!40000 ALTER TABLE `ctinvoice` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-13 12:47:06
