-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2021 at 04:00 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_bravo`
--

-- --------------------------------------------------------

--
-- Table structure for table `hire`
--

CREATE TABLE `hire` (
  `id` int(11) NOT NULL,
  `id_pelamar` int(11) DEFAULT NULL,
  `id_perekrut` int(11) DEFAULT NULL,
  `project` varchar(255) DEFAULT NULL,
  `desc_hire` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `portofolios`
--

CREATE TABLE `portofolios` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `portofolio_file` varchar(150) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `portofolios`
--

INSERT INTO `portofolios` (`id`, `id_user`, `portofolio_file`, `created_at`, `updated_at`) VALUES
(1, 4, 'https://images.unsplash.com/photo-1563354503-b2cd85ae032c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&', '2021-07-01 10:45:06', NULL),
(2, 4, 'https://images.unsplash.com/photo-1525440584458-b53d13a848de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4', '2021-07-01 11:35:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `id_user`, `name`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Software Engineer', '2021-06-30 04:00:04', NULL),
(2, 4, 'JAVA', '2021-07-01 11:27:23', NULL),
(3, 4, 'PHP', '2021-07-01 11:27:54', NULL),
(4, 4, 'Javascript', '2021-07-01 11:27:54', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `images` varchar(255) DEFAULT NULL,
  `role_users` varchar(100) DEFAULT NULL,
  `type_users` varchar(100) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `job_desk` varchar(80) NOT NULL,
  `working_time` varchar(80) NOT NULL,
  `address` text DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `position` varchar(50) DEFAULT NULL,
  `skill` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `instagram` varchar(100) DEFAULT NULL,
  `github` varchar(100) DEFAULT NULL,
  `gitlab` varchar(100) DEFAULT NULL,
  `created_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_time` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `images`, `role_users`, `type_users`, `name`, `email`, `password`, `job_desk`, `working_time`, `address`, `phone_number`, `gender`, `position`, `skill`, `description`, `company_name`, `instagram`, `github`, `gitlab`, `created_time`, `updated_time`) VALUES
(1, NULL, NULL, '', 'Abdi Priyangga', 'abdi@gmail.com', '$2b$10$wHogMd088H/Rkphr4mOK5e7r.DSghWdrOq8w7DrCzpiTvlsHZjC0W', '', '', NULL, '021178908767', NULL, 'HRD', NULL, NULL, 'Arkademy', NULL, NULL, NULL, '2021-06-30 06:20:38', NULL),
(2, NULL, NULL, '', 'Angga', 'abdi2@gmail.com', '$2b$10$gzTN3EldzjuHJyQaKFzuHuK7N2CMLNw4rVta5nNPnk4VGLg3.EnyK', '', '', NULL, '021178908767', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-06-30 07:46:37', NULL),
(3, NULL, NULL, 'recruiter', 'Ujang Pribadi', 'ujang@gmail.com', '$2b$10$4tZtH1Z6pVeH7RxhFvf3a.NPMwZU58d9.R3.ycQpNCq/kfUskZMpu', '', '', NULL, '021178908767', NULL, 'COO', NULL, NULL, 'Tokopedia', NULL, NULL, NULL, '2021-06-30 08:56:50', NULL),
(4, NULL, NULL, '', 'jojono', 'jojon@gmail.com', '$2b$10$64BU49vQo1hxqfQvH3Ux5.lt/i.zjwynM/LDaltUJ0tsppcOXGe7K', '', '', NULL, '08988778876', NULL, NULL, NULL, NULL, NULL, 'jonoburgerkill', 'jonoluisFigo', 'jonocahabatcejatie', '2021-07-01 10:13:53', '2021-07-01 12:47:24');

-- --------------------------------------------------------

--
-- Table structure for table `working_experience`
--

CREATE TABLE `working_experience` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `company_name` varchar(150) NOT NULL,
  `position` varchar(80) NOT NULL,
  `years` varchar(80) NOT NULL,
  `description` varchar(80) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `working_experience`
--

INSERT INTO `working_experience` (`id`, `id_user`, `company_name`, `position`, `years`, `description`, `created_at`, `updated_at`) VALUES
(2, 4, 'Tokopedia', 'Frontend Enginer', '2019-2020', 'i have experience in designed web ui and ux', '2021-07-01 13:20:31', '2021-07-01 13:26:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hire`
--
ALTER TABLE `hire`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portofolios`
--
ALTER TABLE `portofolios`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `working_experience`
--
ALTER TABLE `working_experience`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hire`
--
ALTER TABLE `hire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portofolios`
--
ALTER TABLE `portofolios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `working_experience`
--
ALTER TABLE `working_experience`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
