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
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `jobid` int(11) NOT NULL,
  `worker` varchar(45) NOT NULL,
  `client` varchar(45) NOT NULL,
  `date` timestamp NULL DEFAULT NULL,
  `shift_id` int(11) DEFAULT NULL,
  `count` int(10) NOT NULL,
  `filled` int(10) NOT NULL DEFAULT '0',
  `active` char(1) DEFAULT 'Y',
  `start_time` timestamp NULL DEFAULT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `shift_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`jobid`),
  UNIQUE KEY `jobid_UNIQUE` (`jobid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (22,'Doctor','Narayana','2019-04-04 07:03:29',3,1,0,'Y','2019-04-04 07:03:29','2019-04-04 07:03:29','Long Day'),(23,'Doctor','Govt GBD ','2019-04-10 15:31:27',17,1,1,'Y','2019-04-10 10:00:00','2019-04-10 12:00:00','Early'),(24,'Doctor','Narayana','2019-04-10 03:12:20',3,1,0,'Y','2019-04-10 09:00:00','2019-04-10 17:00:00','Long Day'),(25,'Doctor','Narayana','2019-04-11 05:39:33',3,2,2,'Y','2019-04-11 09:00:00','2019-04-11 17:00:00','Long Day'),(26,'Doctor','Narayana','2019-04-16 02:40:40',18,2,2,'Y','2019-04-16 10:00:00','2019-04-16 17:00:00','Long Day'),(27,'Doctor','StJohn','2019-04-16 02:44:07',19,1,1,'Y','2019-04-16 09:00:00','2019-04-16 16:00:00','Long Day'),(28,'Doctor','Narayana','2019-04-25 03:07:25',18,1,0,'Y','2019-04-25 10:00:00','2019-04-25 17:00:00','Long Day'),(29,'Doctor','Narayana','2019-04-25 03:08:17',18,1,0,'Y','2019-04-25 10:00:00','2019-04-25 17:00:00','Long Day'),(30,'Doctor','Narayana','2019-04-26 03:10:51',18,1,0,'Y','2019-04-26 10:00:00','2019-04-26 17:00:00','Long Day'),(31,'Doctor','StJohn','2019-04-25 03:12:53',19,2,0,'Y','2019-04-25 09:00:00','2019-04-25 16:00:00','Long Day'),(32,'Doctor','Narayana','2019-04-25 03:15:38',18,1,0,'Y','2019-04-25 10:00:00','2019-04-25 17:00:00','Long Day'),(33,'Nurse','StJohn','2019-04-26 14:55:09',19,12,0,'Y','2019-04-26 09:00:00','2019-04-26 16:00:00','Long Day');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-26  3:56:14
