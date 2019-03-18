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
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `Emailid_UNIQUE` (`Emailid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('nandakumarvn01@gmail.com','Nanda','Kumar','9945215941','912ec803b2ce49e4a541068d495ab570','staff',1,'Doctor','0000-00-00','0000-00-00'),('ajaymr2345@gmail.com','Ajay','Kumar','9945215941','fd2cc6c54239c40495a0d3a93b6380eb','admin',2,'','0000-00-00','0000-00-00'),('bharathbabukm93@gmail.com','Bharath','Babu','9945215941','962012d09b8170d912f0669f6d7d9d07','staff',3,'','0000-00-00','0000-00-00'),('bharathbabukm931@gmail.com','Bharath','Babu','9945215941','962012d09b8170d912f0669f6d7d9d07','staff',4,'','0000-00-00','0000-00-00'),('nandakumarvn02@gmail.com','Bharath','Babu','9945215941','962012d09b8170d912f0669f6d7d9d07','staff',5,'','0000-00-00','0000-00-00'),('bharathbabukm94@gmail.com','Bharath','Babu','9945215941','202cb962ac59075b964b07152d234b70','staff',6,'','0000-00-00','0000-00-00'),('bharathbabukm95@gmail.com','Bharath','Babu','9945215941','962012d09b8170d912f0669f6d7d9d07','staff',7,'','0000-00-00','0000-00-00'),('bharathbabukm96@gmail.com','Bharath','Babu','9945215941','962012d09b8170d912f0669f6d7d9d07','staff',8,'','0000-00-00','0000-00-00'),('hareesh@gmail.com','Hareesh','Ram','9945215941','912ec803b2ce49e4a541068d495ab570','staff',9,'Domestic worker','0000-00-00','0000-00-00'),('nandakumarvn03@gmail.com','Nanda','Kumar','9945215941','912ec803b2ce49e4a541068d495ab570','staff',10,'Doctor','0000-00-00','0000-00-00'),('nraghurao9@gmail.com','Raghu','Rao','9945215941','912ec803b2ce49e4a541068d495ab570','staff',11,'Doctor','0000-00-00','0000-00-00');
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

-- Dump completed on 2019-03-18 12:47:44
