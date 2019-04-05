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
-- Table structure for table `facttable`
--

DROP TABLE IF EXISTS `facttable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facttable` (
  `jobid` int(11) NOT NULL,
  `ct_id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `Fname` varchar(45) NOT NULL,
  `Lname` varchar(45) NOT NULL,
  `emailid` varchar(45) NOT NULL,
  `stafftype` varchar(45) NOT NULL,
  `ct_name` varchar(45) NOT NULL,
  `ct_add` varchar(45) NOT NULL,
  `ct_branch` varchar(45) NOT NULL,
  `ct_pin` varchar(45) NOT NULL,
  `ct_start_date` date NOT NULL,
  `ct_end_date` date NOT NULL,
  `user_start_date` date NOT NULL,
  `user_end_date` date NOT NULL,
  `job_flag` char(1) NOT NULL,
  `ct_flag` char(1) NOT NULL,
  `user_flag` char(1) NOT NULL,
  `timestamp` datetime NOT NULL,
  KEY `ct_id_idx` (`ct_id`),
  KEY `userid_idx` (`userid`),
  KEY `composite` (`jobid`,`userid`,`ct_id`),
  CONSTRAINT `ct_id` FOREIGN KEY (`ct_id`) REFERENCES `client` (`ct_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `jobid` FOREIGN KEY (`jobid`) REFERENCES `jobs` (`jobid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facttable`
--

LOCK TABLES `facttable` WRITE;
/*!40000 ALTER TABLE `facttable` DISABLE KEYS */;
/*!40000 ALTER TABLE `facttable` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-05  6:16:50
