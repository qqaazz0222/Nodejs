-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: board
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `zipcode` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `main` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `detail` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userid` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (2,'ttt','ttt','ttt','te'),(18,'47011','부산광역시 사상구','주례로 47, UIT관 8층','id1'),(19,'47011','부산광역시 사상구','주례로 47, NM 246','id1'),(30,'test','test','test','id1');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `price` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'헤어질 결심 각본','13500'),(2,'역행자','15750'),(3,'불편한 편의점(40만부 기념 벚꽃 에디션) ','12600'),(4,'파친코 1 ','14220'),(5,'유럽 도시 기행 2','15750'),(6,'호감 가는 말투에는 비밀이 있다 ','15120'),(7,'나를 내려놓으니 내가 좋아졌다','14400'),(8,'계속 가보겠습니다','16200'),(9,'나라면 나와 결혼할까? ','15120'),(10,'당신이라는 기적 ','14400'),(11,'헤어질 결심 각본','13500'),(12,'역행자','15750'),(13,'불편한 편의점(40만부 기념 벚꽃 에디션) ','12600'),(14,'파친코 1 ','14220'),(15,'유럽 도시 기행 2','15750'),(16,'호감 가는 말투에는 비밀이 있다 ','15120'),(17,'나를 내려놓으니 내가 좋아졌다','14400'),(18,'계속 가보겠습니다','16200'),(19,'나라면 나와 결혼할까? ','15120'),(20,'당신이라는 기적 ','14400');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card` (
  `id` int NOT NULL AUTO_INCREMENT,
  `validity` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `code` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userid` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES (1,'07/22','1234-1234-1234-1234','credit','id1'),(15,'mm/yy','test-test-test-test','credit','id1'),(16,'mm/yy','card-card-card-card','credit','id1');
/*!40000 ALTER TABLE `card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_date` varchar(45) NOT NULL,
  `order_item` varchar(45) NOT NULL,
  `order_amount` varchar(45) NOT NULL,
  `address_id` varchar(45) NOT NULL,
  `card_id` varchar(45) NOT NULL,
  `user_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (5,'2022-7-24','1','3','18','1','id1'),(6,'2022-7-24','2','5','30','16','id1'),(7,'2022-7-24','1','1','18','1','id1'),(8,'2022-7-24','1','2','19','1','id1'),(9,'2022-7-24','1','1','18','1','id1'),(10,'2022-7-24','1','2','18','1','id1'),(11,'2022-7-24','1','1','18','15','id1'),(12,'2022-7-24','1','1','18','1','id1'),(13,'2022-7-24','1','1','18','1','id1'),(14,'2022-7-24','1','1','18','1','id1'),(15,'2022-7-24','1','1','18','1','id1'),(16,'2022-7-25','1','1','18','1','id1'),(17,'2022-7-25','1','1','18','1','id1'),(18,'2022-7-25','1','1','18','1','id1'),(19,'2022-7-25','1','1','18','1','id1'),(20,'2022-7-25','1','1','18','1','id1'),(21,'2022-7-25','1','2','18','1','id1'),(22,'2022-7-25','1','1','18','1','id1'),(23,'2022-7-25','1','2','19','15','id1'),(24,'2022-7-25','1','2','19','15','id1'),(25,'2022-7-25','1','2','19','15','id1'),(26,'2022-7-25','1','2','19','15','id1'),(27,'2022-7-25','1','2','19','15','id1'),(28,'2022-7-25','1','2','19','15','id1'),(29,'2022-7-25','1','2','19','15','id1'),(30,'2022-7-25','1','2','19','15','id1'),(31,'2022-7-25','1','2','19','15','id1'),(32,'2022-7-25','1','2','19','15','id1'),(33,'2022-7-25','1','2','19','15','id1'),(34,'2022-7-25','1','4','18','1','id1'),(35,'2022-7-25','1','4','18','1','id1'),(36,'2022-7-25','1','4','18','1','id1'),(37,'2022-7-25','1','4','18','1','id1'),(38,'2022-7-25','1','4','18','1','id1'),(39,'2022-7-25','1','4','18','1','id1'),(40,'2022-7-25','1','4','18','1','id1'),(41,'2022-7-25','1','4','18','1','id1'),(42,'2022-7-25','1','4','18','1','id1'),(43,'2022-7-25','1','4','18','1','id1'),(44,'2022-7-25','1','4','18','1','id1'),(45,'2022-7-25','1','4','18','1','id1'),(46,'2022-7-25','1','4','18','1','id1'),(47,'2022-7-25','1','4','18','1','id1'),(48,'2022-7-25','1','4','18','1','id1'),(49,'2022-7-25','1','4','18','1','id1'),(50,'2022-7-25','1','4','18','1','id1'),(51,'2022-7-25','1','4','18','1','id1'),(52,'2022-7-25','1','4','18','1','id1'),(53,'2022-7-25','1','4','18','1','id1'),(54,'2022-7-25','1','4','18','1','id1'),(55,'2022-7-25','1','4','18','1','id1'),(56,'2022-7-25','1','4','18','1','id1'),(57,'2022-7-25','1','4','18','1','id1'),(58,'2022-7-25','1','4','18','1','id1'),(59,'2022-7-25','1','4','18','1','id1'),(60,'2022-7-25','1','4','18','1','id1'),(61,'2022-7-25','1','4','18','1','id1'),(62,'2022-7-25','1','4','18','1','id1'),(63,'2022-7-25','1','4','18','1','id1'),(64,'2022-7-25','1','4','18','1','id1'),(65,'2022-7-25','1','4','18','1','id1'),(66,'2022-7-25','1','4','18','1','id1'),(67,'2022-7-25','1','4','18','1','id1'),(68,'2022-7-25','1','4','18','1','id1'),(69,'2022-7-25','1','4','18','1','id1'),(70,'2022-7-25','1','4','18','1','id1'),(71,'2022-7-25','1','4','18','1','id1'),(72,'2022-7-25','1','4','18','1','id1'),(73,'2022-7-25','1','4','18','1','id1'),(74,'2022-7-25','1','4','18','1','id1'),(75,'2022-7-25','1','4','18','1','id1'),(76,'2022-7-25','1','4','18','1','id1'),(77,'2022-7-25','1','4','18','1','id1'),(78,'2022-7-25','1','4','18','1','id1'),(79,'2022-7-25','1','4','18','1','id1'),(80,'2022-7-25','1','4','18','1','id1'),(81,'2022-7-25','1','4','18','1','id1'),(82,'2022-7-25','1','4','18','1','id1'),(83,'2022-7-25','1','4','18','1','id1'),(84,'2022-7-25','1','4','18','1','id1'),(85,'2022-7-25','1','4','18','1','id1'),(86,'2022-7-25','1','4','18','1','id1'),(87,'2022-7-25','1','4','18','1','id1');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('5-5k1V3irHgSA_fLUMc6tAd8tf4fE3KW',1658753422,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"uid\":\"id1\",\"isLogined\":true}'),('DVhuifV-H8-y4RKQikhCH2LO77uqwQsz',1658819872,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"uid\":\"id1\",\"isLogined\":true}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `pw` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('','',''),('apple6205','1234','정희진'),('id1','pw1','name1'),('id2','pw2','홍길동'),('id3','pw3','홍길동'),('id4','pw4','홍길동'),('id5','pw5','홍길동'),('id6','pw6','홍길동'),('id7','pw7','홍길동'),('id8','pw8','홍길동');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-25 17:45:31
