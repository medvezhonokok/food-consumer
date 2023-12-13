-- phpMyAdmin SQL Dump
-- version 3.2.0.1
-- http://www.phpmyadmin.net
--
-- ����: localhost:3306
-- ����� ��������: ��� 15 2010 �., 20:52
-- ������ �������: 5.0.67
-- ������ PHP: 5.2.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- ���� ������: `food-consumer`
--

-- --------------------------------------------------------

--
-- ��������� ������� `User`
--                  

DROP TABLE IF EXISTS `User`;
CREATE TABLE IF NOT EXISTS `User` (
  `userId` bigint(20) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `passwordSha` varchar(255) DEFAULT NULL,
  `isManager` tinyint(1) NOT NULL DEFAULT 0,
  `isWaiter` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
COMMIT;

