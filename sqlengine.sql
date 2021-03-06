-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: picarousel.ctftzezisj7n.us-east-2.rds.amazonaws.com    Database: picarousel
-- ------------------------------------------------------
-- Server version	5.6.39-log

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
-- Table structure for table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorie` (
  `categorie_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `categorie` varchar(50) DEFAULT NULL,
  `categorie_regdate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`categorie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorie`
--

LOCK TABLES `categorie` WRITE;
/*!40000 ALTER TABLE `categorie` DISABLE KEYS */;
INSERT INTO `categorie` VALUES (2,'animal',NULL),(3,'dogs',NULL),(4,'newadd',NULL),(5,'Summer',NULL);
/*!40000 ALTER TABLE `categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `download`
--

DROP TABLE IF EXISTS `download`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `download` (
  `download_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `download_photo_id` int(10) unsigned DEFAULT NULL,
  `download_user_id` int(10) unsigned DEFAULT NULL,
  `download_regdate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`download_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `download`
--

LOCK TABLES `download` WRITE;
/*!40000 ALTER TABLE `download` DISABLE KEYS */;
/*!40000 ALTER TABLE `download` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `image` (
  `photo_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `filepath` varchar(30) DEFAULT NULL,
  `photo_categorie` varchar(255) NOT NULL DEFAULT 'ALL',
  `description` varchar(30) DEFAULT NULL,
  `owner_user_id` int(10) unsigned DEFAULT NULL,
  `adminverified` smallint(5) unsigned NOT NULL,
  `licencetype` smallint(5) unsigned NOT NULL,
  `privacy` smallint(5) unsigned NOT NULL,
  `published` tinyint(3) unsigned NOT NULL,
  `deleted` tinyint(3) unsigned NOT NULL,
  `photo_regdate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`photo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photos` (
  `id` int(11) DEFAULT NULL,
  `filepath` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` VALUES (1,'/bird.png','pegion,bird'),(2,'/dog.jpg','dog,puppy,doggy,cute'),(3,'/dog2.jpg','dog,puppy,doggy,cute'),(4,'/huskey.jpg','dog,puppy,doggy,cute,huskey'),(5,'/parrot.jpg','bird,parrot,cute'),(6,'/kingfisher.jpg','bird,kingfisher,cute');
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `popular_searches`
--

DROP TABLE IF EXISTS `popular_searches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `popular_searches` (
  `name` varchar(255) DEFAULT NULL,
  `frequency` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `popular_searches`
--

LOCK TABLES `popular_searches` WRITE;
/*!40000 ALTER TABLE `popular_searches` DISABLE KEYS */;
/*!40000 ALTER TABLE `popular_searches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sharewith`
--

DROP TABLE IF EXISTS `sharewith`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sharewith` (
  `sharewith_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sharewith_photo_id` int(10) unsigned DEFAULT NULL,
  `sharewith_user_id` int(10) unsigned DEFAULT NULL,
  `sharewith_regdate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`sharewith_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sharewith`
--

LOCK TABLES `sharewith` WRITE;
/*!40000 ALTER TABLE `sharewith` DISABLE KEYS */;
/*!40000 ALTER TABLE `sharewith` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test` (
  `id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(30) DEFAULT NULL,
  `lastname` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `age` smallint(5) unsigned NOT NULL,
  `gender` smallint(5) unsigned NOT NULL,
  `accounttype` varchar(25) NOT NULL DEFAULT 'user',
  `suspend` tinyint(3) unsigned NOT NULL,
  `emailvrfcode` varchar(30) DEFAULT NULL,
  `emailvrfexpdate` time DEFAULT NULL,
  `deleted` tinyint(3) unsigned NOT NULL,
  `lastlogindate` datetime DEFAULT NULL,
  `user_regdate` timestamp NULL DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test','test','test@email.com',21,0,'0',0,NULL,NULL,0,NULL,NULL,'972fa6e5acb284f4cd1758abb78579eaa8fa28c85c2265f8b6'),(2,'sandesh','basnet','sandesh@gmail.com',21,0,'0',0,NULL,NULL,0,NULL,NULL,'34c490de4cfd6f025b3f8b6a43935078d0bfd389bbd9ce4659'),(3,'test','test','test@mail.com',21,0,'0',0,NULL,NULL,0,NULL,NULL,'40d069a1f2e7628423afc8e87d1df866'),(4,'Richard','Chhay','rchhay@mail.sfsu.edu',22,0,'0',0,NULL,NULL,0,NULL,NULL,'5f969d6811220a6d6e54fa7d3bbb9b18'),(5,'fsda','asdfasdf','fff@gmail.com',65,0,'0',0,NULL,NULL,0,NULL,NULL,'011a6fd9ddab6be8d07fcd3abfdc4a1e'),(6,'ronald','mcdonald','test123@something.com',22,0,'Both',0,NULL,NULL,0,NULL,NULL,'0b872377d26ffbf5b85a31fa3de1bba7'),(7,'Ronald','Mcdonald','ronaldmcdonald@mail.com',22,0,'Both',0,NULL,NULL,0,NULL,NULL,'82cb68d5cc67c897cab26366caf8328c'),(8,'admin','admin','admin@mail.com',21,0,'User',0,NULL,NULL,0,NULL,NULL,'f436b66e0171ae70df3a144abc6d43d4'),(9,'john','john','john@mail.com',21,0,'Both',0,NULL,NULL,0,NULL,NULL,'0d415f9de4859c2da941c68adff5c139'),(10,'sandesh','basnet','sandesh@admin.com',21,0,'User',0,NULL,NULL,0,NULL,NULL,'e9c096f8261ea0e56dfc218e53131f6f'),(11,'firstname','lastname','first@mail.com',21,0,'User',0,NULL,NULL,0,NULL,NULL,'2b47d9b5cc2599228d36f2a715851292'),(12,'sandesh','basnet','basnet@admin.com',21,0,'User',0,NULL,NULL,0,NULL,NULL,'e9c096f8261ea0e56dfc218e53131f6f'),(13,'sandesh','basnet','admin@admin.com',21,0,'User',0,NULL,NULL,0,NULL,NULL,'db72f6b04555264f76e3a20c485c678d'),(14,'sandesh','basnet','hello@email.com',21,0,'User',0,NULL,NULL,0,NULL,NULL,'77816c5a915707418294f75ebc6cad38');
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

-- Dump completed on 2018-07-25  0:30:02
