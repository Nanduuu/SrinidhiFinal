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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `Emailid` varchar(45) NOT NULL,
  `Fname` varchar(45) NOT NULL,
  `Lname` varchar(45) DEFAULT NULL,
  `Tel` varchar(20) NOT NULL,
  `Pword` char(250) NOT NULL,
  `role` varchar(45) NOT NULL,
  `userid` int(11) NOT NULL,
  `stafftype` varchar(45) NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `end_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `Emailid_UNIQUE` (`Emailid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('nandakumarvn01@gmail.com','Nanda','Kumar','9945215941','912ec803b2ce49e4a541068d495ab570','staff',1,'Doctor','2019-04-07 16:29:56','2038-01-19 00:00:00'),('admin@gmail.com','Admin','Cambridge Care Services','00000000','21232f297a57a5a743894a0e4a801fc3','admin',2,'','2019-04-15 03:17:51','2038-01-19 00:00:00'),('nanda@gmail.com','giri','MN','9945215941','912ec803b2ce49e4a541068d495ab570','staff',3,'Doctor','2019-04-07 16:29:52','2038-01-19 00:00:00'),('hareesh@gmail.com','Hareesh','Ram','9945215941','912ec803b2ce49e4a541068d495ab570','staff',9,'Domestic worker','2019-04-07 16:29:53','2038-01-19 00:00:00'),('kumar@gmail.com','Kumar','Ram','9945215941','912ec803b2ce49e4a541068d495ab570','staff',12,'Doctor','2019-04-14 09:16:01','2038-01-19 00:00:00'),('hamsa@uk.group.com','Kumar','Hamsa','9945215941','912ec803b2ce49e4a541068d495ab570','staff',13,'Doctor','2019-04-14 08:30:10','2019-04-14 08:30:10'),('hamsa@uk.group.in','Kumar','Hamsa','9945215941','912ec803b2ce49e4a541068d495ab570','staff',14,'Doctor','2019-04-14 08:30:30','2019-04-14 08:30:30');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-26  3:56:15
