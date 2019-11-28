-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: nydax
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

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
-- Table structure for table `BankPayment`
--

DROP TABLE IF EXISTS `BankPayment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BankPayment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tokenAmount` decimal(15,6) DEFAULT NULL,
  `currencyAmount` decimal(15,2) NOT NULL,
  `bankRefId` varchar(255) DEFAULT NULL,
  `paymentToken` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `tokenId` int(11) DEFAULT NULL,
  `currencyId` int(11) DEFAULT NULL,
  `bankPaymentStatusId` int(11) DEFAULT NULL,
  `bankServiceId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `tokenId` (`tokenId`),
  KEY `currencyId` (`currencyId`),
  KEY `bankPaymentStatusId` (`bankPaymentStatusId`),
  KEY `bankServiceId` (`bankServiceId`),
  CONSTRAINT `BankPayment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `BankPayment_ibfk_2` FOREIGN KEY (`tokenId`) REFERENCES `Token` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `BankPayment_ibfk_3` FOREIGN KEY (`currencyId`) REFERENCES `Currency` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `BankPayment_ibfk_4` FOREIGN KEY (`bankPaymentStatusId`) REFERENCES `BankPaymentStatus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `BankPayment_ibfk_5` FOREIGN KEY (`bankServiceId`) REFERENCES `BankService` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BankPayment`
--

LOCK TABLES `BankPayment` WRITE;
/*!40000 ALTER TABLE `BankPayment` DISABLE KEYS */;
INSERT INTO `BankPayment` VALUES (1,1000.000000,80.00,'ch_1EjEs62eZvKYlo2C0fh967Ct','c07bc60f-ff12-419b-bc18-95915a2cebc8','2019-06-09 00:26:01','2019-06-09 00:26:54',NULL,3,1,3,1),(2,1000.000000,500.00,'ch_1EjEsp2eZvKYlo2CFE2TI2JP','1ea0a80e-0bde-47ef-bfbc-5c8a53e697c3','2019-06-09 00:27:24','2019-06-09 00:27:39',NULL,4,1,3,1),(3,10000.000000,800.00,'ch_1EjOwl2eZvKYlo2CUeq6FC06','ba9ee1ff-42c7-4c64-af08-04fb3bf163d4','2019-06-09 11:11:14','2019-06-09 11:12:23',NULL,3,1,3,1),(4,50000.000000,4000.00,NULL,'518411bf-d00e-482f-b7cd-98df6056a807','2019-06-09 12:08:36','2019-06-09 12:08:36',NULL,3,1,1,1),(5,50000.000000,4000.00,'ch_1EjPsU2eZvKYlo2CZXcZiNPS','b9ae14bb-67a9-4aa2-aaff-f54e8c33f3ba','2019-06-09 12:11:40','2019-06-09 12:12:02',NULL,3,1,3,1),(6,5000.000000,2500.00,'ch_1EjPuQ2eZvKYlo2CFsaMuUya','53643113-bfa8-4afc-9a23-586301dd15e4','2019-06-09 12:13:35','2019-06-09 12:14:03',NULL,4,1,3,1),(7,10.000000,0.80,NULL,'146f63d8-bba8-4283-a9ff-ff89747be3ee','2019-06-09 13:55:41','2019-06-09 13:55:41',NULL,3,1,1,1),(8,13.000000,1.04,NULL,'0ff3d56c-d091-481c-8f8a-0ca99db830a1','2019-06-09 19:38:38','2019-06-09 19:38:38',NULL,3,1,1,1),(9,13.000000,1.04,'ch_1EjWrC2eZvKYlo2CbGTvXiDm','888793a1-2e85-4c88-bd72-3011b621b893','2019-06-09 19:38:44','2019-06-09 19:39:11',NULL,3,1,3,1),(10,1.000000,0.08,NULL,'62d1278c-9a27-43fc-970a-1f763850916f','2019-06-09 19:39:34','2019-06-09 19:39:53',NULL,3,1,2,1),(11,50.000000,4.00,'ch_1EjXFX2eZvKYlo2CN9zwwjHq','e70e74b4-7a77-46a8-a091-e5be566e4f62','2019-06-09 20:03:53','2019-06-09 20:04:20',NULL,3,1,3,1),(12,1000.000000,80.00,NULL,'d22af405-f0d7-4354-a222-d0ddcef407af','2019-06-10 13:16:47','2019-06-10 13:16:47',NULL,3,1,1,1),(13,1.000000,0.08,NULL,'6752282f-c879-415e-b0d5-23b2b89b3e14','2019-06-13 13:23:58','2019-06-13 13:24:23',NULL,3,1,2,1),(14,11.000000,0.88,'ch_1EksvR2eZvKYlo2CzDESpbuE','b49c8a90-c0a0-43c1-aa18-c51e945a65a4','2019-06-13 13:24:47','2019-06-13 13:25:10',NULL,3,1,3,1),(15,20.000000,1.60,'ch_1Ekswv2eZvKYlo2CEiLSZnn5','89239b0a-8780-4749-a5b5-bd4ce5f3b38c','2019-06-13 13:26:13','2019-06-13 13:26:42',NULL,3,1,3,1),(16,15.000000,1.20,'ch_1EkwnV2eZvKYlo2Ck5wuW3CZ','29835452-2a0f-4598-9fa9-0c0fb224caed','2019-06-13 17:32:37','2019-06-13 17:33:14',NULL,3,1,3,1),(17,20.000000,1.60,'ch_1EllP12eZvKYlo2CLe1TkYeb','487034a4-061a-4cd8-9e8f-9c3cc929fd48','2019-06-15 23:33:52','2019-06-15 23:35:20',NULL,3,1,3,1),(18,14.000000,1.12,'ch_1Em3Op2eZvKYlo2ChU9JWEXi','79435e84-7745-4d2b-864e-32532e654e2c','2019-06-16 18:47:47','2019-06-16 18:48:19',NULL,3,1,3,1),(19,17.000000,1.36,'ch_1EmKgb2eZvKYlo2CxapEbemn','eb7cc9be-e797-467d-822e-fb6fbf43858d','2019-06-17 13:15:25','2019-06-17 13:15:50',NULL,3,1,3,1),(20,40.000000,3.20,'ch_1EnB2W2eZvKYlo2CfRl1zQrg','35e22eed-929e-448f-8bf2-3be415e2bb9e','2019-06-19 21:09:18','2019-06-19 21:09:56',NULL,3,1,3,1),(21,10.000000,0.80,NULL,'73d9cff7-553f-48ba-b933-d366c0a341be','2019-06-21 01:11:23','2019-06-21 01:11:23',NULL,3,1,1,1),(22,0.200000,0.02,NULL,'a5017079-5b59-472c-a69b-bdc4b5792002','2019-06-21 01:29:49','2019-06-21 01:30:05',NULL,3,1,2,1),(23,10.000000,0.80,NULL,'d6e4b982-6d04-402d-a31b-9e6ad775db6e','2019-06-21 03:22:35','2019-06-21 03:22:47',NULL,3,1,2,1),(24,1.000000,0.08,NULL,'d9aff627-6250-400c-abfe-1b87aea08171','2019-06-21 03:30:04','2019-06-21 03:30:15',NULL,3,1,2,1),(25,1.000000,0.08,NULL,'cc5d556c-8cfd-4743-8563-0e7a0c90b124','2019-06-21 03:38:19','2019-06-21 03:38:39',NULL,3,1,2,1),(26,1.000000,0.08,NULL,'a903dfa5-ff41-4dfb-92dd-0a4451330e3b','2019-06-21 03:55:02','2019-06-21 03:57:00',NULL,3,1,2,1),(27,1.000000,0.08,NULL,'3f1380b1-03ca-4d73-b2a3-d3e4d278ecd9','2019-06-21 03:59:22','2019-06-21 03:59:43',NULL,3,1,2,1),(28,1000.000000,80.00,NULL,'340fc6eb-c379-41c0-9361-21f9dc75a3a1','2019-06-21 13:31:26','2019-06-21 13:31:26',NULL,3,1,1,1),(29,100.000000,8.00,NULL,'179152ee-284c-418a-b9ef-9eab3d9f6995','2019-06-24 19:22:05','2019-06-24 19:22:30',NULL,3,1,2,1),(30,10.000000,0.80,NULL,'57e2be8a-1762-484e-bda3-6c7568ed4089','2019-06-24 19:23:09','2019-06-24 19:23:09',NULL,3,1,1,1),(31,10.000000,0.80,NULL,'b9b86e5b-efeb-4b05-8c9a-bc25a9d2d315','2019-06-24 19:23:10','2019-06-24 19:23:35',NULL,3,1,2,1),(32,12.000000,6.00,NULL,'c8f07e0b-5994-4cfc-8430-489d96232e6a','2019-06-24 19:27:38','2019-06-24 19:27:59',NULL,4,1,2,1),(33,10.000000,0.80,NULL,'bd984332-4894-4313-9cb5-11cd0ee955ee','2019-06-24 19:30:57','2019-06-24 19:30:57',NULL,3,1,1,1),(34,100.000000,8.00,NULL,'b8e620e8-04f5-4334-9c5e-99009403a96c','2019-06-25 20:30:44','2019-06-25 20:30:44',NULL,3,1,1,1),(35,23232.000000,1858.56,NULL,'45003a81-6e64-4a64-b27f-4377d9b165f9','2019-07-03 07:01:16','2019-07-03 07:01:16',NULL,3,1,1,1),(36,10.000000,0.80,NULL,'77fd74ee-93e3-4935-b1ab-3769660cf69f','2019-07-03 10:38:35','2019-07-03 10:38:35',NULL,3,1,1,1),(37,1000.000000,80.00,NULL,'451dc62d-7278-4f5b-97dd-dc656c7bc958','2019-07-27 11:37:22','2019-07-27 11:37:22',1000023,3,1,1,1),(38,100.000000,8.00,NULL,'48225208-e91d-4605-8b06-ee708491b257','2019-07-27 11:40:11','2019-07-27 11:41:03',1000023,3,1,2,1),(39,125.000000,10.00,NULL,'0be143b9-db57-43d2-979b-f3695213b5c5','2019-08-04 08:05:37','2019-08-04 08:05:37',1000026,3,1,1,1),(40,200.000000,16.00,NULL,'7f271eff-de57-4379-a032-76dffdc56f1e','2019-08-14 12:43:15','2019-08-14 12:43:15',1000015,3,1,1,1),(41,1000.000000,80.00,NULL,'98265b6a-79f1-49b3-bfbe-5392dc0de0d2','2019-08-15 01:35:39','2019-08-15 01:35:39',1000015,3,1,1,1),(42,50000.000000,4000.00,NULL,'98b13f7b-cda5-4b93-8916-84c8937e8754','2019-08-21 08:03:30','2019-08-21 08:03:30',1000032,3,1,1,1),(43,111.000000,8.88,NULL,'629f723d-c20e-4617-b275-761915bc1d6e','2019-08-27 06:08:47','2019-08-27 06:08:47',1000034,3,1,1,1),(44,1.000000,0.08,NULL,'d42541fa-5bf3-4982-aa54-d1813841247e','2019-11-11 09:45:19','2019-11-11 09:45:19',1000046,3,1,1,1),(45,10.000000,0.80,NULL,'396a5ade-1e08-45bb-ae35-a53fa943e0bb','2019-11-11 09:45:22','2019-11-11 09:45:22',1000046,3,1,1,1),(46,30.000000,2.40,NULL,'e80206c5-a058-4906-9d0e-5ccd7def4741','2019-11-11 11:27:31','2019-11-11 11:27:31',1000046,3,1,1,1);
/*!40000 ALTER TABLE `BankPayment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BankPaymentStatus`
--

DROP TABLE IF EXISTS `BankPaymentStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BankPaymentStatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(70) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BankPaymentStatus`
--

LOCK TABLES `BankPaymentStatus` WRITE;
/*!40000 ALTER TABLE `BankPaymentStatus` DISABLE KEYS */;
INSERT INTO `BankPaymentStatus` VALUES (1,'Request submitted','2019-06-08 23:36:02','2019-06-08 23:36:07'),(2,'Payment pending','2019-06-08 23:36:02','2019-06-08 23:36:07'),(3,'Payment successfull and waiting to be processed','2019-06-08 23:36:02','2019-06-08 23:36:07'),(4,'Payment successfull and processed','2019-06-08 23:36:02','2019-06-08 23:36:07'),(5,'Payment failed','2019-06-08 23:36:02','2019-06-08 23:36:07');
/*!40000 ALTER TABLE `BankPaymentStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BankService`
--

DROP TABLE IF EXISTS `BankService`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BankService` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BankService`
--

LOCK TABLES `BankService` WRITE;
/*!40000 ALTER TABLE `BankService` DISABLE KEYS */;
INSERT INTO `BankService` VALUES (1,'Stripe','2019-06-08 23:36:02','2019-06-08 23:36:07'),(2,'Poli','2019-06-08 23:36:02','2019-06-08 23:36:07');
/*!40000 ALTER TABLE `BankService` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Blacklist`
--

DROP TABLE IF EXISTS `Blacklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Blacklist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `until` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Blacklist`
--

LOCK TABLES `Blacklist` WRITE;
/*!40000 ALTER TABLE `Blacklist` DISABLE KEYS */;
INSERT INTO `Blacklist` VALUES (1,'nassim.mehri@gmail.com',NULL,'2019-08-19 17:23:28','2019-08-19 16:23:28','2019-08-19 16:23:28');
/*!40000 ALTER TABLE `Blacklist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Country`
--

DROP TABLE IF EXISTS `Country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Country` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `phoneCode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=237 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Country`
--

LOCK TABLES `Country` WRITE;
/*!40000 ALTER TABLE `Country` DISABLE KEYS */;
INSERT INTO `Country` VALUES (1,'Abkhazia','+7 840'),(2,'Afghanistan','+93'),(3,'Albania','+355'),(4,'Algeria','+213'),(5,'American Samoa','+1 684'),(6,'Andorra','+376'),(7,'Angola','+244'),(8,'Anguilla','+1 264'),(9,'Antigua and Barbuda','+1 268'),(10,'Argentina','+54'),(11,'Armenia','+374'),(12,'Aruba','+297'),(13,'Ascension','+247'),(14,'Australia','+61'),(15,'Australian External Territories','+672'),(16,'Austria','+43'),(17,'Azerbaijan','+994'),(18,'Bahamas','+1 242'),(19,'Bahrain','+973'),(20,'Bangladesh','+880'),(21,'Barbados','+1 246'),(22,'Barbuda','+1 268'),(23,'Belarus','+375'),(24,'Belgium','+32'),(25,'Belize','+501'),(26,'Benin','+229'),(27,'Bermuda','+1 441'),(28,'Bhutan','+975'),(29,'Bolivia','+591'),(30,'Bosnia and Herzegovina','+387'),(31,'Botswana','+267'),(32,'Brazil','+55'),(33,'British Indian Ocean Territory','+246'),(34,'British Virgin Islands','+1 284'),(35,'Brunei','+673'),(36,'Bulgaria','+359'),(37,'Burkina Faso','+226'),(38,'Burundi','+257'),(39,'Cambodia','+855'),(40,'Cameroon','+237'),(41,'Canada','+1'),(42,'Cape Verde','+238'),(43,'Cayman Islands','+ 345'),(44,'Central African Republic','+236'),(45,'Chad','+235'),(46,'Chile','+56'),(47,'China','+86'),(48,'Christmas Island','+61'),(49,'Cocos-Keeling Islands','+61'),(50,'Colombia','+57'),(51,'Comoros','+269'),(52,'Congo','+242'),(53,'Congo, Dem. Rep. of (Zaire)','+243'),(54,'Cook Islands','+682'),(55,'Costa Rica','+506'),(56,'Croatia','+385'),(57,'Cuba','+53'),(58,'Curacao','+599'),(59,'Cyprus','+537'),(60,'Czech Republic','+420'),(61,'Denmark','+45'),(62,'Diego Garcia','+246'),(63,'Djibouti','+253'),(64,'Dominica','+1 767'),(65,'Dominican Republic','+1 809'),(66,'East Timor','+670'),(67,'Easter Island','+56'),(68,'Ecuador','+593'),(69,'Egypt','+20'),(70,'El Salvador','+503'),(71,'Equatorial Guinea','+240'),(72,'Eritrea','+291'),(73,'Estonia','+372'),(74,'Ethiopia','+251'),(75,'Falkland Islands','+500'),(76,'Faroe Islands','+298'),(77,'Fiji','+679'),(78,'Finland','+358'),(79,'France','+33'),(80,'French Antilles','+596'),(81,'French Guiana','+594'),(82,'French Polynesia','+689'),(83,'Gabon','+241'),(84,'Gambia','+220'),(85,'Georgia','+995'),(86,'Germany','+49'),(87,'Ghana','+233'),(88,'Gibraltar','+350'),(89,'Greece','+30'),(90,'Greenland','+299'),(91,'Grenada','+1 473'),(92,'Guadeloupe','+590'),(93,'Guam','+1 671'),(94,'Guatemala','+502'),(95,'Guinea','+224'),(96,'Guinea-Bissau','+245'),(97,'Guyana','+595'),(98,'Haiti','+509'),(99,'Honduras','+504'),(100,'Hong Kong SAR China','+852'),(101,'Hungary','+36'),(102,'Iceland','+354'),(103,'India','+91'),(104,'Indonesia','+62'),(105,'Iran','+98'),(106,'Iraq','+964'),(107,'Ireland','+353'),(108,'Israel','+972'),(109,'Italy','+39'),(110,'Ivory Coast','+225'),(111,'Jamaica','+1 876'),(112,'Japan','+81'),(113,'Jordan','+962'),(114,'Kazakhstan','+7 7'),(115,'Kenya','+254'),(116,'Kiribati','+686'),(117,'Kuwait','+965'),(118,'Kyrgyzstan','+996'),(119,'Laos','+856'),(120,'Latvia','+371'),(121,'Lebanon','+961'),(122,'Lesotho','+266'),(123,'Liberia','+231'),(124,'Libya','+218'),(125,'Liechtenstein','+423'),(126,'Lithuania','+370'),(127,'Luxembourg','+352'),(128,'Macau SAR China','+853'),(129,'Macedonia','+389'),(130,'Madagascar','+261'),(131,'Malawi','+265'),(132,'Malaysia','+60'),(133,'Maldives','+960'),(134,'Mali','+223'),(135,'Malta','+356'),(136,'Marshall Islands','+692'),(137,'Martinique','+596'),(138,'Mauritania','+222'),(139,'Mauritius','+230'),(140,'Mayotte','+262'),(141,'Mexico','+52'),(142,'Micronesia','+691'),(143,'Midway Island','+1 808'),(144,'Moldova','+373'),(145,'Monaco','+377'),(146,'Mongolia','+976'),(147,'Montenegro','+382'),(148,'Montserrat','+1664'),(149,'Morocco','+212'),(150,'Myanmar','+95'),(151,'Namibia','+264'),(152,'Nauru','+674'),(153,'Nepal','+977'),(154,'Netherlands','+31'),(155,'Netherlands Antilles','+599'),(156,'Nevis','+1 869'),(157,'New Caledonia','+687'),(158,'New Zealand','+64'),(159,'Nicaragua','+505'),(160,'Niger','+227'),(161,'Nigeria','+234'),(162,'Niue','+683'),(163,'Norfolk Island','+672'),(164,'North Korea','+850'),(165,'Northern Mariana Islands','+1 670'),(166,'Norway','+47'),(167,'Oman','+968'),(168,'Pakistan','+92'),(169,'Palau','+680'),(170,'Palestinian Territory','+970'),(171,'Panama','+507'),(172,'Papua New Guinea','+675'),(173,'Paraguay','+595'),(174,'Peru','+51'),(175,'Philippines','+63'),(176,'Poland','+48'),(177,'Portugal','+351'),(178,'Puerto Rico','+1 787'),(179,'Qatar','+974'),(180,'Reunion','+262'),(181,'Romania','+40'),(182,'Russia','+7'),(183,'Rwanda','+250'),(184,'Samoa','+685'),(185,'San Marino','+378'),(186,'Saudi Arabia','+966'),(187,'Senegal','+221'),(188,'Serbia','+381'),(189,'Seychelles','+248'),(190,'Sierra Leone','+232'),(191,'Singapore','+65'),(192,'Slovakia','+421'),(193,'Slovenia','+386'),(194,'Solomon Islands','+677'),(195,'South Africa','+27'),(196,'South Georgia and the South Sandwich Islands','+500'),(197,'South Korea','+82'),(198,'Spain','+34'),(199,'Sri Lanka','+94'),(200,'Sudan','+249'),(201,'Suriname','+597'),(202,'Swaziland','+268'),(203,'Sweden','+46'),(204,'Switzerland','+41'),(205,'Syria','+963'),(206,'Taiwan','+886'),(207,'Tajikistan','+992'),(208,'Tanzania','+255'),(209,'Thailand','+66'),(210,'Timor Leste','+670'),(211,'Togo','+228'),(212,'Tokelau','+690'),(213,'Tonga','+676'),(214,'Trinidad and Tobago','+1 868'),(215,'Tunisia','+216'),(216,'Turkey','+90'),(217,'Turkmenistan','+993'),(218,'Turks and Caicos Islands','+1 649'),(219,'Tuvalu','+688'),(220,'U.S. Virgin Islands','+1 340'),(221,'Uganda','+256'),(222,'Ukraine','+380'),(223,'United Arab Emirates','+971'),(224,'United Kingdom','+44'),(225,'United States','+1'),(226,'Uruguay','+598'),(227,'Uzbekistan','+998'),(228,'Vanuatu','+678'),(229,'Venezuela','+58'),(230,'Vietnam','+84'),(231,'Wake Island','+1 808'),(232,'Wallis and Futuna','+681'),(233,'Yemen','+967'),(234,'Zambia','+260'),(235,'Zanzibar','+255'),(236,'Zimbabwe','+263');
/*!40000 ALTER TABLE `Country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Currency`
--

DROP TABLE IF EXISTS `Currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Currency` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `abbreviation` varchar(4) DEFAULT NULL,
  `usdRatio` decimal(15,6) NOT NULL DEFAULT '1.000000',
  `symbol` varchar(5) DEFAULT NULL,
  `symbolNative` varchar(5) DEFAULT NULL,
  `decimalPrecision` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Currency`
--

LOCK TABLES `Currency` WRITE;
/*!40000 ALTER TABLE `Currency` DISABLE KEYS */;
INSERT INTO `Currency` VALUES (1,'US Dollar','USD',1.000000,'$','$',2),(2,'Canadian Dollar','CAD',1.330580,'CA$','$',2),(3,'Euro','EUR',0.907441,'€','€',2),(4,'Australian Dollar','AUD',1.474680,'AU$','$',2),(5,'Bulgarian Lev','BGN',1.774770,'BGN','лв.',2),(6,'Brazilian Real','BRL',4.257260,'R$','R$',2),(7,'Swiss Franc','CHF',0.997550,'CHF','CHF',2),(8,'Chinese Yuan','CNY',7.039560,'CN¥','CN¥',2),(9,'Czech Republic Koruna','CZK',23.144300,'Kč','Kč',2),(10,'Danish Krone','DKK',6.780400,'Dkr','kr',2),(11,'British Pound Sterling','GBP',0.777813,'£','£',2),(12,'Hong Kong Dollar','HKD',7.827220,'HK$','$',2),(13,'Croatian Kuna','HRK',6.747280,'kn','kn',2),(14,'Hungarian Forint','HUF',305.045000,'Ft','Ft',0),(15,'Indonesian Rupiah','IDR',14099.900000,'Rp','Rp',0),(16,'Israeli New Sheqel','ILS',3.461620,'₪','₪',2),(17,'Indian Rupee','INR',71.521300,'Rs','₹',2),(18,'Icelandic Króna','ISK',122.868000,'Ikr','kr',0),(19,'Japanese Yen','JPY',108.975000,'¥','￥',0),(20,'South Korean Won','KRW',1176.830000,'₩','₩',0),(21,'Mexican Peso','MXN',19.479900,'MX$','$',2),(22,'Malaysian Ringgit','MYR',4.183030,'RM','RM',2),(23,'Norwegian Krone','NOK',9.162250,'Nkr','kr',2),(24,'New Zealand Dollar','NZD',1.557620,'NZ$','$',2),(25,'Philippine Peso','PHP',50.831200,'₱','₱',2),(26,'Polish Zloty','PLN',3.903360,'zł','zł',2),(27,'Romanian Leu','RON',4.334480,'RON','RON',2),(28,'Russian Ruble','RUB',64.015000,'RUB','руб.',2),(29,'Swedish Krona','SEK',9.601450,'Skr','kr',2),(30,'Singapore Dollar','SGD',1.366330,'S$','$',2),(31,'Thai Baht','THB',30.215100,'฿','฿',2),(32,'Turkish Lira','TRY',5.740020,'TL','TL',2),(33,'South African Rand','ZAR',14.826100,'R','R',2);
/*!40000 ALTER TABLE `Currency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FailedLoginAttempt`
--

DROP TABLE IF EXISTS `FailedLoginAttempt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FailedLoginAttempt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `FailedLoginAttempt_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FailedLoginAttempt`
--

LOCK TABLES `FailedLoginAttempt` WRITE;
/*!40000 ALTER TABLE `FailedLoginAttempt` DISABLE KEYS */;
INSERT INTO `FailedLoginAttempt` VALUES (3,'2019-08-19 16:22:54','2019-08-19 16:22:54',1000029),(4,'2019-08-19 16:23:12','2019-08-19 16:23:12',1000029),(5,'2019-08-19 16:23:28','2019-08-19 16:23:28',1000029),(6,'2019-09-24 06:50:38','2019-09-24 06:50:38',1000038);
/*!40000 ALTER TABLE `FailedLoginAttempt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FavouriteCharts`
--

DROP TABLE IF EXISTS `FavouriteCharts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FavouriteCharts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `pairId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `pairId` (`pairId`),
  CONSTRAINT `FavouriteCharts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FavouriteCharts_ibfk_2` FOREIGN KEY (`pairId`) REFERENCES `Pair` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FavouriteCharts`
--

LOCK TABLES `FavouriteCharts` WRITE;
/*!40000 ALTER TABLE `FavouriteCharts` DISABLE KEYS */;
INSERT INTO `FavouriteCharts` VALUES (55,'2019-07-08 18:49:44','2019-07-08 18:49:44',1000007,1),(56,'2019-07-08 19:50:17','2019-07-08 19:50:17',1000008,1),(57,'2019-07-08 19:55:27','2019-07-08 19:55:27',1000008,2),(58,'2019-07-08 19:55:31','2019-07-08 19:55:31',1000008,3),(65,'2019-07-10 07:44:11','2019-07-10 07:44:11',1000013,1),(68,'2019-07-16 16:07:46','2019-07-16 16:07:46',1000016,1),(69,'2019-07-17 02:29:36','2019-07-17 02:29:36',1000017,1),(70,'2019-07-18 10:37:26','2019-07-18 10:37:26',1000018,1),(71,'2019-07-18 12:28:24','2019-07-18 12:28:24',1000019,1),(72,'2019-07-18 15:18:15','2019-07-18 15:18:15',1000020,1),(73,'2019-07-19 13:21:41','2019-07-19 13:21:41',1000021,1),(74,'2019-07-25 00:21:56','2019-07-25 00:21:56',1000022,1),(75,'2019-07-27 11:24:01','2019-07-27 11:24:01',1000023,1),(76,'2019-07-28 15:33:12','2019-07-28 15:33:12',1000024,1),(77,'2019-07-30 03:42:34','2019-07-30 03:42:34',1000025,1),(78,'2019-08-04 08:01:13','2019-08-04 08:01:13',1000026,1),(79,'2019-08-06 07:57:04','2019-08-06 07:57:04',1000027,1),(80,'2019-08-14 00:49:03','2019-08-14 00:49:03',1000028,1),(85,'2019-08-19 10:45:15','2019-08-19 10:45:15',1000029,1),(86,'2019-08-20 06:57:26','2019-08-20 06:57:26',1000030,1),(87,'2019-08-21 01:25:34','2019-08-21 01:25:34',1000031,1),(88,'2019-08-21 01:26:22','2019-08-21 01:26:22',1000031,2),(89,'2019-08-21 01:26:25','2019-08-21 01:26:25',1000031,3),(90,'2019-08-21 08:00:22','2019-08-21 08:00:22',1000032,1),(91,'2019-08-23 14:14:15','2019-08-23 14:14:15',1000033,1),(92,'2019-08-27 05:34:47','2019-08-27 05:34:47',1000015,2),(93,'2019-08-27 05:34:48','2019-08-27 05:34:48',1000015,1),(94,'2019-08-27 05:34:48','2019-08-27 05:34:48',1000015,3),(95,'2019-08-27 06:06:45','2019-08-27 06:06:45',1000034,1),(96,'2019-08-27 19:09:45','2019-08-27 19:09:45',1000035,1),(97,'2019-08-27 19:16:48','2019-08-27 19:16:48',1000036,1),(98,'2019-09-03 17:18:12','2019-09-03 17:18:12',1000037,1),(99,'2019-09-23 15:24:10','2019-09-23 15:24:10',1000038,1),(100,'2019-09-28 07:16:40','2019-09-28 07:16:40',1000039,1),(101,'2019-09-28 18:37:42','2019-09-28 18:37:42',1000040,1),(102,'2019-10-01 11:06:32','2019-10-01 11:06:32',1000041,1),(104,'2019-10-09 23:20:09','2019-10-09 23:20:09',1000037,2),(105,'2019-10-09 23:20:11','2019-10-09 23:20:11',1000037,3),(106,'2019-10-10 11:08:36','2019-10-10 11:08:36',1000043,1),(107,'2019-10-16 23:32:06','2019-10-16 23:32:06',1000044,1),(108,'2019-10-16 23:46:48','2019-10-16 23:46:48',1000045,1),(109,'2019-11-11 23:12:51','2019-11-11 23:12:51',1000046,1),(110,'2019-11-11 23:12:53','2019-11-11 23:12:53',1000046,2);
/*!40000 ALTER TABLE `FavouriteCharts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FavouritePairs`
--

DROP TABLE IF EXISTS `FavouritePairs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FavouritePairs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `pairId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `pairId` (`pairId`),
  CONSTRAINT `FavouritePairs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FavouritePairs_ibfk_2` FOREIGN KEY (`pairId`) REFERENCES `Pair` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FavouritePairs`
--

LOCK TABLES `FavouritePairs` WRITE;
/*!40000 ALTER TABLE `FavouritePairs` DISABLE KEYS */;
/*!40000 ALTER TABLE `FavouritePairs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Invitation`
--

DROP TABLE IF EXISTS `Invitation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Invitation` (
  `email` varchar(255) NOT NULL,
  `token` varchar(64) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `invitedBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`email`),
  KEY `invitedBy` (`invitedBy`),
  CONSTRAINT `Invitation_ibfk_1` FOREIGN KEY (`invitedBy`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Invitation`
--

LOCK TABLES `Invitation` WRITE;
/*!40000 ALTER TABLE `Invitation` DISABLE KEYS */;
INSERT INTO `Invitation` VALUES ('friend@nydax.com',NULL,'2019-06-08 23:36:02','2019-06-08 23:36:07',1);
/*!40000 ALTER TABLE `Invitation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Order`
--

DROP TABLE IF EXISTS `Order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `price` decimal(21,9) NOT NULL,
  `amount` decimal(21,9) NOT NULL,
  `filledAmount` decimal(21,9) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `sideId` int(11) DEFAULT NULL,
  `statusId` int(11) DEFAULT NULL,
  `typeId` int(11) DEFAULT NULL,
  `fillTypeId` int(11) DEFAULT NULL,
  `pairId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `typeId` (`typeId`),
  KEY `fillTypeId` (`fillTypeId`),
  KEY `pairId` (`pairId`),
  KEY `sideId` (`sideId`),
  KEY `statusId` (`statusId`),
  CONSTRAINT `Order_ibfk_11` FOREIGN KEY (`typeId`) REFERENCES `OrderType` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Order_ibfk_12` FOREIGN KEY (`fillTypeId`) REFERENCES `OrderFillType` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Order_ibfk_13` FOREIGN KEY (`pairId`) REFERENCES `Pair` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Order_ibfk_14` FOREIGN KEY (`sideId`) REFERENCES `OrderSide` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Order_ibfk_15` FOREIGN KEY (`statusId`) REFERENCES `OrderStatus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Order_ibfk_6` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3103458 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order`
--

LOCK TABLES `Order` WRITE;
/*!40000 ALTER TABLE `Order` DISABLE KEYS */;
/*!40000 ALTER TABLE `Order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderFillType`
--

DROP TABLE IF EXISTS `OrderFillType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OrderFillType` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderFillType`
--

LOCK TABLES `OrderFillType` WRITE;
/*!40000 ALTER TABLE `OrderFillType` DISABLE KEYS */;
INSERT INTO `OrderFillType` VALUES (1,'normal','2019-06-08 23:36:01','2019-06-08 23:36:07'),(2,'ioc','2019-06-08 23:36:01','2019-06-08 23:36:07'),(3,'aon','2019-06-08 23:36:01','2019-06-08 23:36:07');
/*!40000 ALTER TABLE `OrderFillType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderSide`
--

DROP TABLE IF EXISTS `OrderSide`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OrderSide` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderSide`
--

LOCK TABLES `OrderSide` WRITE;
/*!40000 ALTER TABLE `OrderSide` DISABLE KEYS */;
INSERT INTO `OrderSide` VALUES (1,'buy','2019-06-08 23:36:01','2019-06-08 23:36:07'),(2,'sell','2019-06-08 23:36:01','2019-06-08 23:36:07');
/*!40000 ALTER TABLE `OrderSide` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderStatus`
--

DROP TABLE IF EXISTS `OrderStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OrderStatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderStatus`
--

LOCK TABLES `OrderStatus` WRITE;
/*!40000 ALTER TABLE `OrderStatus` DISABLE KEYS */;
INSERT INTO `OrderStatus` VALUES (1,'Filled','2019-06-08 23:36:01','2019-06-08 23:36:07'),(2,'Pending','2019-06-08 23:36:01','2019-06-08 23:36:07'),(3,'Cancelled','2019-06-08 23:36:01','2019-06-08 23:36:07'),(4,'Rejected','2019-06-08 23:36:01','2019-06-08 23:36:07'),(5,'Suspended','2019-06-08 23:36:01','2019-06-08 23:36:07'),(6,'Expired','2019-06-08 23:36:01','2019-06-08 23:36:07');
/*!40000 ALTER TABLE `OrderStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderType`
--

DROP TABLE IF EXISTS `OrderType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OrderType` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderType`
--

LOCK TABLES `OrderType` WRITE;
/*!40000 ALTER TABLE `OrderType` DISABLE KEYS */;
INSERT INTO `OrderType` VALUES (1,'market','2019-06-08 23:36:01','2019-06-08 23:36:07'),(2,'limit','2019-06-08 23:36:01','2019-06-08 23:36:07');
/*!40000 ALTER TABLE `OrderType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pair`
--

DROP TABLE IF EXISTS `Pair`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Pair` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `lastPrice` decimal(21,9) NOT NULL DEFAULT '0.000000000',
  `change24Price` decimal(21,9) NOT NULL DEFAULT '0.000000000',
  `high24` decimal(21,9) NOT NULL DEFAULT '0.000000000',
  `low24` decimal(21,9) NOT NULL DEFAULT '0.000000000',
  `vol24` decimal(21,9) NOT NULL DEFAULT '0.000000000',
  `minTradeAmount` decimal(21,9) NOT NULL,
  `tradeAmountDecimals` decimal(21,9) NOT NULL,
  `minTickSize` decimal(21,9) NOT NULL,
  `priceDecimals` int(11) NOT NULL,
  `minOrderValue` decimal(21,9) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `baseTokenId` int(11) DEFAULT NULL,
  `quoteTokenId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `baseTokenId` (`baseTokenId`),
  KEY `quoteTokenId` (`quoteTokenId`),
  CONSTRAINT `Pair_ibfk_1` FOREIGN KEY (`baseTokenId`) REFERENCES `Token` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Pair_ibfk_2` FOREIGN KEY (`quoteTokenId`) REFERENCES `Token` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pair`
--

LOCK TABLES `Pair` WRITE;
/*!40000 ALTER TABLE `Pair` DISABLE KEYS */;
INSERT INTO `Pair` VALUES (1,'ETH/BTC',0.020655000,0.000903000,0.020705000,0.020655000,36.623900000,0.001000000,6.000000000,0.000001000,8,0.001000000,'2019-06-08 23:36:01','2019-11-27 08:41:11',1,2),(2,'INVO/BTC',0.000131060,0.000000440,0.000130000,0.000113000,5503.950000000,0.000001000,2.000000000,0.000000010,8,0.000100000,'2019-06-08 23:36:01','2019-11-27 08:41:40',3,2),(3,'TRZ/BTC',0.000430440,0.000004750,0.000483000,0.000438000,1949.680000000,0.000001000,2.000000000,0.000000010,8,0.000100000,'2019-06-08 23:36:01','2019-11-27 08:41:50',4,2);
/*!40000 ALTER TABLE `Pair` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PriceDay`
--

DROP TABLE IF EXISTS `PriceDay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PriceDay` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `open` decimal(15,6) NOT NULL DEFAULT '0.000000',
  `high` decimal(15,6) NOT NULL DEFAULT '0.000000',
  `low` decimal(15,6) NOT NULL DEFAULT '0.000000',
  `close` decimal(15,6) NOT NULL DEFAULT '0.000000',
  `volume` decimal(15,6) NOT NULL DEFAULT '0.000000',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `pairId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pairId` (`pairId`),
  CONSTRAINT `PriceDay_ibfk_1` FOREIGN KEY (`pairId`) REFERENCES `Pair` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PriceDay`
--

LOCK TABLES `PriceDay` WRITE;
/*!40000 ALTER TABLE `PriceDay` DISABLE KEYS */;
INSERT INTO `PriceDay` VALUES (1,0.030287,0.031088,0.030205,0.030921,2679.413770,'2019-06-11 00:00:00','2019-06-11 00:00:00',1),(2,0.000032,0.000215,0.000027,0.000033,715391.635000,'2019-06-11 00:00:00','2019-06-11 00:00:00',2),(3,0.030905,0.031240,0.030696,0.031008,2677.044000,'2019-06-12 00:00:00','2019-06-12 00:00:00',1),(4,0.000033,0.000059,0.000029,0.000032,692211.316000,'2019-06-12 00:00:00','2019-06-12 00:00:00',2),(5,0.000235,0.004803,0.000170,0.000207,120004.788000,'2019-06-12 00:00:00','2019-06-12 00:00:00',3),(6,0.031012,0.032207,0.030839,0.032179,1163.721440,'2019-06-13 00:00:01','2019-06-13 00:00:01',1),(7,0.000032,0.000074,0.000030,0.000034,694824.252000,'2019-06-13 00:00:01','2019-06-13 00:00:01',2),(8,0.000201,0.000357,0.000179,0.000205,114752.989000,'2019-06-13 00:00:01','2019-06-13 00:00:01',3),(9,0.000035,0.000205,0.000028,0.000032,714967.594000,'2019-06-14 00:00:00','2019-06-14 00:00:00',2),(10,0.000206,0.000290,0.000182,0.000196,113352.057000,'2019-06-14 00:00:00','2019-06-14 00:00:00',3),(11,0.000031,0.000202,0.000028,0.000032,711340.666000,'2019-06-15 00:00:00','2019-06-15 00:00:00',2),(12,0.000196,0.000282,0.000183,0.000215,110152.905000,'2019-06-15 00:00:00','2019-06-15 00:00:00',3),(13,0.000032,0.000191,0.000029,0.000029,736396.157000,'2019-06-16 00:00:01','2019-06-16 00:00:01',2),(14,0.000215,0.000279,0.000176,0.000201,115555.074000,'2019-06-16 00:00:01','2019-06-16 00:00:01',3),(15,0.030382,0.030441,0.029367,0.029905,932.265510,'2019-06-17 00:00:00','2019-06-17 00:00:00',1),(16,0.000031,0.000048,0.000027,0.000031,703687.975000,'2019-06-17 00:00:00','2019-06-17 00:00:00',2),(17,0.000202,0.000278,0.000179,0.000205,114619.850000,'2019-06-17 00:00:00','2019-06-17 00:00:00',3),(18,0.029908,0.029972,0.029087,0.029377,1216.323050,'2019-06-18 00:00:00','2019-06-18 00:00:00',1),(19,0.000032,0.000050,0.000027,0.000034,719548.191000,'2019-06-18 00:00:00','2019-06-18 00:00:00',2),(20,0.000211,0.000284,0.000177,0.000224,111759.622000,'2019-06-18 00:00:01','2019-06-18 00:00:01',3),(21,0.000033,0.000047,0.000030,0.000034,712460.559000,'2019-06-19 00:00:00','2019-06-19 00:00:00',2),(22,0.000224,0.000249,0.000185,0.000212,116592.473000,'2019-06-19 00:00:00','2019-06-19 00:00:00',3),(23,0.000035,0.000039,0.000027,0.000027,751190.512000,'2019-06-20 00:00:01','2019-06-20 00:00:01',2),(24,0.000211,0.000289,0.000184,0.000213,114540.868000,'2019-06-20 00:00:01','2019-06-20 00:00:01',3),(25,0.028556,0.029844,0.028503,0.028956,1366.375680,'2019-06-22 00:00:00','2019-06-22 00:00:00',1),(26,0.000030,0.000045,0.000028,0.000039,674228.811000,'2019-06-22 00:00:01','2019-06-22 00:00:01',2),(27,0.000197,0.000375,0.000188,0.000212,105472.573000,'2019-06-22 00:00:01','2019-06-22 00:00:01',3),(28,0.000039,0.000043,0.000028,0.000039,721919.862000,'2019-06-23 00:00:01','2019-06-23 00:00:01',2),(29,0.000213,0.000278,0.000157,0.000212,116278.020000,'2019-06-23 00:00:01','2019-06-23 00:00:01',3),(30,0.028981,0.029433,0.028107,0.028299,843.317630,'2019-06-24 00:00:01','2019-06-24 00:00:01',1),(31,0.000039,0.000048,0.000029,0.000033,711353.079000,'2019-06-24 00:00:01','2019-06-24 00:00:01',2),(32,0.000212,0.000323,0.000174,0.000178,114565.486000,'2019-06-24 00:00:01','2019-06-24 00:00:01',3),(33,0.028297,0.028615,0.027981,0.028172,828.770340,'2019-06-25 00:00:00','2019-06-25 00:00:00',1),(34,0.000033,0.000048,0.000029,0.000037,714212.678000,'2019-06-25 00:00:00','2019-06-25 00:00:00',2),(35,0.000174,0.000312,0.000174,0.000243,115056.434000,'2019-06-25 00:00:00','2019-06-25 00:00:00',3),(36,0.028190,0.028204,0.026866,0.026924,1151.705890,'2019-06-26 00:00:01','2019-06-26 00:00:01',1),(37,0.000037,0.000045,0.000027,0.000028,744104.392000,'2019-06-26 00:00:01','2019-06-26 00:00:01',2),(38,0.000243,0.000333,0.000180,0.000246,112932.569000,'2019-06-26 00:00:01','2019-06-26 00:00:01',3),(39,0.000028,0.000184,0.000028,0.000032,738047.573000,'2019-06-27 00:00:01','2019-06-27 00:00:01',2),(40,0.000246,0.000290,0.000166,0.000192,118129.879000,'2019-06-27 00:00:01','2019-06-27 00:00:01',3),(41,0.025945,0.027345,0.025665,0.026400,1315.027780,'2019-06-28 00:00:00','2019-06-28 00:00:00',1),(42,0.000032,0.000046,0.000028,0.000035,723725.877000,'2019-06-28 00:00:00','2019-06-28 00:00:00',2),(43,0.000209,0.000249,0.000174,0.000200,117447.699000,'2019-06-28 00:00:01','2019-06-28 00:00:01',3),(44,0.000036,0.000041,0.000026,0.000032,750425.199000,'2019-06-29 00:00:01','2019-06-29 00:00:01',2),(45,0.000198,0.000270,0.000181,0.000233,112548.711000,'2019-06-29 00:00:01','2019-06-29 00:00:01',3),(46,0.025049,0.027124,0.025000,0.026832,1173.143130,'2019-06-30 00:00:01','2019-06-30 00:00:01',1),(47,0.000032,0.000190,0.000029,0.000032,708872.670000,'2019-06-30 00:00:01','2019-06-30 00:00:01',2),(48,0.000232,0.000295,0.000184,0.000287,111782.860000,'2019-06-30 00:00:01','2019-06-30 00:00:01',3),(49,0.000032,0.000045,0.000028,0.000033,721514.338000,'2019-07-01 00:00:01','2019-07-01 00:00:01',2),(50,0.000288,0.000288,0.000169,0.000204,117222.758000,'2019-07-01 00:00:01','2019-07-01 00:00:01',3),(51,0.000210,0.000270,0.000176,0.000191,118550.531000,'2019-07-02 00:00:01','2019-07-02 00:00:01',3),(52,0.000033,0.000172,0.000029,0.000034,703658.741000,'2019-07-03 00:00:00','2019-07-03 00:00:00',2),(53,0.000196,0.000299,0.000171,0.000276,118776.528000,'2019-07-03 00:00:01','2019-07-03 00:00:01',3),(54,0.000034,0.000043,0.000028,0.000033,735673.651000,'2019-07-04 00:00:01','2019-07-04 00:00:01',2),(55,0.000276,0.000305,0.000179,0.000219,114191.131000,'2019-07-04 00:00:01','2019-07-04 00:00:01',3),(56,0.025218,0.025647,0.024850,0.025361,1170.521320,'2019-07-05 00:00:00','2019-07-05 00:00:00',1),(57,0.000032,0.000045,0.000027,0.000031,739334.114000,'2019-07-05 00:00:00','2019-07-05 00:00:00',2),(58,0.000219,0.000254,0.000177,0.000193,118423.928000,'2019-07-05 00:00:01','2019-07-05 00:00:01',3),(59,0.025612,0.027070,0.025569,0.026712,808.259870,'2019-07-08 00:00:00','2019-07-08 00:00:00',1),(60,0.026728,0.026932,0.025265,0.025471,1176.625270,'2019-07-09 00:00:01','2019-07-09 00:00:01',1),(61,0.000037,0.000111,0.000037,0.000099,93133.286000,'2019-07-23 00:00:01','2019-07-23 00:00:01',2),(62,0.000192,0.000374,0.000038,0.000317,23345.923000,'2019-07-23 00:00:01','2019-07-23 00:00:01',3),(63,0.000105,0.000142,0.000085,0.000109,718984.749000,'2019-07-24 00:00:00','2019-07-24 00:00:00',2),(64,0.000333,0.000586,0.000305,0.000455,176131.136000,'2019-07-24 00:00:01','2019-07-24 00:00:01',3),(65,0.021548,0.022492,0.020895,0.022165,685.864170,'2019-07-25 00:00:00','2019-07-25 00:00:00',1),(66,0.000109,0.000231,0.000090,0.000118,701790.079000,'2019-07-25 00:00:01','2019-07-25 00:00:01',2),(67,0.000455,0.000580,0.000399,0.000425,169175.652000,'2019-07-25 00:00:01','2019-07-25 00:00:01',3),(68,0.000118,0.000146,0.000096,0.000101,686366.945000,'2019-07-26 00:00:00','2019-07-26 00:00:00',2),(69,0.000420,0.000575,0.000362,0.000452,177451.923000,'2019-07-26 00:00:01','2019-07-26 00:00:01',3),(70,0.000101,0.000393,0.000088,0.000120,688046.986000,'2019-07-27 00:00:01','2019-07-27 00:00:01',2),(71,0.000449,0.000600,0.000371,0.000418,175514.014000,'2019-07-27 00:00:01','2019-07-27 00:00:01',3),(72,0.022260,0.022280,0.021626,0.021848,797.312010,'2019-07-28 00:00:00','2019-07-28 00:00:00',1),(73,0.000119,0.000498,0.000092,0.000102,690628.537000,'2019-07-28 00:00:01','2019-07-28 00:00:01',2),(74,0.000408,0.000652,0.000386,0.000481,162976.848000,'2019-07-28 00:00:01','2019-07-28 00:00:01',3),(75,0.000104,0.000142,0.000092,0.000103,695068.452000,'2019-07-29 00:00:01','2019-07-29 00:00:01',2),(76,0.000479,0.000644,0.000377,0.000397,169994.058000,'2019-07-29 00:00:02','2019-07-29 00:00:02',3),(77,0.000108,0.000257,0.000092,0.000099,679306.464000,'2019-07-30 00:00:01','2019-07-30 00:00:01',2),(78,0.000391,0.000556,0.000357,0.000432,171705.563000,'2019-07-30 00:00:02','2019-07-30 00:00:02',3),(79,0.022161,0.022205,0.021792,0.021890,561.327270,'2019-07-31 00:00:00','2019-07-31 00:00:00',1),(80,0.000099,0.000214,0.000090,0.000108,674357.082000,'2019-07-31 00:00:01','2019-07-31 00:00:01',2),(81,0.000445,0.000671,0.000392,0.000487,160685.664000,'2019-07-31 00:00:01','2019-07-31 00:00:01',3),(82,0.000106,0.000163,0.000092,0.000107,659431.447000,'2019-08-01 00:00:01','2019-08-01 00:00:01',2),(83,0.000493,0.000596,0.000357,0.000547,178704.722000,'2019-08-01 00:00:01','2019-08-01 00:00:01',3),(84,0.000107,0.000155,0.000097,0.000121,677144.371000,'2019-08-02 00:00:01','2019-08-02 00:00:01',2),(85,0.000538,0.000660,0.000378,0.000484,167669.756000,'2019-08-02 00:00:01','2019-08-02 00:00:01',3),(86,0.000119,0.000144,0.000096,0.000100,685577.422000,'2019-08-03 00:00:01','2019-08-03 00:00:01',2),(87,0.000483,0.000617,0.000384,0.000495,163834.658000,'2019-08-03 00:00:02','2019-08-03 00:00:02',3),(88,0.000100,0.000159,0.000094,0.000096,671011.127000,'2019-08-04 00:00:01','2019-08-04 00:00:01',2),(89,0.000492,0.000764,0.000370,0.000494,170624.089000,'2019-08-04 00:00:02','2019-08-04 00:00:02',3),(90,0.020523,0.020607,0.020125,0.020273,508.617090,'2019-08-05 00:00:01','2019-08-05 00:00:01',1),(91,0.000097,0.000138,0.000092,0.000100,703604.759000,'2019-08-05 00:00:01','2019-08-05 00:00:01',2),(92,0.000495,0.000612,0.000404,0.000405,162123.429000,'2019-08-05 00:00:02','2019-08-05 00:00:02',3),(93,0.020300,0.020360,0.019415,0.019770,1021.218290,'2019-08-06 00:00:01','2019-08-06 00:00:01',1),(94,0.000100,0.000151,0.000092,0.000105,679162.597000,'2019-08-06 00:00:01','2019-08-06 00:00:01',2),(95,0.000404,0.000544,0.000360,0.000416,170921.153000,'2019-08-06 00:00:02','2019-08-06 00:00:02',3),(96,0.000105,0.000160,0.000092,0.000105,683842.657000,'2019-08-07 00:00:01','2019-08-07 00:00:01',2),(97,0.000415,0.000778,0.000363,0.000438,166648.450000,'2019-08-07 00:00:02','2019-08-07 00:00:02',3),(98,0.000103,0.000501,0.000087,0.000106,671892.345000,'2019-08-08 00:00:01','2019-08-08 00:00:01',2),(99,0.000444,0.000607,0.000376,0.000452,164216.825000,'2019-08-08 00:00:02','2019-08-08 00:00:02',3),(100,0.018899,0.019099,0.018396,0.018431,1063.433880,'2019-08-09 00:00:01','2019-08-09 00:00:01',1),(101,0.000108,0.000147,0.000096,0.000104,656696.006000,'2019-08-09 00:00:01','2019-08-09 00:00:01',2),(102,0.000451,0.000589,0.000370,0.000449,168667.316000,'2019-08-09 00:00:02','2019-08-09 00:00:02',3),(103,0.000105,0.000373,0.000091,0.000118,682297.312000,'2019-08-10 00:00:01','2019-08-10 00:00:01',2),(104,0.000449,0.000592,0.000377,0.000432,167462.255000,'2019-08-10 00:00:02','2019-08-10 00:00:02',3),(105,0.000123,0.000275,0.000098,0.000105,648295.657000,'2019-08-11 00:00:01','2019-08-11 00:00:01',2),(106,0.000433,0.000558,0.000381,0.000401,160210.806000,'2019-08-11 00:00:02','2019-08-11 00:00:02',3),(107,0.018260,0.018981,0.018254,0.018708,1159.296130,'2019-08-12 00:00:00','2019-08-12 00:00:00',1),(108,0.000107,0.000132,0.000090,0.000109,677408.734000,'2019-08-12 00:00:01','2019-08-12 00:00:01',2),(109,0.000415,0.000616,0.000383,0.000474,159218.753000,'2019-08-12 00:00:01','2019-08-12 00:00:01',3),(110,0.000109,0.000205,0.000088,0.000113,665823.079000,'2019-08-13 00:00:01','2019-08-13 00:00:01',2),(111,0.000465,0.000604,0.000376,0.000397,162781.794000,'2019-08-13 00:00:02','2019-08-13 00:00:02',3),(112,0.018565,0.019273,0.018357,0.019214,1144.830330,'2019-08-14 00:00:01','2019-08-14 00:00:01',1),(113,0.000111,0.000148,0.000094,0.000118,691261.804000,'2019-08-14 00:00:01','2019-08-14 00:00:01',2),(114,0.000419,0.000586,0.000359,0.000472,169730.549000,'2019-08-14 00:00:02','2019-08-14 00:00:02',3),(115,0.000117,0.000171,0.000097,0.000108,691430.996000,'2019-08-15 00:00:01','2019-08-15 00:00:01',2),(116,0.000474,0.000628,0.000326,0.000381,188191.653000,'2019-08-15 00:00:02','2019-08-15 00:00:02',3),(117,0.000111,0.000143,0.000088,0.000106,699358.909000,'2019-08-16 00:00:02','2019-08-16 00:00:02',2),(118,0.000396,0.000513,0.000351,0.000383,187479.626000,'2019-08-16 00:00:03','2019-08-16 00:00:03',3),(119,0.018288,0.018498,0.017616,0.017896,645.603210,'2019-08-17 00:00:01','2019-08-17 00:00:01',1),(120,0.000107,0.000171,0.000096,0.000121,658362.639000,'2019-08-17 00:00:02','2019-08-17 00:00:02',2),(121,0.000379,0.000506,0.000337,0.000377,189274.307000,'2019-08-17 00:00:02','2019-08-17 00:00:02',3),(122,0.000122,0.000153,0.000097,0.000097,689385.608000,'2019-08-18 00:00:02','2019-08-18 00:00:02',2),(123,0.000376,0.000553,0.000344,0.000409,179406.035000,'2019-08-18 00:00:02','2019-08-18 00:00:02',3),(124,0.000098,0.000143,0.000091,0.000104,700363.310000,'2019-08-19 00:00:02','2019-08-19 00:00:02',2),(125,0.000411,0.000583,0.000332,0.000486,181919.516000,'2019-08-19 00:00:02','2019-08-19 00:00:02',3),(126,0.000106,0.000362,0.000094,0.000098,712465.956000,'2019-08-20 00:00:02','2019-08-20 00:00:02',2),(127,0.000479,0.000517,0.000344,0.000396,184935.625000,'2019-08-20 00:00:03','2019-08-20 00:00:03',3),(128,0.000096,0.000161,0.000091,0.000132,690552.929000,'2019-08-21 00:00:02','2019-08-21 00:00:02',2),(129,0.000396,0.000513,0.000357,0.000372,186717.689000,'2019-08-21 00:00:03','2019-08-21 00:00:03',3),(130,0.000132,0.000146,0.000096,0.000104,690938.789000,'2019-08-22 00:00:02','2019-08-22 00:00:02',2),(131,0.000378,0.000588,0.000349,0.000371,184711.486000,'2019-08-22 00:00:03','2019-08-22 00:00:03',3),(132,0.000104,0.000347,0.000090,0.000093,712004.451000,'2019-08-23 00:00:02','2019-08-23 00:00:02',2),(133,0.000382,0.000496,0.000350,0.000413,186896.685000,'2019-08-23 00:00:03','2019-08-23 00:00:03',3),(134,0.000093,0.000352,0.000088,0.000147,700024.713000,'2019-08-24 00:00:02','2019-08-24 00:00:02',2),(135,0.000413,0.000578,0.000333,0.000434,185807.492000,'2019-08-24 00:00:03','2019-08-24 00:00:03',3),(136,0.000147,0.000454,0.000085,0.000086,724334.446000,'2019-08-25 00:00:02','2019-08-25 00:00:02',2),(137,0.000433,0.000586,0.000371,0.000487,175650.536000,'2019-08-25 00:00:03','2019-08-25 00:00:03',3),(138,0.000087,0.000142,0.000083,0.000107,711178.181000,'2019-08-26 00:00:02','2019-08-26 00:00:02',2),(139,0.000484,0.000571,0.000352,0.000352,183958.910000,'2019-08-26 00:00:02','2019-08-26 00:00:02',3),(140,0.000105,0.000172,0.000091,0.000103,691796.886000,'2019-08-27 00:00:02','2019-08-27 00:00:02',2),(141,0.000352,0.000574,0.000347,0.000434,175021.007000,'2019-08-27 00:00:03','2019-08-27 00:00:03',3),(142,0.000103,0.000133,0.000084,0.000101,645486.309000,'2019-08-28 00:00:02','2019-08-28 00:00:02',2),(143,0.000431,0.000527,0.000335,0.000398,161980.038000,'2019-08-28 00:00:03','2019-08-28 00:00:03',3),(144,0.000101,0.000142,0.000085,0.000102,695403.720000,'2019-08-29 00:00:02','2019-08-29 00:00:02',2),(145,0.000396,0.000576,0.000330,0.000358,175628.836000,'2019-08-29 00:00:03','2019-08-29 00:00:03',3),(146,0.017815,0.017958,0.017515,0.017804,852.038780,'2019-08-30 00:00:01','2019-08-30 00:00:01',1),(147,0.000103,0.000131,0.000091,0.000108,603427.464000,'2019-08-30 00:00:01','2019-08-30 00:00:01',2),(148,0.000356,0.000561,0.000348,0.000383,155258.588000,'2019-08-30 00:00:02','2019-08-30 00:00:02',3),(149,0.017804,0.017923,0.017500,0.017576,645.794580,'2019-08-31 00:00:01','2019-08-31 00:00:01',1),(150,0.017576,0.018090,0.017390,0.017900,1208.791010,'2019-09-01 00:00:01','2019-09-01 00:00:01',1),(151,0.017938,0.018006,0.017513,0.017559,628.968550,'2019-09-02 00:00:01','2019-09-02 00:00:01',1),(152,0.000125,0.000176,0.000107,0.000111,67673.799000,'2019-09-02 00:00:01','2019-09-02 00:00:01',2),(153,0.000393,0.000506,0.000378,0.000426,18822.030000,'2019-09-02 00:00:02','2019-09-02 00:00:02',3),(154,0.016926,0.016991,0.016825,0.016848,222.957250,'2019-09-04 00:00:01','2019-09-04 00:00:01',1),(155,0.000098,0.000123,0.000090,0.000114,208687.212000,'2019-09-04 00:00:02','2019-09-04 00:00:02',2),(156,0.000367,0.000459,0.000359,0.000369,54541.952000,'2019-09-04 00:00:02','2019-09-04 00:00:02',3),(157,0.000113,0.000177,0.000090,0.000106,717241.050000,'2019-09-05 00:00:02','2019-09-05 00:00:02',2),(158,0.000366,0.000562,0.000340,0.000362,190141.322000,'2019-09-05 00:00:02','2019-09-05 00:00:02',3),(159,0.000365,0.000516,0.000326,0.000356,196509.011000,'2019-09-06 00:00:02','2019-09-06 00:00:02',3),(160,0.000437,0.000600,0.000361,0.000382,184164.074000,'2019-09-18 00:00:03','2019-09-18 00:00:03',3),(161,0.000114,0.000146,0.000089,0.000107,711809.858000,'2019-09-19 00:00:03','2019-09-19 00:00:03',2),(162,0.000102,0.000209,0.000096,0.000100,344980.375000,'2019-10-02 00:00:02','2019-10-02 00:00:02',2),(163,0.000393,0.000518,0.000349,0.000393,93434.889000,'2019-10-02 00:00:03','2019-10-02 00:00:03',3),(164,0.000101,0.000369,0.000091,0.000109,703180.343000,'2019-10-03 00:00:02','2019-10-03 00:00:02',2),(165,0.000393,0.000580,0.000353,0.000401,187892.118000,'2019-10-03 00:00:03','2019-10-03 00:00:03',3),(166,0.021515,0.021560,0.020979,0.021238,1006.587530,'2019-10-04 00:00:02','2019-10-04 00:00:02',1),(167,0.000112,0.000143,0.000095,0.000100,715027.288000,'2019-10-04 00:00:03','2019-10-04 00:00:03',2),(168,0.000405,0.000536,0.000334,0.000390,195696.482000,'2019-10-04 00:00:03','2019-10-04 00:00:03',3),(169,0.000100,0.000186,0.000093,0.000114,679450.058000,'2019-10-05 00:00:03','2019-10-05 00:00:03',2),(170,0.000380,0.000510,0.000342,0.000385,191316.164000,'2019-10-05 00:00:03','2019-10-05 00:00:03',3),(171,0.000112,0.000216,0.000087,0.000128,723054.124000,'2019-10-06 00:00:03','2019-10-06 00:00:03',2),(172,0.000385,0.000601,0.000324,0.000469,192968.887000,'2019-10-06 00:00:04','2019-10-06 00:00:04',3),(173,0.000124,0.000157,0.000096,0.000105,703434.833000,'2019-10-07 00:00:03','2019-10-07 00:00:03',2),(174,0.000469,0.000562,0.000353,0.000488,186485.824000,'2019-10-07 00:00:04','2019-10-07 00:00:04',3),(175,0.000104,0.000135,0.000087,0.000090,753082.253000,'2019-10-08 00:00:03','2019-10-08 00:00:03',2),(176,0.000487,0.000599,0.000356,0.000446,183910.442000,'2019-10-08 00:00:04','2019-10-08 00:00:04',3),(177,0.021954,0.022312,0.021791,0.022107,1072.582230,'2019-10-09 00:00:01','2019-10-09 00:00:01',1),(178,0.000090,0.000149,0.000089,0.000114,713715.966000,'2019-10-09 00:00:03','2019-10-09 00:00:03',2),(179,0.000449,0.000650,0.000333,0.000464,189813.843000,'2019-10-09 00:00:04','2019-10-09 00:00:04',3),(180,0.022121,0.023025,0.022029,0.022504,1221.478620,'2019-10-10 00:00:02','2019-10-10 00:00:02',1),(181,0.000115,0.000191,0.000093,0.000107,700313.306000,'2019-10-10 00:00:03','2019-10-10 00:00:03',2),(182,0.000462,0.000592,0.000356,0.000356,185487.487000,'2019-10-10 00:00:04','2019-10-10 00:00:04',3),(183,0.000103,0.000149,0.000087,0.000098,721479.922000,'2019-10-11 00:00:03','2019-10-11 00:00:03',2),(184,0.000370,0.000568,0.000347,0.000427,180950.866000,'2019-10-11 00:00:04','2019-10-11 00:00:04',3),(185,0.000097,0.000383,0.000084,0.000111,739657.220000,'2019-10-12 00:00:03','2019-10-12 00:00:03',2),(186,0.000429,0.000516,0.000344,0.000419,188116.306000,'2019-10-12 00:00:04','2019-10-12 00:00:04',3),(187,0.021860,0.022100,0.021446,0.021660,811.046020,'2019-10-13 00:00:01','2019-10-13 00:00:01',1),(188,0.000117,0.000138,0.000090,0.000096,733567.954000,'2019-10-13 00:00:03','2019-10-13 00:00:03',2),(189,0.000427,0.000540,0.000367,0.000420,182219.948000,'2019-10-13 00:00:04','2019-10-13 00:00:04',3),(190,0.021640,0.022000,0.021587,0.021871,835.389470,'2019-10-14 00:00:02','2019-10-14 00:00:02',1),(191,0.000099,0.000370,0.000082,0.000115,720168.584000,'2019-10-14 00:00:03','2019-10-14 00:00:03',2),(192,0.000422,0.000539,0.000343,0.000415,191442.093000,'2019-10-14 00:00:04','2019-10-14 00:00:04',3),(193,0.000115,0.000419,0.000092,0.000116,721235.244000,'2019-10-15 00:00:03','2019-10-15 00:00:03',2),(194,0.000418,0.000540,0.000350,0.000401,192688.170000,'2019-10-15 00:00:04','2019-10-15 00:00:04',3),(195,0.022368,0.022500,0.021865,0.022128,660.415020,'2019-10-16 00:00:02','2019-10-16 00:00:02',1),(196,0.000117,0.000158,0.000097,0.000118,687758.752000,'2019-10-16 00:00:04','2019-10-16 00:00:04',2),(197,0.000401,0.000535,0.000371,0.000378,182598.703000,'2019-10-16 00:00:05','2019-10-16 00:00:05',3),(198,0.000118,0.000157,0.000088,0.000089,734646.263000,'2019-10-17 00:00:03','2019-10-17 00:00:03',2),(199,0.000381,0.000546,0.000328,0.000400,193093.119000,'2019-10-17 00:00:05','2019-10-17 00:00:05',3),(200,0.000089,0.000181,0.000088,0.000114,675297.634000,'2019-10-18 00:00:03','2019-10-18 00:00:03',2),(201,0.000398,0.000533,0.000329,0.000407,190669.461000,'2019-10-18 00:00:04','2019-10-18 00:00:04',3),(202,0.000130,0.000253,0.000090,0.000106,722706.615000,'2019-10-19 00:00:03','2019-10-19 00:00:03',2),(203,0.000407,0.000645,0.000357,0.000413,181070.771000,'2019-10-19 00:00:04','2019-10-19 00:00:04',3),(204,0.000115,0.000123,0.000096,0.000113,138460.182000,'2019-11-12 00:00:03','2019-11-12 00:00:03',2),(205,0.000401,0.000550,0.000366,0.000401,35844.143000,'2019-11-12 00:00:04','2019-11-12 00:00:04',3),(206,0.021695,0.021770,0.021394,0.021625,746.906340,'2019-11-20 00:00:02','2019-11-20 00:00:02',1),(207,0.000111,0.000172,0.000098,0.000124,587555.161000,'2019-11-20 00:00:03','2019-11-20 00:00:03',2),(208,0.000442,0.000587,0.000339,0.000435,165545.656000,'2019-11-20 00:00:04','2019-11-20 00:00:04',3),(209,0.000124,0.000153,0.000102,0.000117,689577.750000,'2019-11-21 00:00:03','2019-11-21 00:00:03',2),(210,0.000442,0.000614,0.000348,0.000483,187808.899000,'2019-11-21 00:00:04','2019-11-21 00:00:04',3);
/*!40000 ALTER TABLE `PriceDay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PriceMinute`
--

DROP TABLE IF EXISTS `PriceMinute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PriceMinute` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `open` decimal(15,6) NOT NULL DEFAULT '0.000000',
  `high` decimal(15,6) NOT NULL DEFAULT '0.000000',
  `low` decimal(15,6) NOT NULL DEFAULT '0.000000',
  `close` decimal(15,6) NOT NULL DEFAULT '0.000000',
  `volume` decimal(15,6) NOT NULL DEFAULT '0.000000',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `pairId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pairId` (`pairId`),
  CONSTRAINT `PriceMinute_ibfk_1` FOREIGN KEY (`pairId`) REFERENCES `Pair` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=364567 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PriceMinute`
--

LOCK TABLES `PriceMinute` WRITE;
/*!40000 ALTER TABLE `PriceMinute` DISABLE KEYS */;
/*!40000 ALTER TABLE `PriceMinute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PriceTick`
--

DROP TABLE IF EXISTS `PriceTick`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PriceTick` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `price` decimal(21,9) NOT NULL DEFAULT '0.000000000',
  `volume` decimal(21,9) NOT NULL DEFAULT '0.000000000',
  `createdAt` datetime NOT NULL,
  `pairId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pairId` (`pairId`),
  CONSTRAINT `PriceTick_ibfk_1` FOREIGN KEY (`pairId`) REFERENCES `Pair` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3361519 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PriceTick`
--

LOCK TABLES `PriceTick` WRITE;
/*!40000 ALTER TABLE `PriceTick` DISABLE KEYS */;
/*!40000 ALTER TABLE `PriceTick` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reward`
--

DROP TABLE IF EXISTS `Reward`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reward` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(30,18) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `tokenId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `tokenId` (`tokenId`),
  CONSTRAINT `Reward_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Reward_ibfk_2` FOREIGN KEY (`tokenId`) REFERENCES `Token` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reward`
--

LOCK TABLES `Reward` WRITE;
/*!40000 ALTER TABLE `Reward` DISABLE KEYS */;
INSERT INTO `Reward` VALUES (1,306.233900291726250000,'2019-06-09 00:32:00','2019-08-31 19:30:00',NULL,3),(2,312.000000000000000000,'2019-06-09 11:25:00','2019-08-31 19:30:00',NULL,3),(3,312.000000000000000000,'2019-06-09 11:36:30','2019-08-31 19:30:00',NULL,3),(4,312.000000000000000000,'2019-06-09 12:12:29','2019-08-31 19:30:00',NULL,3),(5,301.482232878971451000,'2019-06-09 12:12:30','2019-08-31 19:30:00',NULL,3);
/*!40000 ALTER TABLE `Reward` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Setting`
--

DROP TABLE IF EXISTS `Setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Setting` (
  `applicationName` varchar(50) NOT NULL,
  `sectionName` varchar(50) NOT NULL,
  `settingName` varchar(50) NOT NULL,
  `settingValue` varchar(1000) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `settingTypeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`applicationName`,`sectionName`,`settingName`),
  KEY `settingTypeId` (`settingTypeId`),
  CONSTRAINT `Setting_ibfk_1` FOREIGN KEY (`settingTypeId`) REFERENCES `SettingType` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Setting`
--

LOCK TABLES `Setting` WRITE;
/*!40000 ALTER TABLE `Setting` DISABLE KEYS */;
INSERT INTO `Setting` VALUES ('IXP-BTC','main','lastCheckedBlock','00000000000000000005baef54e60f93f53aa91fbcd5436e368388ca6fb578c8','2019-06-08 23:36:01','2019-09-03 19:55:00',1),('IXP-ETH','main','lastCheckedBlock','6300520','2019-06-08 23:36:01','2019-09-03 17:15:32',2);
/*!40000 ALTER TABLE `Setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SettingType`
--

DROP TABLE IF EXISTS `SettingType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SettingType` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SettingType`
--

LOCK TABLES `SettingType` WRITE;
/*!40000 ALTER TABLE `SettingType` DISABLE KEYS */;
INSERT INTO `SettingType` VALUES (1,'string','2019-06-08 23:36:01','2019-06-08 23:36:07'),(2,'int','2019-06-08 23:36:01','2019-06-08 23:36:07'),(3,'float','2019-06-08 23:36:01','2019-06-08 23:36:07'),(4,'double','2019-06-08 23:36:01','2019-06-08 23:36:07'),(5,'boolean','2019-06-08 23:36:01','2019-06-08 23:36:07');
/*!40000 ALTER TABLE `SettingType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Timezone`
--

DROP TABLE IF EXISTS `Timezone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Timezone` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `tvCategory` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Timezone`
--

LOCK TABLES `Timezone` WRITE;
/*!40000 ALTER TABLE `Timezone` DISABLE KEYS */;
INSERT INTO `Timezone` VALUES (1,'America/New_York (-05:00)','America/New_York'),(2,'America/Honolulu (-05:00)','America/Honolulu'),(3,'America/Los_Angeles (-08:00)','America/Los_Angeles'),(4,'America/Chicago (-06:00)','America/Chicago'),(5,'America/Toronto (-05:00)','America/Toronto'),(6,'America/Vancouver (-08:00)','America/Vancouver'),(7,'America/Argentina/Buenos_Aires (-03:00)','America/Argentina/Buenos_Aires'),(8,'America/Bogota (-05:00)','America/Bogota'),(9,'America/Sao_Paulo (-02:00)','America/Sao_Paulo'),(10,'America/Phoenix (-07:00)','America/Phoenix'),(11,'America/Mexico_City (-06:00)','America/Mexico_City'),(12,'America/San_Salvador (-06:00)','America/San_Salvador'),(13,'America/Caracas (-04:00)','America/Caracas'),(14,'America/Sao_Paulo (-02:00)','America/Sao_Paulo'),(15,'Europe/Belgrade (+01:00)','Europe/Belgrade'),(16,'Europe/Luxembourg (+01:00)','Europe/Luxembourg'),(17,'Europe/Rome (+01:00)','Europe/Rome'),(18,'Europe/Moscow (+03:00)','Europe/Moscow'),(19,'Europe/Athens (+02:00)','Europe/Athens'),(20,'Europe/Berlin (+01:00)','Europe/Berlin'),(21,'Europe/London (+00:00)','Europe/London'),(22,'Europe/Zurich (+01:00)','Europe/Zurich'),(23,'Europe/Madrid (+01:00)','Europe/Madrid'),(24,'Europe/Paris (+01:00)','Europe/Paris'),(25,'Europe/Istanbul (+03:00)','Europe/Istanbul'),(26,'Europe/Warsaw (+01:00)','Europe/Warsaw'),(27,'Africa/Cairo (+02:00)','Africa/Cairo'),(28,'Australia/Sydney (+11:00)','Australia/Sydney'),(29,'Australia/Brisbane (+10:00)','Australia/Brisbane'),(30,'Australia/Adelaide (+10:30)','Australia/Adelaide'),(31,'Pacific/Auckland (+13:00)','Pacific/Auckland'),(32,'Pacific/Chatham (+13:45)','Pacific/Chatham'),(33,'Asia/Juresalem (+13:45)','Asia/Juresalem'),(34,'Asia/Kuwait (+03:00)','Asia/Kuwait'),(35,'Asia/Moscow (+03:00)','Asia/Moscow'),(36,'Asia/Qatar (+03:00)','Asia/Qatar'),(37,'Asia/Riyadh (+03:00)','Asia/Riyadh'),(38,'Asia/Tehran (+03:30)','Asia/Tehran'),(39,'Asia/Dubai (+04:00)','Asia/Dubai'),(40,'Asia/Muscat (+04:00)','Asia/Muscat'),(41,'Asia/Ashkhabad (+05:00)','Asia/Ashkhabad'),(42,'Asia/Almati (+05:00)','Asia/Almati'),(43,'Asia/Bangkok (+07:00)','Asia/Bangkok'),(44,'Asia/Chongqing (+08:00)','Asia/Chongqing'),(45,'Asia/Tokyo (+09:00)','Asia/Tokyo'),(46,'Asia/Taipei (+08:00)','Asia/Taipei'),(47,'Asia/Singapore (+08:00)','Asia/Singapore'),(48,'Asia/Shanghai (+08:00)','Asia/Shanghai'),(49,'Asia/Seoul (+09:00)','Asia/Seoul'),(50,'Asia/Kolkata (+05:30)','Asia/Kolkata'),(51,'Asia/Hong_Kong (+08:00)','Asia/Hong_Kong');
/*!40000 ALTER TABLE `Timezone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Token`
--

DROP TABLE IF EXISTS `Token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `contractAddress` varchar(1000) DEFAULT NULL,
  `contractAbi` varchar(10000) DEFAULT NULL,
  `symbol` varchar(50) NOT NULL,
  `decimalPrecision` int(11) NOT NULL,
  `issuedByPlatform` tinyint(1) NOT NULL,
  `logoUrl` varchar(1000) NOT NULL,
  `marketCap` int(11) DEFAULT NULL,
  `tokenCap` decimal(21,9) DEFAULT NULL,
  `minimumWithdrawalAmount` decimal(21,9) NOT NULL DEFAULT '0.000000000',
  `withdrawalFee` decimal(15,6) NOT NULL DEFAULT '0.000000',
  `enabled` tinyint(1) NOT NULL DEFAULT '0',
  `confirmationRequired` int(11) NOT NULL DEFAULT '10',
  `usdPrice` decimal(15,2) NOT NULL,
  `privateSaleEnabled` tinyint(1) NOT NULL DEFAULT '0',
  `maxAllowedAmountForBuy` int(11) NOT NULL DEFAULT '10000',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `typeId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `typeId` (`typeId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `Token_ibfk_10` FOREIGN KEY (`categoryId`) REFERENCES `TokenCategory` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Token_ibfk_9` FOREIGN KEY (`typeId`) REFERENCES `TokenType` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Token`
--

LOCK TABLES `Token` WRITE;
/*!40000 ALTER TABLE `Token` DISABLE KEYS */;
INSERT INTO `Token` VALUES (1,'Ethereum',NULL,NULL,'ETH',8,0,'ether-logo.png',NULL,100000000.000000000,0.020000000,0.010000,1,10,146.12,0,10000,'2019-06-08 23:36:01','2019-06-08 23:36:07',2,1),(2,'Bitcoin',NULL,NULL,'BTC',8,0,'bitcoin-logo.png',NULL,21000000.000000000,0.002000000,0.001000,1,6,7071.88,0,10000,'2019-06-08 23:36:01','2019-06-08 23:36:07',1,1),(3,'Invo','0x3b108A79d266e270891A9BF9187d610Ce8106dbD',NULL,'INVO',8,1,'invo-logo.png',NULL,888000000.000000000,50.000000000,10.000000,1,10,0.08,1,50000,'2019-06-08 23:36:01','2019-06-08 23:36:07',2,2),(4,'Tradiz','0xFCCb9Cc0aF1033bD78A0617de8423304360C9a18',NULL,'TRZ',8,1,'tradiz-logo.png',NULL,888000000.000000000,10.000000000,2.000000,1,10,0.50,1,50000,'2019-06-08 23:36:01','2019-06-08 23:36:07',2,2);
/*!40000 ALTER TABLE `Token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TokenCategory`
--

DROP TABLE IF EXISTS `TokenCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TokenCategory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TokenCategory`
--

LOCK TABLES `TokenCategory` WRITE;
/*!40000 ALTER TABLE `TokenCategory` DISABLE KEYS */;
INSERT INTO `TokenCategory` VALUES (1,'Currency','2019-06-08 23:36:01','2019-06-08 23:36:07'),(2,'Utility','2019-06-08 23:36:01','2019-06-08 23:36:07'),(3,'Equity','2019-06-08 23:36:01','2019-06-08 23:36:07'),(4,'Asset','2019-06-08 23:36:01','2019-06-08 23:36:07'),(5,'Dividend','2019-06-08 23:36:01','2019-06-08 23:36:07');
/*!40000 ALTER TABLE `TokenCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TokenType`
--

DROP TABLE IF EXISTS `TokenType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TokenType` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TokenType`
--

LOCK TABLES `TokenType` WRITE;
/*!40000 ALTER TABLE `TokenType` DISABLE KEYS */;
INSERT INTO `TokenType` VALUES (1,'BTC','2019-06-08 23:36:01','2019-06-08 23:36:07'),(2,'ERC-20','2019-06-08 23:36:01','2019-06-08 23:36:07'),(3,'OTHER','2019-06-08 23:36:01','2019-06-08 23:36:07');
/*!40000 ALTER TABLE `TokenType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Trade`
--

DROP TABLE IF EXISTS `Trade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Trade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `price` decimal(21,9) NOT NULL DEFAULT '0.000000000',
  `amount` decimal(21,9) NOT NULL DEFAULT '0.000000000',
  `sellOrderId` int(11) DEFAULT NULL,
  `buyOrderId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `pairId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `compositeIndex` (`sellOrderId`,`buyOrderId`),
  KEY `buyOrderId` (`buyOrderId`),
  KEY `pairId` (`pairId`),
  CONSTRAINT `Trade_ibfk_1` FOREIGN KEY (`sellOrderId`) REFERENCES `Order` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Trade_ibfk_2` FOREIGN KEY (`buyOrderId`) REFERENCES `Order` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Trade_ibfk_3` FOREIGN KEY (`pairId`) REFERENCES `Pair` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2559235 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Trade`
--

LOCK TABLES `Trade` WRITE;
/*!40000 ALTER TABLE `Trade` DISABLE KEYS */;
/*!40000 ALTER TABLE `Trade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TradeFee`
--

DROP TABLE IF EXISTS `TradeFee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TradeFee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `makerFee` decimal(4,4) NOT NULL,
  `takerFee` decimal(4,4) NOT NULL,
  `minVolume` int(11) DEFAULT NULL,
  `maxVolume` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `pairId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pairId` (`pairId`),
  CONSTRAINT `TradeFee_ibfk_1` FOREIGN KEY (`pairId`) REFERENCES `Pair` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TradeFee`
--

LOCK TABLES `TradeFee` WRITE;
/*!40000 ALTER TABLE `TradeFee` DISABLE KEYS */;
INSERT INTO `TradeFee` VALUES (1,0.0020,0.0020,NULL,NULL,'2019-06-08 23:36:01','2019-06-08 23:36:07',1),(2,0.0020,0.0020,NULL,NULL,'2019-06-08 23:36:01','2019-06-08 23:36:07',2),(3,0.0020,0.0020,NULL,NULL,'2019-06-08 23:36:01','2019-06-08 23:36:07',3);
/*!40000 ALTER TABLE `TradeFee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Transaction`
--

DROP TABLE IF EXISTS `Transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Transaction` (
  `txHash` varchar(255) NOT NULL,
  `amount` decimal(21,9) NOT NULL,
  `isBankPayment` tinyint(1) NOT NULL DEFAULT '0',
  `blockNumber` decimal(10,0) DEFAULT NULL,
  `blockHash` varchar(255) DEFAULT NULL,
  `confirmations` decimal(10,0) DEFAULT '0',
  `usdPriceAtTransactionTime` decimal(21,9) NOT NULL DEFAULT '0.000000000',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `sourceId` int(11) DEFAULT NULL,
  `destinationId` int(11) DEFAULT NULL,
  `statusId` int(11) DEFAULT NULL,
  PRIMARY KEY (`txHash`),
  KEY `sourceId` (`sourceId`),
  KEY `destinationId` (`destinationId`),
  KEY `statusId` (`statusId`),
  CONSTRAINT `Transaction_ibfk_1` FOREIGN KEY (`sourceId`) REFERENCES `Wallet` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Transaction_ibfk_2` FOREIGN KEY (`destinationId`) REFERENCES `Wallet` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Transaction_ibfk_3` FOREIGN KEY (`statusId`) REFERENCES `TransactionStatus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Transaction`
--

LOCK TABLES `Transaction` WRITE;
/*!40000 ALTER TABLE `Transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `Transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TransactionStatus`
--

DROP TABLE IF EXISTS `TransactionStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TransactionStatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TransactionStatus`
--

LOCK TABLES `TransactionStatus` WRITE;
/*!40000 ALTER TABLE `TransactionStatus` DISABLE KEYS */;
INSERT INTO `TransactionStatus` VALUES (1,'Waiting','2019-06-08 23:36:01','2019-06-08 23:36:07'),(2,'Cancelled','2019-06-08 23:36:01','2019-06-08 23:36:07'),(3,'Pending','2019-06-08 23:36:01','2019-06-08 23:36:07'),(4,'Rejection','2019-06-08 23:36:01','2019-06-08 23:36:07'),(5,'BlockchainRejection','2019-06-08 23:36:01','2019-06-08 23:36:07'),(6,'Completed','2019-06-08 23:36:01','2019-06-08 23:36:07');
/*!40000 ALTER TABLE `TransactionStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UnconfirmedTransaction`
--

DROP TABLE IF EXISTS `UnconfirmedTransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UnconfirmedTransaction` (
  `txHash` varchar(255) NOT NULL,
  `amount` decimal(21,9) NOT NULL,
  `sourceId` int(11) DEFAULT NULL,
  `destinationId` int(11) DEFAULT NULL,
  `blockNumber` decimal(10,0) DEFAULT NULL,
  `blockHash` varchar(255) DEFAULT NULL,
  `confirmations` decimal(10,0) DEFAULT '0',
  `usdPriceAtTransactionTime` decimal(21,9) NOT NULL DEFAULT '0.000000000',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `statusId` int(11) DEFAULT NULL,
  PRIMARY KEY (`txHash`),
  KEY `sourceId` (`sourceId`),
  KEY `destinationId` (`destinationId`),
  KEY `statusId` (`statusId`),
  CONSTRAINT `UnconfirmedTransaction_ibfk_1` FOREIGN KEY (`sourceId`) REFERENCES `Wallet` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `UnconfirmedTransaction_ibfk_2` FOREIGN KEY (`destinationId`) REFERENCES `Wallet` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `UnconfirmedTransaction_ibfk_3` FOREIGN KEY (`statusId`) REFERENCES `TransactionStatus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UnconfirmedTransaction`
--

LOCK TABLES `UnconfirmedTransaction` WRITE;
/*!40000 ALTER TABLE `UnconfirmedTransaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `UnconfirmedTransaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `emailConfirmed` tinyint(1) DEFAULT '0',
  `emailConfirmationToken` varchar(64) DEFAULT NULL,
  `invitationRewardCount` decimal(10,0) DEFAULT '0',
  `resetPasswordToken` varchar(64) DEFAULT NULL,
  `resetPasswordTokenCreatedAt` datetime DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `withdrawalLimit` decimal(15,6) DEFAULT NULL,
  `feeDiscountFactor` decimal(15,6) DEFAULT NULL,
  `referredBy` int(11) DEFAULT NULL,
  `isBot` tinyint(1) DEFAULT '0',
  `isExchange` tinyint(1) DEFAULT '0',
  `isHolder` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1000047 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'mm@NYDAX.com',1,'7131ab6182e8482f65acaec3ec5a7b9ac22a6d458fa5b8fcda47a988bdc59fb3',0,NULL,NULL,'$2b$08$r4Wkezni.C2dfhZfNjvEoedVCI/9XAfA1iCNjvHAG802HZGAw6VW2',NULL,NULL,NULL,1,0,0,'2019-06-08 23:36:01','2019-06-08 23:36:07'),(2,'fee@nydax.com',1,'dab7c570aba6af02487f13d098082e5102f4b16d3cea24628c85d4c6f940cb37',0,NULL,NULL,'$2b$08$I8UpD3h4f5vlCdRe16yexunFotZnAVbHq.mi4S9SHLqN5J2NVBRIq',NULL,NULL,NULL,1,0,0,'2019-06-08 23:36:01','2019-06-08 23:36:07'),(3,'holder@nydax.com',1,'6ab1fc91bcb126e7a081d69b5d29a57c3d0da919198321765010578722695dbc',0,NULL,NULL,'$2b$08$.jZ9Grvi86gVF/YN8A2kUeAPDAQz37Oa.ElI04PUIkYPwzEBzspBq',NULL,NULL,NULL,1,0,1,'2019-06-08 23:36:01','2019-06-08 23:36:07'),(501,'bitmex@nydax.com',1,'b2134ceaf221912b29c5b04011469dc216f066067fe1df5134c43a24c7755d11',0,NULL,NULL,'$2b$08$COMoJR0GZMQl6sa/2VaPP.MafD0bwuduEaqQirC9SJ/xZ6a5YGmmi',NULL,NULL,NULL,1,1,0,'2019-06-08 23:36:01','2019-06-08 23:36:07'),(502,'binance@nydax.com',1,'2e5f028650575d10ebdd817614900da181557e54125034db004797b8fae5a725',0,NULL,NULL,'$2b$08$Bc4of7YQiPFyCHYTc5B20OFykxii7EvUBE/PWfyI3SXSNB2OBusA2',NULL,NULL,NULL,1,1,0,'2019-06-08 23:36:01','2019-06-08 23:36:07'),(1000007,'reza.agahi.88@gmail.com',1,'be150004596c1da3b14fba83c715168f4a6247dbfc423325ef1fe063760c0b15',0,NULL,NULL,'$2b$08$h6/NB3E8gYOurX5ycMDuIuMWQpiAD3QnlDmIUQqoSN30bUjj9Mz8q',NULL,NULL,NULL,0,0,0,'2019-07-08 18:49:44','2019-07-08 18:49:44'),(1000008,'zangeneh.erfan@gmail.com',1,'63af785805548c3833d22cd1d26ee3589fe994d848867bf5be7cacd6fa8d20d5',0,NULL,NULL,'$2b$08$gzOYXqCZpklaBqmh.95KjO/ul8OANmayoDdPvecmFBKrrzAPxBkMS',NULL,NULL,NULL,0,0,0,'2019-07-08 19:50:17','2019-07-08 19:50:17'),(1000013,'reza.agahi.88@outlook.com',1,NULL,0,NULL,NULL,'$2b$08$qjvlEEsoAdV3tYEh9X7uiuwLZz15ZU.l1AsZf1.KP/LGeOsqSgsr2',NULL,NULL,NULL,0,0,0,'2019-07-10 07:44:10','2019-07-10 07:58:06'),(1000015,'uozef@mexuz.com',1,NULL,0,NULL,NULL,'$2b$08$LSbeRKahTz1DiwmZHBEuF.dn198O9NhntiUHA2KhlHNMrRo1v0mx2',NULL,NULL,NULL,0,0,0,'2019-07-11 15:50:12','2019-08-14 12:38:53'),(1000016,'lindora143@gmail.com',0,'f08e8f8f38da9b6b3b3408a55549135a05a219d5dcf646eb06567afcfd494646',0,NULL,NULL,'$2b$08$r.X7Ha.maBvOoJ6qvTox3e4WtXB.dfDkWLnXPukYabXehl3KIvet.',NULL,NULL,NULL,0,0,0,'2019-07-16 16:07:45','2019-07-16 16:07:45'),(1000017,'zeleon44@gmail.com',1,NULL,0,NULL,NULL,'$2b$08$mDVMdoHy4RhSzzKt/kuZoOuM.CIx3X4SoIjqYp0aeXrhKHmm//ELi',NULL,NULL,NULL,0,0,0,'2019-07-17 02:29:36','2019-07-17 02:30:30'),(1000018,'mhfara@gmail.com',1,NULL,0,NULL,NULL,'$2b$08$PAF24TUadJwu7UsOdJ0/cuiG6QsPsmHnTiBxdQbRwohuxpZWsE1QG',NULL,NULL,NULL,0,0,0,'2019-07-18 10:37:26','2019-07-18 10:38:12'),(1000019,'murty@email.com',1,NULL,0,NULL,NULL,'$2b$08$HI2vJZVBCV9gQf/gmTjVWOgsrIFEwDzQM08plf2kpr9pyidMuYSkW',NULL,NULL,NULL,0,0,0,'2019-07-18 12:28:24','2019-07-18 12:29:49'),(1000020,'jd297942@gmail.com',1,NULL,0,NULL,NULL,'$2b$08$bzd/.gJTQGJhlJJC4trW6uEwGfBsidfvEregvw1XJecY9XDBiydXy',NULL,NULL,NULL,0,0,0,'2019-07-18 15:18:15','2019-07-18 15:18:43'),(1000021,'editor@bitcoinwarrior.net',1,NULL,0,NULL,NULL,'$2b$08$8RJhnExJo.2RZi7G7yZs0OztDtoYf1JyETr8n5p2PjiDnm6DJQF3e',NULL,NULL,NULL,0,0,0,'2019-07-19 13:21:41','2019-07-19 13:28:24'),(1000022,'hmdmohebbi@gmail.com',1,NULL,0,NULL,NULL,'$2b$08$LnXvgPdlF5LbdfKRmytm7eRGOTk6yhYiDf943jxg46Bacb83LteoO',NULL,NULL,NULL,0,0,0,'2019-07-25 00:21:55','2019-07-25 00:22:58'),(1000023,'maron.alexander@gmail.com',1,NULL,0,NULL,NULL,'$2b$08$Qx1O0NeYf4jF.CiouvFbvuzyN01Fvav9zMbd7zZ.k0GYvF6v7Zaga',NULL,NULL,NULL,0,0,0,'2019-07-27 11:24:01','2019-07-27 11:24:49'),(1000024,'smr_tousi@yahoo.com',1,NULL,0,NULL,NULL,'$2b$08$FOWhOdjyeinZBKmOenwl9OEKAj5TmgkAL8xommTmwb5R72sDMvzXi',NULL,NULL,NULL,0,0,0,'2019-07-28 15:33:12','2019-07-28 15:33:30'),(1000025,'weqewqeqw@mail.ru',0,'cbe7ede37cd0e9e246fb03a1e4ca711dbb9f655516af7c8642c7cfd9fbc6792d',0,NULL,NULL,'$2b$08$W4.MgrkOhN5.T/VuuMxLU.FSu/d6MnRsjlquKnlHZRzDVkDBMtzn6',NULL,NULL,NULL,0,0,0,'2019-07-30 03:42:34','2019-07-30 03:42:34'),(1000026,'qauomistar73@gmail.com',1,NULL,0,NULL,NULL,'$2b$08$BiZqf7ANJMqsWcooC169lePB.viRssRYSeFZKRaku6vMjzdrlAFFK',NULL,NULL,NULL,0,0,0,'2019-08-04 08:01:13','2019-08-04 08:01:51'),(1000027,'colin@moroku.com',1,NULL,0,NULL,NULL,'$2b$08$PqW1ELrxg7fjDnmiaj/OVugIf0vA2exuGRyOAHKlcAt0iNVXOKy4e',NULL,NULL,NULL,0,0,0,'2019-08-06 07:57:04','2019-08-06 07:57:44'),(1000028,'wu.iris778@gmail.com',1,NULL,0,NULL,NULL,'$2b$08$rQajd6EKMS/E/M50V2uvAOL/2aLngc3gp.VKcsxwRahjPwpUQG1nq',NULL,NULL,NULL,0,0,0,'2019-08-14 00:49:03','2019-08-14 00:49:29'),(1000029,'nassim.mehri@gmail.com',1,NULL,0,NULL,NULL,'$2b$08$eUmnxDbypaYDXsal4fCxBufNTDvvrPJru0XcrWkzGVU660m.N3FmW',NULL,NULL,NULL,0,0,0,'2019-08-19 10:45:15','2019-08-20 06:53:52'),(1000030,'nasimmehri89@gmail.com',1,NULL,0,NULL,NULL,'$2b$08$Fc/Upe9FHfTJ/KrKdeMDiuKcy.lbKV4nInJhTvJEiKfCvcyDGAHy.',NULL,NULL,NULL,0,0,0,'2019-08-20 06:57:26','2019-08-20 06:57:39'),(1000031,'stephenrowlison@gmail.com',1,NULL,0,NULL,NULL,'$2b$08$b1iPGcjug6Pie4AV7RqdBeUxGImr/mVJFLki9WwwwxI.ttvb4v5s.',NULL,NULL,NULL,0,0,0,'2019-08-21 01:25:34','2019-09-29 00:09:01'),(1000032,'damian.evans@innospace.com.au',1,NULL,0,NULL,NULL,'$2b$08$LHdUBL4AFixEOO9ecjh20uIq57SiOF0ZmXO9nqHce2IZ/7z6utqzq',NULL,NULL,NULL,0,0,0,'2019-08-21 08:00:22','2019-08-21 08:00:44'),(1000033,'antissblog@gmail.com',1,NULL,0,NULL,NULL,'$2b$08$ke4CCiyvjph4KnEMi49PjeCZ/SAkQ62AIGtbgP34a6Q4TNRP7mgCC',NULL,NULL,NULL,0,0,0,'2019-08-23 14:14:15','2019-08-23 14:14:34'),(1000034,'hui.roy@gmail.com',1,NULL,0,NULL,NULL,'$2b$08$YSuognNFq0FvH9R3P8DyEuNaswmP/vAqH3yGkV6yPP4SZV/SOJ.kG',NULL,NULL,NULL,0,0,0,'2019-08-27 06:06:45','2019-08-27 06:07:02'),(1000035,'amir.sajjad.saljooghi@gmail.com',1,NULL,0,NULL,NULL,'$2b$08$h.FunoZQ1zHM5SKY5UBC5O6IVa3yXiJv0hd9LTHj9MV8n9NoiPoP2',NULL,NULL,NULL,0,0,0,'2019-08-27 19:09:45','2019-09-28 06:27:11'),(1000036,'aliam1991@gmail.com',1,NULL,0,NULL,NULL,'$2b$08$cuU9T19jrgVEwiPv60SFNeVbad/1uVM7E5khp/ELlgdrTygJ51Giy',NULL,NULL,NULL,0,0,0,'2019-08-27 19:16:48','2019-08-27 19:17:25'),(1000037,'Yousef.Hosseini@nydax.com',1,NULL,0,NULL,NULL,'$2b$08$AhhDmACEaGCqpsNJFIFFfuNzQp4olfDGFZzDiAzNKmL9cL1NCB3a2',NULL,NULL,NULL,0,0,0,'2019-09-03 17:18:12','2019-09-03 17:18:50'),(1000038,'s.saljooghi@innoventures.ir',1,NULL,0,'2e79b29b6730d9bf8dafcd2e6ffe2ca26f258e800a2dbe85d9d14b3a6a30deff','2019-09-24 06:50:50','$2b$08$XWM3KKnguGdgoKF0iq1Rju/LbMQXlSjfNoI9a5lgFH6V7x52oEiam',NULL,NULL,NULL,0,0,0,'2019-09-23 15:24:10','2019-09-24 06:50:50'),(1000039,'sajjad.saljooghi@gmail.com',1,NULL,0,NULL,NULL,'$2b$08$0GYRuJFAAVje7u22ZpJ0vum/0O1BfabYbnRHwrWwDPxPRdctt6i6m',NULL,NULL,NULL,0,0,0,'2019-09-28 07:16:40','2019-09-28 07:16:55'),(1000040,'mortezassaeed@gmail.com',1,NULL,0,NULL,NULL,'$2b$08$J4xEYUHKDDJGv5BMoMqjcOu0e4ppbga.2j0rspi/f7/RxWYtmV7g.',NULL,NULL,NULL,0,0,0,'2019-09-28 18:37:41','2019-09-28 18:38:26'),(1000041,'salmamoradi@yahoo.com',1,NULL,0,NULL,NULL,'$2b$08$1byxUwQ5C6aRdHbh9Vt1neZEEZDmfQnr8dZiVLtCnKneFv4y1jC4i',NULL,NULL,NULL,0,0,0,'2019-10-01 11:06:32','2019-10-01 11:06:58'),(1000043,'j.neale41@optusnet.com.au',1,NULL,0,NULL,NULL,'$2b$08$MDsenyE1SgO5MS7BXoBchOsLgkwi6ornhZqrgx/QdUnb758aRAQEa',NULL,NULL,NULL,0,0,0,'2019-10-10 11:08:36','2019-10-10 11:09:31'),(1000044,'ceo@mexuz.com',0,'62a9315ef5d455a3139e236334a68b0299ab09b1aa0c18aacfd7974442c0fc1f',0,NULL,NULL,'$2b$08$Lxiv/ENCYNpz4GbOrNua..Y9XSbRRLxgw97Qw.Y896TyoFTlxl/Hq',NULL,NULL,NULL,0,0,0,'2019-10-16 23:32:06','2019-10-16 23:32:06'),(1000045,'magolestani@yahoo.com',1,NULL,0,NULL,NULL,'$2b$08$Nj1tHpMTsbLuSCWs2/rJJeiWwgOFlrTNRPczIdXm9uB/FN2SdsLe.',NULL,NULL,NULL,0,0,0,'2019-10-16 23:46:48','2019-10-16 23:47:21'),(1000046,'Yousef.Hosseini@gmail.com',1,NULL,0,NULL,NULL,'$2b$08$SAruEHvMDwJoVJP/fFGJj.hoEiWa0EPDlkUUkzW3cK5eAan/wyq2i',NULL,NULL,NULL,0,0,0,'2019-10-16 23:47:40','2019-10-16 23:47:56');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAccountActivity`
--

DROP TABLE IF EXISTS `UserAccountActivity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserAccountActivity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` varchar(100) DEFAULT NULL,
  `browser` varchar(100) DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `action` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `UserAccountActivity_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAccountActivity`
--

LOCK TABLES `UserAccountActivity` WRITE;
/*!40000 ALTER TABLE `UserAccountActivity` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserAccountActivity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAuthStatus`
--

DROP TABLE IF EXISTS `UserAuthStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserAuthStatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `twoFactorAuthEnabled` tinyint(1) DEFAULT '0',
  `twoFactorAuthSecret` varchar(4000) DEFAULT NULL,
  `smsVerificationToken` varchar(255) DEFAULT NULL,
  `smsEnabled` tinyint(1) DEFAULT '0',
  `phoneNumber` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `UserAuthStatus_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1000047 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAuthStatus`
--

LOCK TABLES `UserAuthStatus` WRITE;
/*!40000 ALTER TABLE `UserAuthStatus` DISABLE KEYS */;
INSERT INTO `UserAuthStatus` VALUES (1,0,NULL,NULL,0,NULL,'2019-06-08 23:36:01','2019-06-08 23:36:07',1),(2,0,NULL,NULL,0,NULL,'2019-06-08 23:36:01','2019-06-08 23:36:07',2),(3,0,NULL,NULL,0,NULL,'2019-06-08 23:36:01','2019-06-08 23:36:07',3),(4,0,NULL,NULL,0,NULL,'2019-06-08 23:36:01','2019-06-08 23:36:07',501),(5,0,NULL,NULL,0,NULL,'2019-06-08 23:36:01','2019-06-08 23:36:07',502),(1000007,0,NULL,NULL,0,NULL,'2019-07-08 18:49:44','2019-07-08 18:49:44',1000007),(1000008,0,NULL,NULL,0,NULL,'2019-07-08 19:50:17','2019-07-08 19:50:17',1000008),(1000013,0,NULL,NULL,0,NULL,'2019-07-10 07:44:10','2019-07-10 07:44:10',1000013),(1000015,0,NULL,NULL,0,NULL,'2019-07-11 15:50:12','2019-07-11 15:50:12',1000015),(1000016,0,NULL,NULL,0,NULL,'2019-07-16 16:07:45','2019-07-16 16:07:45',1000016),(1000017,0,NULL,NULL,0,NULL,'2019-07-17 02:29:36','2019-07-17 02:29:36',1000017),(1000018,0,NULL,NULL,0,NULL,'2019-07-18 10:37:26','2019-07-18 10:37:26',1000018),(1000019,1,'JE4HET2NO5ZDQ63LKUZHCTDWOZVWOXRQ',NULL,0,NULL,'2019-07-18 12:28:24','2019-07-18 12:37:18',1000019),(1000020,0,NULL,NULL,0,NULL,'2019-07-18 15:18:15','2019-07-18 15:18:15',1000020),(1000021,0,NULL,NULL,0,NULL,'2019-07-19 13:21:41','2019-07-19 13:21:41',1000021),(1000022,0,NULL,NULL,0,NULL,'2019-07-25 00:21:56','2019-07-25 00:21:56',1000022),(1000023,0,NULL,NULL,0,NULL,'2019-07-27 11:24:01','2019-07-27 11:24:01',1000023),(1000024,0,NULL,NULL,0,NULL,'2019-07-28 15:33:12','2019-07-28 15:33:12',1000024),(1000025,0,NULL,NULL,0,NULL,'2019-07-30 03:42:34','2019-07-30 03:42:34',1000025),(1000026,0,NULL,NULL,0,NULL,'2019-08-04 08:01:13','2019-08-04 08:01:13',1000026),(1000027,0,NULL,NULL,0,NULL,'2019-08-06 07:57:04','2019-08-06 07:57:04',1000027),(1000028,0,NULL,NULL,0,NULL,'2019-08-14 00:49:03','2019-08-14 00:49:03',1000028),(1000029,0,NULL,NULL,0,NULL,'2019-08-19 10:45:15','2019-08-19 10:45:15',1000029),(1000030,0,'INYUYQ2MMIWHKJLSGQ4VEVZJJU3DUVCE',NULL,0,NULL,'2019-08-20 06:57:26','2019-08-20 07:48:59',1000030),(1000031,0,NULL,'79887',1,'+61473414070','2019-08-21 01:25:34','2019-10-02 01:51:36',1000031),(1000032,0,NULL,NULL,0,NULL,'2019-08-21 08:00:22','2019-08-21 08:00:22',1000032),(1000033,0,NULL,NULL,0,NULL,'2019-08-23 14:14:15','2019-08-23 14:14:15',1000033),(1000034,0,NULL,NULL,0,NULL,'2019-08-27 06:06:45','2019-08-27 06:06:45',1000034),(1000035,0,NULL,NULL,0,NULL,'2019-08-27 19:09:45','2019-08-27 19:09:45',1000035),(1000036,0,NULL,NULL,0,NULL,'2019-08-27 19:16:48','2019-08-27 19:16:48',1000036),(1000037,0,NULL,NULL,0,NULL,'2019-09-03 17:18:12','2019-09-03 17:18:12',1000037),(1000038,0,NULL,NULL,0,NULL,'2019-09-23 15:24:10','2019-09-23 15:24:10',1000038),(1000039,0,NULL,NULL,0,NULL,'2019-09-28 07:16:40','2019-09-28 07:16:40',1000039),(1000040,0,NULL,NULL,0,NULL,'2019-09-28 18:37:41','2019-09-28 18:37:41',1000040),(1000041,0,NULL,NULL,0,NULL,'2019-10-01 11:06:32','2019-10-01 11:06:32',1000041),(1000043,0,NULL,NULL,0,NULL,'2019-10-10 11:08:36','2019-10-10 11:08:36',1000043),(1000044,0,NULL,NULL,0,NULL,'2019-10-16 23:32:06','2019-10-16 23:32:06',1000044),(1000045,0,NULL,NULL,1,'+61432623117','2019-10-16 23:46:48','2019-10-16 23:51:57',1000045),(1000046,0,NULL,NULL,0,NULL,'2019-10-16 23:47:40','2019-10-16 23:47:40',1000046);
/*!40000 ALTER TABLE `UserAuthStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserLogin`
--

DROP TABLE IF EXISTS `UserLogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserLogin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `authToken` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `UserLogin_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=210 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserLogin`
--

LOCK TABLES `UserLogin` WRITE;
/*!40000 ALTER TABLE `UserLogin` DISABLE KEYS */;
INSERT INTO `UserLogin` VALUES (137,NULL,'2019-07-08 18:52:39','2019-07-08 18:52:39',1000007),(138,NULL,'2019-07-08 19:55:06','2019-07-08 19:55:06',1000008),(139,NULL,'2019-07-09 06:37:04','2019-07-09 06:37:04',1000007),(140,NULL,'2019-07-09 12:39:55','2019-07-09 12:39:55',1000008),(141,NULL,'2019-07-09 23:46:01','2019-07-09 23:46:01',1000008),(142,NULL,'2019-07-10 07:58:28','2019-07-10 07:58:28',1000013),(143,NULL,'2019-07-11 06:49:19','2019-07-11 06:49:19',1000008),(144,NULL,'2019-07-11 15:51:11','2019-07-11 15:51:11',1000015),(145,NULL,'2019-07-17 02:31:07','2019-07-17 02:31:07',1000017),(146,NULL,'2019-07-18 10:38:37','2019-07-18 10:38:37',1000018),(147,NULL,'2019-07-18 12:30:00','2019-07-18 12:30:00',1000019),(148,NULL,'2019-07-18 15:19:12','2019-07-18 15:19:12',1000020),(149,NULL,'2019-07-19 13:28:33','2019-07-19 13:28:33',1000021),(150,NULL,'2019-07-20 05:00:44','2019-07-20 05:00:44',1000021),(151,NULL,'2019-07-25 00:23:27','2019-07-25 00:23:27',1000022),(152,NULL,'2019-07-25 11:00:37','2019-07-25 11:00:37',1000007),(153,NULL,'2019-07-27 11:25:06','2019-07-27 11:25:06',1000023),(154,NULL,'2019-07-28 15:34:11','2019-07-28 15:34:11',1000024),(155,NULL,'2019-08-04 08:03:44','2019-08-04 08:03:44',1000026),(156,NULL,'2019-08-06 07:58:50','2019-08-06 07:58:50',1000027),(157,NULL,'2019-08-07 13:01:37','2019-08-07 13:01:37',1000007),(159,NULL,'2019-08-14 00:49:59','2019-08-14 00:49:59',1000028),(162,NULL,'2019-08-14 12:39:05','2019-08-14 12:39:05',1000015),(163,NULL,'2019-08-15 01:20:33','2019-08-15 01:20:33',1000015),(164,NULL,'2019-08-19 12:03:04','2019-08-19 12:03:04',1000029),(165,NULL,'2019-08-20 06:58:02','2019-08-20 06:58:02',1000030),(166,NULL,'2019-08-21 01:26:03','2019-08-21 01:26:03',1000031),(167,NULL,'2019-08-21 01:42:59','2019-08-21 01:42:59',1000031),(168,NULL,'2019-08-21 01:43:15','2019-08-21 01:43:15',1000031),(169,NULL,'2019-08-21 08:01:02','2019-08-21 08:01:02',1000032),(170,NULL,'2019-08-22 15:40:44','2019-08-22 15:40:44',1000030),(171,NULL,'2019-08-23 14:15:06','2019-08-23 14:15:06',1000033),(172,NULL,'2019-08-27 05:26:51','2019-08-27 05:26:51',1000015),(173,NULL,'2019-08-27 06:07:15','2019-08-27 06:07:15',1000034),(174,NULL,'2019-08-27 19:13:27','2019-08-27 19:13:27',1000035),(175,NULL,'2019-08-27 19:17:42','2019-08-27 19:17:42',1000036),(176,NULL,'2019-08-29 04:00:40','2019-08-29 04:00:40',1000015),(177,NULL,'2019-09-03 17:19:08','2019-09-03 17:19:08',1000037),(178,NULL,'2019-09-23 15:22:42','2019-09-23 15:22:42',1000033),(179,NULL,'2019-09-23 23:06:56','2019-09-23 23:06:56',1000036),(180,NULL,'2019-09-28 06:28:22','2019-09-28 06:28:22',1000035),(181,NULL,'2019-09-28 07:17:34','2019-09-28 07:17:34',1000039),(182,NULL,'2019-09-28 18:28:39','2019-09-28 18:28:39',1000033),(183,NULL,'2019-09-28 18:39:10','2019-09-28 18:39:10',1000040),(184,NULL,'2019-09-29 00:09:13','2019-09-29 00:09:13',1000031),(185,NULL,'2019-09-29 00:09:38','2019-09-29 00:09:38',1000031),(186,NULL,'2019-09-29 00:12:12','2019-09-29 00:12:12',1000031),(187,NULL,'2019-09-29 00:12:20','2019-09-29 00:12:20',1000031),(188,NULL,'2019-10-01 11:08:06','2019-10-01 11:08:06',1000041),(189,NULL,'2019-10-01 11:09:29','2019-10-01 11:09:29',1000041),(190,NULL,'2019-10-02 01:51:36','2019-10-02 01:51:36',1000031),(191,NULL,'2019-10-02 01:52:06','2019-10-02 01:52:06',1000031),(192,NULL,'2019-10-09 23:19:56','2019-10-09 23:19:56',1000037),(193,NULL,'2019-10-10 11:09:55','2019-10-10 11:09:55',1000043),(194,NULL,'2019-10-13 05:51:29','2019-10-13 05:51:29',1000020),(195,NULL,'2019-10-16 23:47:37','2019-10-16 23:47:37',1000045),(196,NULL,'2019-10-16 23:48:06','2019-10-16 23:48:06',1000046),(197,NULL,'2019-10-16 23:50:18','2019-10-16 23:50:18',1000045),(198,NULL,'2019-10-17 21:36:51','2019-10-17 21:36:51',1000046),(199,NULL,'2019-10-19 04:46:40','2019-10-19 04:46:40',1000046),(200,NULL,'2019-11-04 14:42:40','2019-11-04 14:42:40',1000020),(201,NULL,'2019-11-11 08:55:03','2019-11-11 08:55:03',1000046),(202,NULL,'2019-11-11 09:28:08','2019-11-11 09:28:08',1000046),(203,NULL,'2019-11-11 10:54:48','2019-11-11 10:54:48',1000046),(204,NULL,'2019-11-11 21:32:57','2019-11-11 21:32:57',1000046),(205,NULL,'2019-11-11 21:59:04','2019-11-11 21:59:04',1000046),(206,NULL,'2019-11-11 22:01:15','2019-11-11 22:01:15',1000046),(207,NULL,'2019-11-11 22:27:44','2019-11-11 22:27:44',1000046),(208,NULL,'2019-11-11 23:06:20','2019-11-11 23:06:20',1000046),(209,NULL,'2019-11-12 09:02:57','2019-11-12 09:02:57',1000046);
/*!40000 ALTER TABLE `UserLogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserProfile`
--

DROP TABLE IF EXISTS `UserProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserProfile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `legalFirstName` varchar(100) DEFAULT NULL,
  `legalLastName` varchar(100) DEFAULT NULL,
  `legalMiddleName` varchar(100) DEFAULT NULL,
  `passportPic` varchar(255) DEFAULT NULL,
  `driverLicenseFrontPic` varchar(255) DEFAULT NULL,
  `driverLicenseBackPic` varchar(255) DEFAULT NULL,
  `identityCardFrontPic` varchar(255) DEFAULT NULL,
  `identityCardBackPic` varchar(255) DEFAULT NULL,
  `facePic` varchar(255) DEFAULT NULL,
  `referralToken` varchar(32) NOT NULL,
  `kycToken` varchar(6) NOT NULL,
  `verificationStatusId` int(11) DEFAULT '1',
  `verificationStatusModified` tinyint(1) DEFAULT '0',
  `picture` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `countryId` int(3) DEFAULT NULL,
  `baseCurrencyId` int(11) DEFAULT NULL,
  `timezoneId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `verificationStatusId` (`verificationStatusId`),
  KEY `countryId` (`countryId`),
  KEY `baseCurrencyId` (`baseCurrencyId`),
  KEY `timezoneId` (`timezoneId`),
  KEY `userId` (`userId`),
  CONSTRAINT `UserProfile_ibfk_21` FOREIGN KEY (`verificationStatusId`) REFERENCES `UserVerificationStatus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `UserProfile_ibfk_22` FOREIGN KEY (`countryId`) REFERENCES `Country` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `UserProfile_ibfk_23` FOREIGN KEY (`baseCurrencyId`) REFERENCES `Currency` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `UserProfile_ibfk_24` FOREIGN KEY (`timezoneId`) REFERENCES `Timezone` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `UserProfile_ibfk_25` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1000047 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserProfile`
--

LOCK TABLES `UserProfile` WRITE;
/*!40000 ALTER TABLE `UserProfile` DISABLE KEYS */;
INSERT INTO `UserProfile` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'79faffe7043b1f9f0b41417c087d44af','5391a3',1,0,NULL,NULL,'2019-06-08 23:36:01','2019-06-08 23:36:07',NULL,1,1,1),(2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'feb627748cbf40d6cf346cd074d61006','59364d',1,0,NULL,NULL,'2019-06-08 23:36:01','2019-06-08 23:36:07',NULL,1,1,1),(3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'cff2b7e990e55a8e6fb84f9f4332ee71','d1ed11',1,0,NULL,NULL,'2019-06-08 23:36:01','2019-06-08 23:36:07',NULL,1,1,1),(4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'67f64ac2d4607359f730d8c5a88e40c9','df8a1b',1,0,NULL,NULL,'2019-06-08 23:36:01','2019-06-08 23:36:07',NULL,1,1,1),(5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'6730b10b6ac0576963ab1fa2ee0a0d03','54205d',1,0,NULL,NULL,'2019-06-08 23:36:01','2019-06-08 23:36:07',NULL,1,1,1),(1000007,'Reza','Agahi',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'9121d5c316e6455eeddfd919e0af1581','a93c94',1,0,NULL,NULL,'2019-07-08 18:49:44','2019-07-08 18:49:44',NULL,1,1,1000007),(1000008,'erfan','zangeneh',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'eadf31e13420614108f33b25a1980e02','6ccba1',1,0,NULL,NULL,'2019-07-08 19:50:17','2019-07-08 19:50:17',NULL,1,1,1000008),(1000013,'Reza','Agahi',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2000caff913897be35932a6fd59e143b','51cb62',1,0,NULL,NULL,'2019-07-10 07:44:10','2019-07-10 07:44:10',NULL,1,1,1000013),(1000015,'Yousef','Hosseini',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'c82337a628a506f1b7cc77e143862248','0e9a50',1,0,NULL,NULL,'2019-07-11 15:50:12','2019-07-11 15:50:12',NULL,1,1,1000015),(1000016,'dfsdsad','fdsa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'5e0e76ccf849ca5bfb4b53f5e69ae3e7','06e47d',1,0,NULL,NULL,'2019-07-16 16:07:45','2019-07-16 16:07:45',NULL,1,1,1000016),(1000017,'Patrick','Akoi',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2e2d8d8e63949511d74ae5cdb6aba9bd','8cad57',1,0,NULL,NULL,'2019-07-17 02:29:36','2019-07-17 02:34:54',NULL,1,21,1000017),(1000018,'Mehdi','Farahani',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'721cebf784d931c262d9fb74f3352e96','0941a8',1,0,NULL,NULL,'2019-07-18 10:37:26','2019-07-18 10:37:26',NULL,1,1,1000018),(1000019,'Surya','Mushini',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'764b362aa8480db2e035948b3230a890','33aca2',1,0,'https://ixp.nydax.com:2083/images/users/b35e18c1-0b70-47c0-bf78-d380fa4bb57a.jpeg',NULL,'2019-07-18 12:28:24','2019-07-18 12:36:08',NULL,17,50,1000019),(1000020,'Jerome','Doyle',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ec23d78d351b005633d1331bcf76c3ea','b73976',1,0,'https://ixp.nydax.com:2083/images/users/45c63dcc-ca23-431a-89c4-375f4a5f5d8f.jpeg',NULL,'2019-07-18 15:18:15','2019-07-18 15:21:16',NULL,1,21,1000020),(1000021,'Mark','Norton',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'3fffc9342171f22797cb753066be95d2','22d647',1,0,NULL,NULL,'2019-07-19 13:21:41','2019-07-19 13:21:41',NULL,1,1,1000021),(1000022,'Hamed','Mohebbi',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'8d31292a44988594c82da7bda7a49445','2a9dd6',1,0,NULL,NULL,'2019-07-25 00:21:56','2019-07-25 00:21:56',NULL,1,1,1000022),(1000023,'Alexander','Maron',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'f73c289bd2c83c00434544f99b045b4b','c0580c',1,0,NULL,NULL,'2019-07-27 11:24:01','2019-07-27 11:25:57',NULL,4,28,1000023),(1000024,'Reza','Tousi',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'b67f2da12b062188a3ccf3a0307091f7','12a729',1,0,NULL,NULL,'2019-07-28 15:33:12','2019-07-28 15:33:12',NULL,1,1,1000024),(1000025,'qwewqe','qewewewq',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'6be32e003f5f0fd3a8a67560d0aee4d6','53878a',1,0,NULL,NULL,'2019-07-30 03:42:34','2019-07-30 03:42:34',NULL,1,1,1000025),(1000026,'seyed moein','ghayoumi',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a64d67c8c9e07a13176ba34b31bdf724','a5de95',1,0,NULL,NULL,'2019-08-04 08:01:13','2019-08-04 08:01:13',NULL,1,1,1000026),(1000027,'Colin','Weir',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'8bb8ebf6d1b6e834a5959de7da400273','06c76d',1,0,NULL,NULL,'2019-08-06 07:57:04','2019-08-06 07:57:04',NULL,1,1,1000027),(1000028,'Iris','Wu',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a6513ef321fedd6b4c9d0a3955e587ae','c6dd56',1,0,NULL,NULL,'2019-08-14 00:49:03','2019-08-14 00:49:03',NULL,1,1,1000028),(1000029,'Nasim','Mehri',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'184030f96b58b2b8875697a123ee17c9','2ac8b1',1,0,NULL,NULL,'2019-08-19 10:45:15','2019-08-19 10:45:15',NULL,1,1,1000029),(1000030,'nasim','mehri',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'4b3aab08d7bf361cbaf1602b3cc57a50','a456d8',1,0,NULL,NULL,'2019-08-20 06:57:26','2019-08-20 06:57:26',NULL,1,1,1000030),(1000031,'Stephen','Rowlison','Stephen','Rowlison','','https://ixp.nydax.com:2083/images/users/b1d47129-7d73-4560-90b4-853d3e7b81c0',NULL,NULL,NULL,NULL,'https://ixp.nydax.com:2083/images/users/67284eda-c1f9-4960-8517-c3c9a2231153','4cfe6fa3cec950633e8a3797c49ae177','f61c5e',2,0,NULL,NULL,'2019-08-21 01:25:34','2019-08-21 01:36:00',14,4,29,1000031),(1000032,'Damian','Evans',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'6190b70138c4494f21b914628386f2e8','dd4484',1,0,NULL,NULL,'2019-08-21 08:00:22','2019-08-21 08:01:33',NULL,4,28,1000032),(1000033,'Mohammad','Soltani','Mohammad','Soltani','','https://ixp.nydax.com:2083/images/users/8372906d-e88e-4dcf-a96a-69fbf8455123',NULL,NULL,NULL,NULL,'https://ixp.nydax.com:2083/images/users/052004e7-d121-426e-9bef-35f61703f2e6','146ba9267bc969868f547b3905ffd182','0ffb85',2,0,NULL,NULL,'2019-08-23 14:14:15','2019-08-23 14:18:24',105,1,1,1000033),(1000034,'Test','User',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'3a46e8f2b15685d765dff727e004997d','7aaa72',1,0,NULL,NULL,'2019-08-27 06:06:45','2019-08-27 06:06:45',NULL,1,1,1000034),(1000035,'Sajjad','Saljooghi',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'16d05cc4a12ab9f85231a4fb97d8589f','059f4a',1,0,NULL,NULL,'2019-08-27 19:09:45','2019-08-27 19:09:45',NULL,1,1,1000035),(1000036,'Ali','Atar',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'a721dd615ae58950fe01ae9056d40ab9','3e5cfd',1,0,NULL,NULL,'2019-08-27 19:16:48','2019-08-27 19:16:48',NULL,1,1,1000036),(1000037,'Yousef','Hosseini',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'5227e0244dbcacceb84d6a016160df7a','1dbe32',1,0,NULL,NULL,'2019-09-03 17:18:12','2019-09-03 17:18:12',NULL,1,1,1000037),(1000038,'Sajjad','Saljooghi',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'9ae34716825b6695b7187ced4881e92d','6781c3',1,0,NULL,NULL,'2019-09-23 15:24:10','2019-09-23 15:24:10',NULL,1,1,1000038),(1000039,'Sajjad','Saljooghi',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'1f8d003b6cc3237ab23d24f46e926fd0','6471df',1,0,NULL,NULL,'2019-09-28 07:16:40','2019-09-28 07:16:40',NULL,1,1,1000039),(1000040,'Morteza','Salehi',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'7836f78be8980f67e1f8ba64884bdda3','3aeeb3',1,0,NULL,NULL,'2019-09-28 18:37:41','2019-09-28 18:37:41',NULL,1,1,1000040),(1000041,'salma','moradpoor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0841c20853b0340dc7e381307c59d19b','5ce7b8',1,0,NULL,NULL,'2019-10-01 11:06:32','2019-10-01 11:06:32',NULL,1,1,1000041),(1000043,'jim','neale',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ee98516688de5fb52e726ca920c2cef9','20d6b7',1,0,NULL,NULL,'2019-10-10 11:08:36','2019-10-10 11:08:36',NULL,1,1,1000043),(1000044,'Jack','Tom',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'757f15fff5e4dbd19146484a1f287ce5','9d66a1',1,0,NULL,NULL,'2019-10-16 23:32:06','2019-10-16 23:32:06',NULL,1,1,1000044),(1000045,'Maryam','Golestani',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'cd29d7a03ec200adcc2ef0bf6e27ce03','cf3fdd',1,0,NULL,NULL,'2019-10-16 23:46:48','2019-10-16 23:50:56',NULL,4,28,1000045),(1000046,'Yousef','Hosseini','Yousef','Hosseini','','https://ixp.nydax.com:2083/images/users/da7a15fb-be7c-4aa0-bff4-ce08cc74cd68',NULL,NULL,NULL,NULL,'https://ixp.nydax.com:2083/images/users/9ca0d3e8-ce43-432e-b9d4-e9c409b67ba9','aa3cbe7b916893f1d3121b149cbb62af','8af25a',2,0,NULL,NULL,'2019-10-16 23:47:40','2019-11-11 23:10:45',14,2,1,1000046);
/*!40000 ALTER TABLE `UserProfile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserVerificationFeedback`
--

DROP TABLE IF EXISTS `UserVerificationFeedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserVerificationFeedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(1000) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userProfileId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userProfileId` (`userProfileId`),
  CONSTRAINT `UserVerificationFeedback_ibfk_1` FOREIGN KEY (`userProfileId`) REFERENCES `UserProfile` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserVerificationFeedback`
--

LOCK TABLES `UserVerificationFeedback` WRITE;
/*!40000 ALTER TABLE `UserVerificationFeedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserVerificationFeedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserVerificationStatus`
--

DROP TABLE IF EXISTS `UserVerificationStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserVerificationStatus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserVerificationStatus`
--

LOCK TABLES `UserVerificationStatus` WRITE;
/*!40000 ALTER TABLE `UserVerificationStatus` DISABLE KEYS */;
INSERT INTO `UserVerificationStatus` VALUES (1,'Not Submitted','2019-06-08 23:36:01','2019-06-08 23:36:07'),(2,'Submitted','2019-06-08 23:36:01','2019-06-08 23:36:07'),(3,'Waiting for Modification','2019-06-08 23:36:01','2019-06-08 23:36:07'),(4,'Verified','2019-06-08 23:36:01','2019-06-08 23:36:07'),(5,'Rejected','2019-06-08 23:36:01','2019-06-08 23:36:07');
/*!40000 ALTER TABLE `UserVerificationStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Wallet`
--

DROP TABLE IF EXISTS `Wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Wallet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(45) NOT NULL,
  `balance` decimal(34,22) NOT NULL DEFAULT '0.0000000000000000000000',
  `reservedBalance` decimal(34,22) NOT NULL DEFAULT '0.0000000000000000000000',
  `isExternal` tinyint(1) DEFAULT '0',
  `tokenId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `privateKey` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `compositeIndex` (`tokenId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Wallet_ibfk_1` FOREIGN KEY (`tokenId`) REFERENCES `Token` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Wallet_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1000181 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Wallet`
--

LOCK TABLES `Wallet` WRITE;
/*!40000 ALTER TABLE `Wallet` DISABLE KEYS */;
/*!40000 ALTER TABLE `Wallet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WalletAddress`
--

DROP TABLE IF EXISTS `WalletAddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `WalletAddress` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(64) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `tokenTypeId` int(11) DEFAULT NULL,
  `privateKey` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tokenTypeId` (`tokenTypeId`),
  CONSTRAINT `WalletAddress_ibfk_1` FOREIGN KEY (`tokenTypeId`) REFERENCES `TokenType` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4524 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WalletAddress`
--

LOCK TABLES `WalletAddress` WRITE;
/*!40000 ALTER TABLE `WalletAddress` DISABLE KEYS */;
/*!40000 ALTER TABLE `WalletAddress` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-28  8:10:30
