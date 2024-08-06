-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: ekmet
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `ekmet`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `ekmet` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `ekmet`;

--
-- Table structure for table `creda`
--

DROP TABLE IF EXISTS `creda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `creda` (
  `CredaID` int(11) NOT NULL AUTO_INCREMENT,
  `ImeCrede` varchar(40) DEFAULT NULL,
  `Opombe` varchar(80) DEFAULT NULL,
  `Lastnik` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`CredaID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creda`
--

LOCK TABLES `creda` WRITE;
/*!40000 ALTER TABLE `creda` DISABLE KEYS */;
INSERT INTO `creda` VALUES (1,'Biki','To so bikciiii','100223065'),(2,'Bikii','To so bikciiiia','100223065'),(3,'Krave','Krave s teleti','100223065');
/*!40000 ALTER TABLE `creda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kmetija`
--

DROP TABLE IF EXISTS `kmetija`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kmetija` (
  `KMGMID` int(11) NOT NULL,
  `Ime` varchar(40) NOT NULL,
  `Naslov` varchar(40) NOT NULL,
  PRIMARY KEY (`KMGMID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kmetija`
--

LOCK TABLES `kmetija` WRITE;
/*!40000 ALTER TABLE `kmetija` DISABLE KEYS */;
INSERT INTO `kmetija` VALUES (100698,'Primc','Medvedje Brdo 53'),(100223065,'Kasperevc','Medvedje Brdo 12');
/*!40000 ALTER TABLE `kmetija` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reset`
--

DROP TABLE IF EXISTS `reset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reset` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reset`
--

LOCK TABLES `reset` WRITE;
/*!40000 ALTER TABLE `reset` DISABLE KEYS */;
/*!40000 ALTER TABLE `reset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uporabniki`
--

DROP TABLE IF EXISTS `uporabniki`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `uporabniki` (
  `KMGMID` int(11) NOT NULL,
  `user` varchar(60) NOT NULL,
  `pass` varchar(256) NOT NULL,
  PRIMARY KEY (`KMGMID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uporabniki`
--

LOCK TABLES `uporabniki` WRITE;
/*!40000 ALTER TABLE `uporabniki` DISABLE KEYS */;
INSERT INTO `uporabniki` VALUES (100223065,'tilen.zakelj@gmail.com','$2b$10$mlzphtsB6zhjK5VjKklHW.FjVvQccE4JvhJ16BRfNIWmIeCjRhTPG'),(100223066,'david.zakelj@gmail.com','$2b$10$TG1juWr51RHOWiWUd7vn.Ogi99PniEkvvOMHJF4ZR5nIbU6AbdNpO');
/*!40000 ALTER TABLE `uporabniki` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zivali`
--

DROP TABLE IF EXISTS `zivali`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zivali` (
  `ZivalID` varchar(20) NOT NULL,
  `Spol` char(1) DEFAULT NULL,
  `Pasma` varchar(20) DEFAULT NULL,
  `Oce` varchar(20) DEFAULT NULL,
  `Mati` varchar(20) DEFAULT NULL,
  `Lastnik` int(11) NOT NULL,
  `DatumRojstva` date NOT NULL,
  `DatumOdhoda` date DEFAULT NULL,
  `Tip` enum('Govedo','Drobnica','Pra?i?') NOT NULL,
  `CredaID` int(11) DEFAULT NULL,
  `Ime` varchar(20) DEFAULT NULL,
  `Opombe` varchar(500) DEFAULT NULL,
  `slika` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ZivalID`),
  KEY `OCE` (`Oce`),
  KEY `MATI` (`Mati`),
  KEY `Lastnik` (`Lastnik`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zivali`
--

LOCK TABLES `zivali` WRITE;
/*!40000 ALTER TABLE `zivali` DISABLE KEYS */;
INSERT INTO `zivali` VALUES ('SI 0538 6217','Z','LS/(LS/LIM) ','','SI 15001328 ',100223065,'2020-03-20',NULL,'Govedo',NULL,'',NULL,NULL),('SI 0579 7442','Z','(LS/LIM)/LIM ','','SI 25386291',100223065,'2023-05-27',NULL,'Govedo',1,'Mihevc','To je Tilen',NULL),('SI 0586 2801','Z','(LS/LIM)/LIM ','','SI 65465154 ',100223065,'2023-12-15',NULL,'Govedo',0,'','null',NULL),('SI 1500 1328','Z','LS','','SI 14171198',100223065,'2017-07-21',NULL,'Govedo',0,'','null',NULL),('SI 1568 7311','Z','LS/LIM','','SI 15001328',100223065,'2022-04-20',NULL,'Govedo',0,'a','MHMMMM :)',NULL),('SI 2516 9663','Z','LS/LIM','','SI 24171166',100223065,'2019-04-29',NULL,'Govedo',NULL,'',NULL,NULL),('SI 2538 6291','Z','(LS/LIM)/LIM ','','SI 75031965',100223065,'2020-06-22',NULL,'Govedo',0,'','null',NULL),('SI 2577 1123','Z','(LS/LIM)/LIM ','','SI 25169663',100223065,'2022-10-08',NULL,'Govedo',NULL,'',NULL,NULL),('SI 3547 7000','M','(LS/LIM)/LIM ','','SI 44658821',100223065,'2021-11-11',NULL,'Govedo',NULL,'',NULL,NULL),('SI 3568 4419','Z','LS/LIM','','SI 24171166',100223065,'2022-04-01',NULL,'Govedo',NULL,'',NULL,NULL),('SI 3568 8224','Z','LS/LIM','','SI 95000006',100223065,'2022-06-18',NULL,'Govedo',0,'a','null',NULL),('SI 3579 5894','M','LS/LIM','SI 35119461 ','SI 05386217 ',100223065,'2023-03-25',NULL,'Govedo',1,'','To je bikec',NULL),('SI 4568 4401','M','(LS/LIM)/LIM','','SI 74029686 ',100223065,'2022-03-11',NULL,'Govedo',NULL,'',NULL,NULL),('SI 4568 4418','M','(LS/LIM)/LIM ','','SI 64734570',100223065,'2022-04-01',NULL,'Govedo',NULL,'',NULL,NULL),('SI 4579 5893','Z','LS/LIM','','SI 24171166 ',100223065,'2023-03-18',NULL,'Govedo',NULL,'',NULL,NULL),('SI 5546 5155','Z','LS/LIM','','SI 15001328',100223065,'2021-03-23',NULL,'Govedo',NULL,'',NULL,NULL),('SI 5586 2129','M','(LS/LIM)/LIM','','SI 75465153 ',100223065,'2023-12-18',NULL,'Govedo',NULL,'',NULL,NULL),('SI 6473 4570','Z','(LS/LIM)/LS ','SI 34106215 ','SI 63829491 ',100223065,'2016-02-23',NULL,'Govedo',3,'','null',NULL),('SI 6512 1830','Z','(RJ/BBP)/LIM ','SI 44087296','SI 84328104 ',100223065,'2018-11-13',NULL,'Govedo',NULL,'',NULL,NULL),('SI 6546 5154','Z','LS/LIM ','','SI 24171166',100223065,'2021-03-21',NULL,'Govedo',NULL,'',NULL,NULL),('SI 6579 7415','Z','(RJ/LS)/LIM ','','SI 94579354 ',100223065,'2023-05-02',NULL,'Govedo',NULL,'',NULL,NULL),('SI 6586 1732','M','LS/LIM','SI 44451552','SI 95000006',100223065,'2023-09-17',NULL,'Govedo',NULL,'',NULL,NULL),('SI 6586 2805','Z','NN/(LS/LIM) ','','SI 55465155 ',100223065,'2023-12-29',NULL,'Govedo',NULL,'',NULL,NULL),('SI 7546 5153','Z','(RJ/LS)/LIM ','','SI 74029686 ',100223065,'2021-03-17',NULL,'Govedo',NULL,'',NULL,NULL),('SI 8546 5152','Z','(LS/LIM)/LIM ','','SI 64734570',100223065,'2021-03-17',NULL,'Govedo',NULL,'',NULL,NULL),('SI 8568 4421','Z','(LS/BBP)/LIM ','','SI 44411800',100223065,'2022-04-03',NULL,'Govedo',NULL,'',NULL,NULL),('SI 8579 5923','M','LS/LIM','SI 35119461 ','SI 15001328 ',100223065,'2023-04-11',NULL,'Govedo',NULL,'',NULL,NULL),('SI 8579 7413','M','(LS/LIM)/LIM ','','SI 64734570',100223065,'2023-04-20',NULL,'Govedo',NULL,'',NULL,NULL),('SI 9457 9354','Z','(RJ/CHA)/(LS/BBP)/LS','SI 93028305','SI 121518 ',100223065,'2015-05-22',NULL,'Govedo',NULL,'',NULL,NULL),('SI 9500 0006','Z','LS','','SI 04576202',100223065,'2017-05-27',NULL,'Govedo',3,'','null',NULL),('SI 9538 6218','Z','(LS/LIM)/(LS/LIM) ','','SI 64734570',100223065,'2020-03-21',NULL,'Govedo',3,'','null',NULL),('SI19001899','Z','LS/LIM','','SI 24171166',100223066,'2005-05-05',NULL,'Govedo',NULL,'jaaa',NULL,NULL),('SI24171166','Z','LS','null','SI63391903',100223065,'2012-07-18',NULL,'Govedo',3,'','null',NULL),('SI74029686','Z','(RJ/LS)/LIM',NULL,'SI83331811',100223065,'2011-09-27',NULL,'Govedo',NULL,'Tastara',NULL,NULL),('SI95000006','Z','LS','','SI04576202',100223065,'2017-05-27',NULL,'Govedo',NULL,'',NULL,NULL);
/*!40000 ALTER TABLE `zivali` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-17 23:29:23
