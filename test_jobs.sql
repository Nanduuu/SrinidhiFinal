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
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `count` int(10) NOT NULL,
  `filled` int(10) NOT NULL DEFAULT '0',
  `active` char(1) NOT NULL,
  PRIMARY KEY (`jobid`),
  UNIQUE KEY `jobid_UNIQUE` (`jobid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,'Health Care assistant (HCA)','Appolo-2','2020-01-24','07:42:12','12:42:12',15,0,''),(2,'Nurse','Appolo 1','2019-01-29','09:24:19','19:24:19',5,0,''),(3,'Doctor','Appolo 1','2019-01-31','10:25:12','23:23:11',5,0,''),(4,'Doctor','BSK-MedSick','2019-01-30','09:46:15','17:46:15',10,0,''),(5,'Domestic worker','BSK-MedSick','2019-02-21','10:06:42','17:06:42',10,0,''),(6,'Doctor','Appolo-2','2019-02-01','07:53:35','08:53:35',1,0,''),(7,'Doctor','BSK-MedSick','2019-02-01','10:42:05','17:42:05',2,0,''),(8,'Doctor','BSK-MedSick','2019-02-01','11:42:05','14:42:05',3,0,''),(9,'Nurse','Appolo-2','2019-01-31','11:42:05','13:42:05',5,0,''),(10,'Doctor','Appolo-2','2019-01-31','11:48:14','15:48:14',4,0,''),(11,'Nurse','BSK-MedSick','2019-02-01','11:48:14','13:48:14',5,0,''),(12,'Doctor','StJohn-1','2019-02-01','11:51:19','15:51:19',5,0,''),(13,'Doctor','StJohn-1','2019-01-31','10:51:19','17:51:19',6,0,''),(14,'Doctor','StJohn-1','2019-02-02','10:51:19','17:51:19',7,0,''),(15,'Doctor','BSK-MedSick','2019-02-03','10:51:19','15:51:19',5,0,''),(16,'Doctor','BSK-MedSick','2019-02-03','11:03:44','17:03:44',4,0,''),(17,'Doctor','BSK-MedSick','2019-03-09','12:03:44','15:03:44',6,0,''),(18,'Doctor','Appolo-2','2019-02-01','11:13:10','16:13:10',7,0,''),(19,'Doctor','Appolo-2','2019-02-02','14:16:53','17:16:53',3,0,''),(20,'Doctor','Appolo-2','2019-02-02','12:16:53','17:16:53',12,0,''),(21,'Doctor','Appolo-2','2019-02-02','14:16:53','15:16:53',6,0,''),(22,'Doctor','BSK-MedSick','2019-02-02','12:16:53','16:16:53',18,0,''),(23,'Doctor','Appolo-2','2019-02-02','14:16:53','17:16:53',16,0,''),(24,'Doctor','BSK-MedSick','2019-02-02','13:16:53','16:16:53',6,0,''),(25,'Doctor','StJohn-1','2019-02-02','13:16:53','16:16:53',5,0,''),(26,'Doctor','StJohn-1','2019-02-02','13:16:53','17:16:53',4,0,''),(27,'Doctor','KIMS-1','2019-02-08','09:42:42','17:42:42',5,0,''),(28,'Doctor','Appolo-2','2019-02-05','10:42:42','14:42:42',2,0,'');
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

-- Dump completed on 2019-02-11 11:20:02
