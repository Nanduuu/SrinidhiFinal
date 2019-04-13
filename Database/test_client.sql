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
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `client` (
  `ct_name` varchar(50) NOT NULL,
  `ct_id` int(11) NOT NULL,
  `ct_street_number` varchar(255) NOT NULL,
  `ct_street_name` varchar(255) NOT NULL,
  `ct_city_name` varchar(255) NOT NULL,
  `ct_start_date` date NOT NULL,
  `ct_end_date` date NOT NULL,
  `ct_pincode` varchar(45) NOT NULL,
  PRIMARY KEY (`ct_id`),
  UNIQUE KEY `ct_name_UNIQUE` (`ct_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES ('Narayana',1,'56','Bannergatta Road','Bangalore','2019-02-10','9999-12-31','560029'),('StJohn',2,'30','Hosur Road','Bangalore-01','2019-02-10','9999-12-31','560085'),('Jayadeva',3,'119','Bannergatta Road','Bangalore','2019-02-10','9999-12-31','560030'),('Govt',4,'15','MG Road','Bangalore','2019-02-12','9999-12-31','560030'),('karnataka govt Hospital',5,'15','MG Road','Bangalore','2019-02-12','9999-12-31','560025'),('karnataka govt Hospital Hosur',6,'45','Hosur Road','Chikkaballapur','2019-02-12','9999-12-31','261458'),('Voyage',7,'56','Home','UK','2019-02-16','9999-12-31','ABC 124'),('Govt DN palya',8,'#36','Main Road','Chikkaballapur','2019-03-30','9999-12-31','560026'),('Govt GBD ',9,'10','Mian road','GBD','2019-04-07','9999-12-31','560026');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-13 12:47:07
