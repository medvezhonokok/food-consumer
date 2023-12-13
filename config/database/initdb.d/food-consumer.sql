-- phpMyAdmin SQL Dump
-- version 5.1.1-1.fc33
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3307:3307
-- Время создания: Июл 25 2023 г., 16:14
-- Версия сервера: 10.4.20-MariaDB-log
-- Версия PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `food-consumer`
--

-- --------------------------------------------------------

--
-- Структура таблицы `User`
--

CREATE TABLE `User` (
  `userId` bigint(20) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `passwordSha` varchar(255) DEFAULT NULL,
  `isManager` tinyint(1) NOT NULL DEFAULT 0,
  `isWaiter` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
