SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `seek`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `customers`
--

INSERT INTO `customers` (`id`, `name`) VALUES
(1, 'Ibrahim Brumate'),
(2, 'Unilever'),
(3, 'Apple'),
(4, 'Nike'),
(5, 'Ford');

-- --------------------------------------------------------

--
-- Estrutura da tabela `customers_discounts`
--

CREATE TABLE `customers_discounts` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `discount_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `customers_discounts`
--

INSERT INTO `customers_discounts` (`id`, `customer_id`, `discount_id`) VALUES
(1, 2, 1),
(2, 3, 2),
(3, 4, 3),
(4, 5, 4),
(5, 5, 5),
(6, 5, 6);

-- --------------------------------------------------------

--
-- Estrutura da tabela `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `sku` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `products`
--

INSERT INTO `products` (`id`, `sku`, `name`, `price`) VALUES
(1, 'classic', 'Classic Ad', '269.99'),
(2, 'standout', 'Standout Ad', '322.99'),
(3, 'premium', 'Premium Ad', '394.99');

-- --------------------------------------------------------

--
-- Estrutura da tabela `products_discounts`
--

CREATE TABLE `products_discounts` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `sum` int(11) DEFAULT NULL,
  `new_price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `products_discounts`
--

INSERT INTO `products_discounts` (`id`, `product_id`, `name`, `amount`, `sum`, `new_price`) VALUES
(1, 1, 'Gets a for 3 for 2 deal', 2, 1, NULL),
(2, 2, 'Standout Ads drops to $299', NULL, NULL, '299.00'),
(3, 3, 'Gets a discount on Premium Ads where 4 or more are purchased', 4, NULL, '379.99'),
(4, 1, 'Gets a 5 for 4 deal', 4, 1, NULL),
(5, 2, 'Standout Ads drops to $309.99', NULL, NULL, '309.99'),
(6, 3, 'Gets a discount on Premium Ads when 3 or more are purchased', 3, NULL, '389.99');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers_discounts`
--
ALTER TABLE `customers_discounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customer_id` (`customer_id`,`discount_id`),
  ADD KEY `discount_id` (`discount_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sku` (`sku`);

--
-- Indexes for table `products_discounts`
--
ALTER TABLE `products_discounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `customers_discounts`
--
ALTER TABLE `customers_discounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products_discounts`
--
ALTER TABLE `products_discounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `customers_discounts`
--
ALTER TABLE `customers_discounts`
  ADD CONSTRAINT `customers_discounts_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `customers_discounts_ibfk_2` FOREIGN KEY (`discount_id`) REFERENCES `products_discounts` (`id`);

--
-- Limitadores para a tabela `products_discounts`
--
ALTER TABLE `products_discounts`
  ADD CONSTRAINT `products_discounts_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
