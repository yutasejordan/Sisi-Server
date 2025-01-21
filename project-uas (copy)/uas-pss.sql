SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

SELECT 'Creating categories table' as '';
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

SELECT 'Inserting categories data' as '';
INSERT INTO `categories` (`category_id`, `nama`) VALUES
(1, 'Elektronik'),
(2, 'Makanan'),
(3, 'Kendaraan');

SELECT 'Creating products table' as '';
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `harga` int(20) NOT NULL,
  `jml_stok` int(11) NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

SELECT 'Inserting products data' as '';
INSERT INTO `products` (`product_id`, `nama`, `category_id`, `harga`, `jml_stok`) VALUES
(1, 'Kulkass', 1, 1000000, 10);

SELECT 'Creating users table' as '';
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

SELECT 'Inserting users data' as '';
INSERT INTO `users` (`user_id`, `username`, `email`, `password`) VALUES
(1, 'yutase', 'yutase@gmail.com', '$2a$10$dTaF7pi0IiVI.ibfuXEE3.vp48wIikliiuRyeSJiM04aKpNozWSZa'),
(2, 'sabdo', 'sabdo@gmail.com', '$2a$10$k2H6BEIYMu4bO9VGX4IL5OPyUuwLlKBTJoKBmOHIwFi3mEJgsWwii');

SELECT 'All database setup completed successfully' as '';

COMMIT;