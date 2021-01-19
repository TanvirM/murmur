-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 15, 2021 at 02:07 PM
-- Server version: 8.0.22-0ubuntu0.20.04.3
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `murmur`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `follower_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`id`, `user_id`, `follower_id`, `created_at`, `updated_at`) VALUES
(6, 1, 2, '2021-01-14 08:51:57', NULL),
(7, 1, 5, '2021-01-14 08:52:02', NULL),
(8, 1, 4, '2021-01-14 08:52:07', NULL),
(9, 2, 5, '2021-01-14 08:52:19', NULL),
(10, 2, 3, '2021-01-14 08:52:27', NULL),
(11, 2, 1, '2021-01-14 09:15:41', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `murmur_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `user_id`, `murmur_id`, `created_at`, `updated_at`) VALUES
(1, 1, 2, '2021-01-13 21:10:07', NULL),
(2, 1, 3, '2021-01-13 21:11:28', NULL),
(3, 1, 5, '2021-01-13 21:11:30', NULL),
(4, 2, 3, '2021-01-13 21:18:32', NULL),
(5, 5, 3, '2021-01-13 21:18:38', NULL),
(6, 3, 5, '2021-01-13 21:18:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `murmurs`
--

CREATE TABLE `murmurs` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `post_text` varchar(10000) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `murmurs`
--

INSERT INTO `murmurs` (`id`, `user_id`, `post_text`, `created_at`, `updated_at`) VALUES
(1, 1, 'Unlimited texts and calls to the US & Canada. Your own real phone number! The best free texting app on the store with free calling and free, multiple phone ', '2021-01-13 21:14:38', NULL),
(2, 2, 'English Language Learners Definition of text. (Entry 1 of 2). : the original words of a piece of writing or a speech.', '2021-01-13 21:14:38', NULL),
(3, 5, 'Send unlimited free texts and make WiFi calls from a free phone number. Download the free app or sign up online to pick your free phone number.', '2021-01-13 21:14:39', NULL),
(4, 4, 'English Language Learners Definition of text. (Entry 1 of 2). : the original words of a piece of writing or a speech.', '2021-01-13 21:14:39', NULL),
(5, 1, 'Invalid default value for \'created_at\' · Issue #3602 · laravel , In which case maybe we should make created_at default to CURRENT_TIMESTAMP and updated_at ', '2021-01-13 21:16:09', NULL),
(6, 1, 'maybe we should make created_at default to CURRENT_TIMESTAMP and updated_at ', '2021-01-13 21:16:11', NULL),
(7, 5, 'Sep 17, 2018 — js and MySql in a Docker container: Node. js being so popular and MySQL being one of the most sought after DB management system, it is required for an application to combine these two and get the optimal results.', '2021-01-13 21:16:52', NULL),
(8, 3, 'MySQL being one of the most sought after DB management system, it is required for an application to combine these two and get the optimal results.', '2021-01-13 21:17:26', NULL),
(9, 2, 'In addition to canonicalized MIME types, you may also use extension names mapped to these types for a slightly less verbose implementation:\r\n\r\n', '2021-01-13 21:17:51', NULL),
(10, 4, 'HHY', '2021-01-14 12:16:08', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`, `created_at`, `updated_at`) VALUES
(1, 'Muhammad Jubayer', 'jubayer123', 'jubayer@gmail.com', '2021-01-13 21:04:28', NULL),
(2, 'MD. Tanvir M', 't123', 'tanvir.mohammad@gmail.com', '2021-01-13 21:05:46', NULL),
(3, 'MD. Khairullah Nayan', 'nayan123', 'nayan@gmail.com', '2021-01-13 21:05:46', NULL),
(4, 'Muhammad Junaid', 'junaid123', 'junaid375@gmail.com', '2021-01-13 21:05:53', NULL),
(5, 'MD. Khalekuzzaman', 'zaman123', 'zaman@gmail.com', '2021-01-13 21:05:53', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `murmurs`
--
ALTER TABLE `murmurs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `murmurs`
--
ALTER TABLE `murmurs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
