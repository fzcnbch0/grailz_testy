-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Cze 10, 2024 at 01:14 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grailz`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `item`
--

CREATE TABLE `item` (
  `item_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`item_id`, `name`, `description`, `price`) VALUES
(1, 'black-levis', 'Classic black Levis jeans for everyday wear.', 19.99),
(2, 'black-pants', 'Classic black denim jeans with a comfortable fit.', 49.99),
(3, 'black-print-tshirt', 'Stylish black printed t-shirt for a trendy look.', 199.99),
(4, 'black-tshirt', 'Simple black t-shirt for casual wear.', 29.99),
(5, 'blue-jeans', 'Comfortable blue jeans for everyday wear.', 39.99),
(6, 'boxy-tshirt', 'Loose-fitting boxy t-shirt for a relaxed look.', 149.99),
(7, 'camo-jacket', 'Trendy camo jacket for a rugged outdoor style.', 59.99),
(8, 'camo-pants', 'Camouflage print pants for a military-inspired look.', 14.99),
(9, 'double-knne-pants', 'Stylish double-knee pants for added durability.', 24.99),
(10, 'vintage-jacket', 'Vintage-style jacket for a retro look.', 69.99),
(14, 'white-hat', 'Classic white hat to complement any outfit.', 39.99),
(15, 'white-navy-hat', 'Stylish white and navy hat for a modern look.', 59.99),
(16, 'white-tshirt', 'Simple white t-shirt for everyday wear.', 79.99);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `item_category`
--

CREATE TABLE `item_category` (
  `item_id` int(11) NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `size` varchar(10) DEFAULT NULL,
  `designer` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item_category`
--

INSERT INTO `item_category` (`item_id`, `department`, `category`, `size`, `designer`) VALUES
(1, 'Men', 'Bottoms', 'L', 'Affliction'),
(2, 'Women', 'Bottoms', 'M', 'Vintage'),
(3, 'Men', 'Tops', 'XL', 'Y2K'),
(4, 'Women', 'Tops', 'M', 'Affliction'),
(5, 'Men', 'Bottoms', 'L', 'Vintage'),
(6, 'Men', 'Tops', 'L', 'Vintage'),
(7, 'women', 'tops', '10', 'Vintage'),
(8, 'women', 'bottoms', 'One Size', 'Affliction'),
(9, 'men', 'bottoms', 'One Size', 'Y2K'),
(10, 'women', 'tops', '9', 'Vintage'),
(14, 'Men', 'accessories', 'L', 'Affliction'),
(15, 'Women', 'accessories', 'M', 'Vintage'),
(16, 'Men', 'tops', 'M', 'Y2K');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `measurements`
--

CREATE TABLE `measurements` (
  `item_id` int(11) NOT NULL,
  `length` float DEFAULT NULL,
  `width` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `measurements`
--

INSERT INTO `measurements` (`item_id`, `length`, `width`) VALUES
(1, 28.5, 18),
(2, 40, 20),
(3, 25, 22),
(4, 35, 16),
(5, 42, 22.5),
(6, 48, 24),
(7, 30, 10),
(8, 7, 6.5),
(9, 5.5, 5),
(10, 29, 10.5),
(14, 30, 20),
(15, 35, 18.5),
(16, 27, 22);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `offer`
--

CREATE TABLE `offer` (
  `item_id` int(11) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `offer`
--

INSERT INTO `offer` (`item_id`, `image_path`) VALUES
(1, '/public/products/black-levis.jpg'),
(2, '/products/black-pants.jpg'),
(3, '/products/black-print-tshirt.jpg'),
(4, '/products/black-tshirt.jpg'),
(5, '/products/blue-jeans.jpg'),
(6, '/products/boxy-tshirt.jpg'),
(7, '/products/camo-jacket.jpg'),
(8, '/products/camo-pants.jpg'),
(9, '/products/double-knne-pants.jpg'),
(10, '/products/vintage-jacket.jpg'),
(14, '/products/white-hat.jpg'),
(15, '/products/white-navy-hat.jpg'),
(16, '/products/white-tshirt.jpg');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `balance` decimal(10,2) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `name`, `balance`, `city`, `password`) VALUES
(1, 'Bruno Szwec', 100.00, 'New York', 'password1'),
(2, 'Jane Smith', 150.50, 'Los Angeles', 'password2'),
(3, 'Alice Johnson', 75.25, 'Chicago', 'password3'),
(4, 'Bob Brown', 50.00, 'Houston', 'password4'),
(5, 'Charlie Davis', 200.00, 'Phoenix', 'password5'),
(6, 'Diana Evans', 300.75, 'Philadelphia', 'password6'),
(7, 'Frank Green', 125.00, 'San Antonio', 'password7'),
(8, 'Grace Harris', 80.00, 'San Diego', 'password8'),
(9, 'Henry Irwin', 90.50, 'Dallas', 'password9'),
(10, 'Ivy Johnson', 120.00, 'San Jose', 'password10'),
(16, '1', NULL, NULL, '1'),
(18, '3', NULL, '3', '3');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_cart`
--

CREATE TABLE `user_cart` (
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_cart`
--

INSERT INTO `user_cart` (`user_id`, `item_id`) VALUES
(2, 1),
(2, 4),
(2, 15),
(3, 5),
(3, 6),
(3, 16),
(4, 7),
(4, 8),
(5, 9),
(5, 10),
(6, 1),
(6, 2),
(7, 3),
(7, 4),
(8, 5),
(8, 6),
(9, 7),
(9, 8),
(10, 9),
(10, 10),
(16, 1),
(16, 3),
(16, 4),
(16, 5),
(16, 6),
(16, 8),
(18, 2);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_orders`
--

CREATE TABLE `user_orders` (
  `user_id` int(11) DEFAULT NULL,
  `order_id` int(11) NOT NULL,
  `item_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_orders`
--

INSERT INTO `user_orders` (`user_id`, `order_id`, `item_id`) VALUES
(1, 26, 6),
(1, 27, 4),
(1, 28, 4),
(1, 29, 1),
(1, 30, 3),
(1, 31, 9);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_shipping`
--

CREATE TABLE `user_shipping` (
  `user_id` int(11) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_shipping`
--

INSERT INTO `user_shipping` (`user_id`, `address`, `city`, `state`, `postal_code`, `country`, `phone_number`) VALUES
(1, 'Limonkowa 6/2', 'Poznań', 'Wielkopolska', '10001', 'Poland', '665 660 112'),
(2, '456 Maple Ave', 'Los Angeles', 'CA', '90001', 'USA', '555-5678'),
(3, '789 Oak Dr', 'Chicago', 'IL', '60601', 'USA', '555-8765'),
(4, '101 Pine St', 'Houston', 'TX', '77001', 'USA', '555-4321'),
(5, '202 Birch Rd', 'Phoenix', 'AZ', '85001', 'USA', '555-3456'),
(6, '303 Cedar Ln', 'Philadelphia', 'PA', '19101', 'USA', '555-6543'),
(7, '404 Spruce Ct', 'San Antonio', 'TX', '78201', 'USA', '555-9876'),
(8, '505 Willow Blvd', 'San Diego', 'CA', '92101', 'USA', '555-7654'),
(9, '606 Elm St', 'Dallas', 'TX', '75201', 'USA', '555-8764'),
(10, '707 Fir St', 'San Jose', 'CA', '95101', 'USA', '555-6542');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`item_id`);

--
-- Indeksy dla tabeli `item_category`
--
ALTER TABLE `item_category`
  ADD PRIMARY KEY (`item_id`);

--
-- Indeksy dla tabeli `measurements`
--
ALTER TABLE `measurements`
  ADD PRIMARY KEY (`item_id`);

--
-- Indeksy dla tabeli `offer`
--
ALTER TABLE `offer`
  ADD PRIMARY KEY (`item_id`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indeksy dla tabeli `user_cart`
--
ALTER TABLE `user_cart`
  ADD PRIMARY KEY (`user_id`,`item_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indeksy dla tabeli `user_orders`
--
ALTER TABLE `user_orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indeksy dla tabeli `user_shipping`
--
ALTER TABLE `user_shipping`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user_orders`
--
ALTER TABLE `user_orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `item_category`
--
ALTER TABLE `item_category`
  ADD CONSTRAINT `item_category_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`);

--
-- Constraints for table `measurements`
--
ALTER TABLE `measurements`
  ADD CONSTRAINT `measurements_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`);

--
-- Constraints for table `offer`
--
ALTER TABLE `offer`
  ADD CONSTRAINT `offer_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`);

--
-- Constraints for table `user_cart`
--
ALTER TABLE `user_cart`
  ADD CONSTRAINT `user_cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `user_cart_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`);

--
-- Constraints for table `user_orders`
--
ALTER TABLE `user_orders`
  ADD CONSTRAINT `user_orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `user_orders_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`);

--
-- Constraints for table `user_shipping`
--
ALTER TABLE `user_shipping`
  ADD CONSTRAINT `user_shipping_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
