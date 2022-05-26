/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100703
 Source Host           : localhost:3306
 Source Schema         : plvscdb

 Target Server Type    : MySQL
 Target Server Version : 100703
 File Encoding         : 65001

 Date: 26/05/2022 13:34:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `idNo` int NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `surname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `contactNo` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `firstName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `middleName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `departmentCode` int NULL DEFAULT NULL,
  `department` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `adminType` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 2020, 'zolerjerwen@gmail.com', 'Olivar', '09090909090', 'Jay Pee', '', 'jp', 0, 'NSTP', 'Mn9h6E6K9XtcSTxQmdYtEkyo9ah9', 'eao');
INSERT INTO `admin` VALUES (2, 4040, 'lorraineangelilibatique@gmail.com', 'Libatique', '09090909090', 'Lorraine Angeli', '', 'lorr', 0, 'CEIT', 'IOhsjbI6jvtF9UbzIo430RZZboSJ', 'oic');
INSERT INTO `admin` VALUES (4, 19, 'kristaperlada@gmail.com', 'Perlada', '09225577861', 'Krista', ' ', NULL, 0, 'Accounting', '08141999', 'eao');
INSERT INTO `admin` VALUES (5, 19, 'genfrancisco@gmail.com', 'Francisco', '09225577861', 'Geneva', ' ', NULL, 0, 'IT Department', 'genfrancisco', 'oic');
INSERT INTO `admin` VALUES (6, 20, 'ccorazon645@gmail.com', 'Cruz', '09420509572', 'Corazon', 'Agustin', NULL, 0, 'Accounting', 'cruz645', 'eao');
INSERT INTO `admin` VALUES (7, 20, 'zolerjerwen@gmail.com', 'Cruz', '09672180574', 'Julio', 'Sabado', NULL, 0, 'NSTP', 'Mn9h6E6K9XtcSTxQmdYtEkyo9ah9', 'oic');

-- ----------------------------
-- Table structure for adminandcreatedevent
-- ----------------------------
DROP TABLE IF EXISTS `adminandcreatedevent`;
CREATE TABLE `adminandcreatedevent`  (
  `adminId` int NULL DEFAULT NULL,
  `eventId` int NULL DEFAULT NULL,
  INDEX `adminId`(`adminId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of adminandcreatedevent
-- ----------------------------
INSERT INTO `adminandcreatedevent` VALUES (2020, 7);
INSERT INTO `adminandcreatedevent` VALUES (2020, 8);
INSERT INTO `adminandcreatedevent` VALUES (2020, 9);
INSERT INTO `adminandcreatedevent` VALUES (2020, 10);
INSERT INTO `adminandcreatedevent` VALUES (2020, 11);
INSERT INTO `adminandcreatedevent` VALUES (2020, 12);
INSERT INTO `adminandcreatedevent` VALUES (2020, 13);
INSERT INTO `adminandcreatedevent` VALUES (2020, 14);
INSERT INTO `adminandcreatedevent` VALUES (2020, 15);
INSERT INTO `adminandcreatedevent` VALUES (2020, 16);
INSERT INTO `adminandcreatedevent` VALUES (2020, 17);
INSERT INTO `adminandcreatedevent` VALUES (2020, 18);
INSERT INTO `adminandcreatedevent` VALUES (2020, 19);

-- ----------------------------
-- Table structure for adminnoofnotification
-- ----------------------------
DROP TABLE IF EXISTS `adminnoofnotification`;
CREATE TABLE `adminnoofnotification`  (
  `adminId` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `noOfNotification` int NOT NULL DEFAULT 0,
  `adminType` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL
) ENGINE = MyISAM CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of adminnoofnotification
-- ----------------------------
INSERT INTO `adminnoofnotification` VALUES ('1', 1, 'eao');
INSERT INTO `adminnoofnotification` VALUES ('2', 3, 'oic');
INSERT INTO `adminnoofnotification` VALUES ('3', 6, 'eao');
INSERT INTO `adminnoofnotification` VALUES ('4', 1, 'eao');
INSERT INTO `adminnoofnotification` VALUES ('5', 5, 'oic');
INSERT INTO `adminnoofnotification` VALUES ('6', 1, 'eao');
INSERT INTO `adminnoofnotification` VALUES ('7', 3, 'oic');

-- ----------------------------
-- Table structure for adminnotification
-- ----------------------------
DROP TABLE IF EXISTS `adminnotification`;
CREATE TABLE `adminnotification`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `adminId` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `notification` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `isSeen` tinyint(1) NOT NULL DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 41 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of adminnotification
-- ----------------------------
INSERT INTO `adminnotification` VALUES (29, '2', 'A new event has been created \"fffffff\"', 0, '2022-05-26 10:26:45');
INSERT INTO `adminnotification` VALUES (30, '5', 'A new event has been created \"fffffff\"', 0, '2022-05-26 10:26:45');
INSERT INTO `adminnotification` VALUES (31, '7', 'A new event has been created \"fffffff\"', 0, '2022-05-26 10:26:45');
INSERT INTO `adminnotification` VALUES (32, '2', 'A new event has been created \"ssssdsdsds\"', 0, '2022-05-26 10:30:41');
INSERT INTO `adminnotification` VALUES (33, '5', 'A new event has been created \"ssssdsdsds\"', 0, '2022-05-26 10:30:41');
INSERT INTO `adminnotification` VALUES (34, '7', 'A new event has been created \"ssssdsdsds\"', 0, '2022-05-26 10:30:41');
INSERT INTO `adminnotification` VALUES (35, '2', 'A new event has been created \"ssssdsdsds\"', 0, '2022-05-26 10:31:03');
INSERT INTO `adminnotification` VALUES (36, '5', 'A new event has been created \"ssssdsdsds\"', 0, '2022-05-26 10:31:03');
INSERT INTO `adminnotification` VALUES (37, '7', 'A new event has been created \"ssssdsdsds\"', 0, '2022-05-26 10:31:03');
INSERT INTO `adminnotification` VALUES (38, '1', 'A new event has been approved \"test1\"', 0, '2022-05-26 12:59:31');
INSERT INTO `adminnotification` VALUES (39, '4', 'A new event has been approved \"test1\"', 0, '2022-05-26 12:59:31');
INSERT INTO `adminnotification` VALUES (40, '6', 'A new event has been approved \"test1\"', 0, '2022-05-26 12:59:31');

-- ----------------------------
-- Table structure for event
-- ----------------------------
DROP TABLE IF EXISTS `event`;
CREATE TABLE `event`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `eventName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `eventHours` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `eventStartDate` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `eventEndDate` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `eventNoOfStudent` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `eventVenue` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `eventNeededMaterial` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `studentParticipating` int NULL DEFAULT 0,
  `eventStatus` tinyint(1) NULL DEFAULT 0,
  `scannedImage` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `dateAndTime` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `isEventDone` tinyint(1) NOT NULL DEFAULT 0,
  `isValidated` tinyint(1) NOT NULL DEFAULT 0,
  `schoolYear` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `semester` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 20 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of event
-- ----------------------------
INSERT INTO `event` VALUES (15, 'Blood Donation', '10', '2022-05-19', '2022-05-21', 'Unlimited Number of Student', 'Alert Center', 'Ballpen, Valtrace', 0, 1, 'uploads/maxresdefault.jpg', '8am-5pm', 0, 0, '2021-2022', '2nd Semester');
INSERT INTO `event` VALUES (16, 'Library', '15', '2022-05-19', '2022-05-19', '1', 'PLV Maysan', 'None', 1, 1, 'uploads/275174571_516296976508338_949279525004280798_n.jpg', '8am-5pm', 0, 1, '2021-2022', '2nd Semester');
INSERT INTO `event` VALUES (18, 'test1', '49', '2022-05-26', '2022-05-26', 'Unlimited Number of Student', 'dfgdfg', 'dfgdfg', 0, 1, 'uploads/Wallpaper.png', '45', 0, 0, '2021-2022', '1st Semester');
INSERT INTO `event` VALUES (19, 'ssssdsdsds', '49', '2022-05-26', '2022-05-26', 'Unlimited Number of Student', 'dfgdfg', 'dfgdfg', 0, 0, 'uploads/Wallpaper.png', '45', 0, 0, '2021-2022', '1st Semester');

-- ----------------------------
-- Table structure for eventandwishingtoparticipate
-- ----------------------------
DROP TABLE IF EXISTS `eventandwishingtoparticipate`;
CREATE TABLE `eventandwishingtoparticipate`  (
  `eventId` int NULL DEFAULT NULL,
  `studentId` int NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = FIXED;

-- ----------------------------
-- Records of eventandwishingtoparticipate
-- ----------------------------
INSERT INTO `eventandwishingtoparticipate` VALUES (15, 32);
INSERT INTO `eventandwishingtoparticipate` VALUES (15, 30);
INSERT INTO `eventandwishingtoparticipate` VALUES (16, 32);

-- ----------------------------
-- Table structure for eventstudentandhours
-- ----------------------------
DROP TABLE IF EXISTS `eventstudentandhours`;
CREATE TABLE `eventstudentandhours`  (
  `eventId` int NULL DEFAULT 1,
  `studentId` int NULL DEFAULT NULL,
  `timeIn` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '00:00',
  `timeOut` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '00:00',
  `hourRendered` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '0',
  `hours_multiplier` int NULL DEFAULT 1
) ENGINE = MyISAM CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of eventstudentandhours
-- ----------------------------

-- ----------------------------
-- Table structure for requestpassword
-- ----------------------------
DROP TABLE IF EXISTS `requestpassword`;
CREATE TABLE `requestpassword`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `usermail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenstatus` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'Pending',
  `date_created` datetime NULL DEFAULT current_timestamp,
  PRIMARY KEY (`token`) USING BTREE,
  UNIQUE INDEX `id`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of requestpassword
-- ----------------------------
INSERT INTO `requestpassword` VALUES (1, 'plvscs@gmail.com', '1653358020', 'Pending', '2022-05-24 10:07:00');
INSERT INTO `requestpassword` VALUES (2, 'plvscs@gmail.com', '1653358202', 'Pending', '2022-05-24 10:10:02');
INSERT INTO `requestpassword` VALUES (3, 'plvscs@gmail.com', '1653358222', 'Pending', '2022-05-24 10:10:22');
INSERT INTO `requestpassword` VALUES (4, 'plvscs@gmail.com', '1653358252', 'Pending', '2022-05-24 10:10:52');
INSERT INTO `requestpassword` VALUES (5, 'lorraineangelilibatique@gmail.com', '1653358761', 'Done', '2022-05-24 10:19:21');
INSERT INTO `requestpassword` VALUES (6, 'lorraineangelilibatique@gmail.com', '1653361452', 'Pending', '2022-05-24 11:04:12');
INSERT INTO `requestpassword` VALUES (7, 'lorraineangelilibatique@gmail.com', '1653450194', 'Pending', '2022-05-25 11:43:14');
INSERT INTO `requestpassword` VALUES (8, 'lorraineangelilibatique@gmail.com', '1653450465', 'Pending', '2022-05-25 11:47:45');
INSERT INTO `requestpassword` VALUES (9, 'lorraineangelilibatique@gmail.com', '1653450604', 'Pending', '2022-05-25 11:50:04');
INSERT INTO `requestpassword` VALUES (10, 'lorraineangelilibatique@gmail.com', '1653450886', 'Pending', '2022-05-25 11:54:46');
INSERT INTO `requestpassword` VALUES (11, 'zolerjerwen@gmail.com', '1653522365', 'Pending', '2022-05-26 07:46:05');
INSERT INTO `requestpassword` VALUES (12, 'zolerjerwen@gmail.com', '1653523503', 'Done', '2022-05-26 08:05:03');
INSERT INTO `requestpassword` VALUES (13, 'zolerjerwen@gmail.com', '1653526869', 'Done', '2022-05-26 09:01:09');
INSERT INTO `requestpassword` VALUES (14, 'lorraineangelilibatique@gmail.com', '1653528270', 'Done', '2022-05-26 09:24:30');
INSERT INTO `requestpassword` VALUES (15, 'zolerjerwen@gmail.com', '1653531334', 'Done', '2022-05-26 10:15:34');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentNo` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `surname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `contactNo` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `firstName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `middleName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `course` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `emergencyName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `emergencyNumber` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `studentStatus` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT '\'active\'',
  `lackingHours` int NOT NULL DEFAULT 160,
  `academicYearStarted` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`studentNo`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 33 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (31, '18-00', 'zolerjerwen@gmail.com', 'Cruz', '9672180574', 'Aleah', 'Tongco St., Maysan Valenzuela', 'Gani', NULL, 'Bachelor of Science in Information Technology', 'gb+MXPHVj81P28n8rezGTPyUMxAC', NULL, NULL, 'Active', 40, '18-19');
INSERT INTO `student` VALUES (30, '18-0011', 'almar_glen@yahoo.com', 'Cruz', '9420509572', 'Aldrin', 'Tongco St., Maysan Valenzuela', 'Aquinde', NULL, 'Bachelor of Science in Information Technology', 'oJvR7ioSbKhTc6kGNnacew==', NULL, NULL, 'Active', 90, '18-19');
INSERT INTO `student` VALUES (32, '14-10', 'zolerjerwen@gmail.com', 'Reloz', '2022', 'Wen', 'CC', 'L', NULL, 'Bachelor of Science in Electrical Engineering', 'gb+MXPHVj81P28n8rezGTPyUMxAC', 'undefined', 'undefined', '\'active\'', 50, '13-14');
INSERT INTO `student` VALUES (29, '18-0010', 'ag.marcelo28@gmail.com', 'Cruz', '9291156649', 'Angelica', 'Tongco St., Maysan Valenzuela', 'Gani', NULL, 'Bachelor of Science in Information Technology', 'oJvR7ioSbKhTc6kGNnacew==', NULL, NULL, 'Active', 70, '18-19');
INSERT INTO `student` VALUES (27, '18-0008', 'superiorwarrior01@gmail.com', 'Cruz', '9266848477', 'Adrian', 'Tongco St., Maysan Valenzuela', 'Aquinde', NULL, 'Bachelor of Science in Information Technology', 'oJvR7ioSbKhTc6kGNnacew==', NULL, NULL, 'Active', 160, '18-19');
INSERT INTO `student` VALUES (28, '18-0009', 'lorraineangelilibatique@gmail.com', 'Doe', '9235208660', 'Lorraine', 'Tongco St., Maysan Valenzuela', 'Doe', NULL, 'Bachelor of Science in Information Technology', 'oJvR7ioSbKhTc6kGNnacew==', NULL, NULL, 'Active', 100, '18-19');

-- ----------------------------
-- Table structure for studentandeventparticipatedin
-- ----------------------------
DROP TABLE IF EXISTS `studentandeventparticipatedin`;
CREATE TABLE `studentandeventparticipatedin`  (
  `eventId` int NULL DEFAULT NULL,
  `studentId` int NULL DEFAULT NULL
) ENGINE = MyISAM CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = FIXED;

-- ----------------------------
-- Records of studentandeventparticipatedin
-- ----------------------------

-- ----------------------------
-- Table structure for studentnoofnotification
-- ----------------------------
DROP TABLE IF EXISTS `studentnoofnotification`;
CREATE TABLE `studentnoofnotification`  (
  `studentId` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `noOfNotification` int NOT NULL DEFAULT 0
) ENGINE = MyISAM CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of studentnoofnotification
-- ----------------------------
INSERT INTO `studentnoofnotification` VALUES ('4', 3);
INSERT INTO `studentnoofnotification` VALUES ('3', 1);
INSERT INTO `studentnoofnotification` VALUES ('1', 1);
INSERT INTO `studentnoofnotification` VALUES ('2', 6);
INSERT INTO `studentnoofnotification` VALUES ('5', 1);
INSERT INTO `studentnoofnotification` VALUES ('6', 1);
INSERT INTO `studentnoofnotification` VALUES ('32', 0);

-- ----------------------------
-- Table structure for studentnotification
-- ----------------------------
DROP TABLE IF EXISTS `studentnotification`;
CREATE TABLE `studentnotification`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentId` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `notification` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `isSeen` tinyint(1) NOT NULL DEFAULT 0,
  `time` datetime NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 23 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of studentnotification
-- ----------------------------
INSERT INTO `studentnotification` VALUES (17, '27', 'A new event has been approved, please check the event/activities tab for \"test1\"', 0, '2022-05-26 12:59:31');
INSERT INTO `studentnotification` VALUES (18, '28', 'A new event has been approved, please check the event/activities tab for \"test1\"', 0, '2022-05-26 12:59:31');
INSERT INTO `studentnotification` VALUES (19, '29', 'A new event has been approved, please check the event/activities tab for \"test1\"', 0, '2022-05-26 12:59:31');
INSERT INTO `studentnotification` VALUES (20, '30', 'A new event has been approved, please check the event/activities tab for \"test1\"', 0, '2022-05-26 12:59:31');
INSERT INTO `studentnotification` VALUES (21, '31', 'A new event has been approved, please check the event/activities tab for \"test1\"', 0, '2022-05-26 12:59:31');
INSERT INTO `studentnotification` VALUES (22, '32', 'A new event has been approved, please check the event/activities tab for \"test1\"', 0, '2022-05-26 12:59:31');

SET FOREIGN_KEY_CHECKS = 1;
