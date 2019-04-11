-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 10. Apr, 2019 14:42 PM
-- Tjener-versjon: 5.7.25-0ubuntu0.18.04.2
-- PHP Version: 7.2.15-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `g_idri1005_10`
--
CREATE DATABASE IF NOT EXISTS `g_idri1005_10` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `g_idri1005_10`;

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `ansatte`
--

CREATE TABLE `ansatte` (
  `ansattid` int(11) NOT NULL,
  `fornavn` varchar(45) DEFAULT NULL,
  `etternavn` varchar(45) DEFAULT NULL,
  `epost` varchar(45) DEFAULT NULL,
  `passord` varchar(45) DEFAULT NULL,
  `telefon` varchar(45) DEFAULT NULL,
  `stilling_stillingid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `ansatte`
--

INSERT INTO `ansatte` (`ansattid`, `fornavn`, `etternavn`, `epost`, `passord`, `telefon`, `stilling_stillingid`) VALUES
(1, 'Per', 'Pettersen', 'perpet@sykkelas.no', '1234', '87654321', 1),
(2, 'Test', 'Tester', 'test@test', 'test', '12345678', 1);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `kunder`
--

CREATE TABLE `kunder` (
  `brukerid` int(11) NOT NULL,
  `fornavn` varchar(45) NOT NULL,
  `etternavn` varchar(45) NOT NULL,
  `epost` varchar(45) NOT NULL,
  `addresse` varchar(45) NOT NULL,
  `postnr` varchar(45) NOT NULL,
  `poststed` varchar(45) NOT NULL,
  `telefon` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `kunder`
--

INSERT INTO `kunder` (`brukerid`, `fornavn`, `etternavn`, `epost`, `addresse`, `postnr`, `poststed`, `telefon`) VALUES
(1, 'Knut', 'Larsen', 'knutlar420@gmail.com', 'Sinsenkrysset 2', '0585', 'Oslo', '12345678'),
(2, 'Oskar', 'Eriksen', 'xxxslayerxxx@hotmail.com', 'Trondheimsveien 7', '0459', 'Oslo', '42042012'),
(37, 'mjhn', 'jhn', 'kjh', 'kjhg', '34567', 'kjmhg', '45678'),
(38, 'lkjh', 'kjmhng', 'lkjh', 'k,jmhgfdq', '876', 'kjhg', '87654'),
(39, 'ida', 'jakobsen', 'ida99', 'lerkendal', '8448', 'oslo', '7394718'),
(40, 'ole', 'kristian', 'ole00', 'jergj', '83', 'hejg', '83947'),
(41, 'hj', 'hj', 'hj', 'ghj', '678', 'ghj', '678'),
(42, 'rsgd', 'jk', 'uhjk', 'ijk', '890', 'ijkl', '749'),
(43, 'IDa ', 'ujqkr', 'jisdg', 'jkm', '789', 'hjkn', '7890'),
(46, 'Lise ', 'Knut', 'Lise@hsgs.no', 'igkvsm', '213', 'wgkvj', '4829471'),
(47, 'hjk', 'jkm', 'jk', 'jkn', '890', 'ghj', '7890'),
(48, 'Ida ', 'Jakobsen', 'Ida99@hotmail.com', 'Klæbuveien', '7031', 'Trondheim ', '47395728'),
(49, 'euigj', 'iklfsaq', 'jkfsaij', 'jkn', '789', 'jhnkm', '6789'),
(50, 'hjgd', 'hjk', 'jkbkj', 'hjk', '8471', 'gyhj', '2842874'),
(51, 'guhj', 'guhij', 'vghbjnk', 'vghbjn', '657', 'ghvj', '5678'),
(52, 'Ida', 'Knut', 'Ida', 'Lerkendal', '6894', 'Trondheim', '7898765'),
(199, 'wadwad', 'wadwad', 'dwadawd', 'dawdawd', '2', 'dawdaw', '2'),
(200, 'dawdawd', 'dawdawd', 'awdadww', 'dwadwa', '2', 'dawd', '3'),
(201, 'dwad', 'wdadawd', 'wadaw', 'wadaw', '2', 'dwad', '3'),
(202, 'abdi', 'wadawdd', 'wadad', 'awdaw', '34', 'dawdaw', '53'),
(203, 'Tore På', 'Sporet', 'torepåsporet@gmail.com', '420 Røkevegen', '7480', 'Ganja', '95054627'),
(204, 'test', 'test', 'fsdf', 'yest', '3213', 'test', '239283'),
(205, 'jhg', 'mjghnv', 'gn', 'hng', '45', 'vh', '456'),
(206, 'hbjk', 'vhjbkjnkbhkjnb', 'vbjvjh', 'vjgvj', '67', 'bjh', '5678');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `lager`
--

CREATE TABLE `lager` (
  `lagerid` int(11) NOT NULL,
  `lager` varchar(45) NOT NULL,
  `sted_stedid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `lager`
--

INSERT INTO `lager` (`lagerid`, `lager`, `sted_stedid`) VALUES
(1, 'Haugastøl', 1),
(2, 'Finse', 2);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `leietaker`
--

CREATE TABLE `leietaker` (
  `leieid` int(11) NOT NULL,
  `start` datetime NOT NULL,
  `slutt` datetime NOT NULL,
  `kunder_brukerid` int(11) NOT NULL,
  `ansatte_ansattid` int(11) NOT NULL,
  `hentested` int(11) NOT NULL,
  `leveringssted` int(11) NOT NULL,
  `personer` int(11) NOT NULL,
  `registrert` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `leietaker`
--

INSERT INTO `leietaker` (`leieid`, `start`, `slutt`, `kunder_brukerid`, `ansatte_ansattid`, `hentested`, `leveringssted`, `personer`, `registrert`) VALUES
(22, '2019-01-20 13:30:00', '2019-01-20 13:30:00', 1, 1, 2, 2, 1, NULL),
(23, '2019-01-26 00:00:00', '2019-01-26 00:00:00', 39, 1, 2, 5, 3, NULL),
(25, '2019-02-01 23:00:00', '2019-02-22 22:59:00', 40, 1, 2, 2, 1, NULL),
(26, '2019-01-20 13:50:00', '2019-01-20 13:50:00', 1, 1, 1, 5, 1, NULL),
(27, '2019-03-20 13:50:00', '2019-03-20 13:50:00', 1, 1, 1, 1, 1, NULL),
(28, '2019-03-20 13:50:00', '2019-03-20 13:50:00', 1, 1, 1, 1, 1, NULL),
(29, '2019-03-20 13:50:00', '2019-03-20 13:50:00', 1, 1, 1, 1, 1, NULL),
(30, '2019-03-20 13:50:00', '2019-03-20 13:50:00', 1, 1, 1, 1, 1, NULL),
(31, '2019-01-20 14:00:00', '2019-01-20 14:00:00', 1, 1, 2, 5, 1, NULL),
(32, '2019-03-01 23:00:00', '2019-03-22 23:56:00', 41, 1, 1, 1, 1, NULL),
(33, '2019-03-20 14:10:00', '2019-03-20 14:10:00', 1, 1, 1, 1, 1, NULL),
(34, '2019-03-20 14:10:00', '2019-03-20 14:10:00', 1, 1, 1, 1, 1, NULL),
(35, '2019-03-20 14:10:00', '2019-03-20 14:10:00', 1, 1, 1, 1, 1, NULL),
(171, '2019-03-08 13:40:00', '2019-03-08 13:40:00', 1, 2, 2, 5, 1, NULL),
(172, '2019-03-25 00:00:00', '2019-03-25 00:00:00', 200, 1, 1, 4, 3, NULL),
(173, '2019-04-27 02:02:00', '2019-04-26 02:02:00', 202, 1, 2, 4, 0, NULL),
(174, '2019-04-09 13:00:00', '2019-04-09 13:00:00', 1, 2, 1, 1, 1, '2019-04-09 13:00:04'),
(175, '2019-04-09 13:30:00', '2019-04-09 13:30:00', 2, 2, 1, 1, 1, '2019-04-09 13:27:11'),
(176, '2019-04-09 16:40:00', '2019-04-09 16:40:00', 203, 1, 1, 1, 1, '2019-04-09 16:36:14'),
(177, '2019-04-10 14:50:00', '2019-04-10 15:10:00', 205, 1, 1, 3, 3, NULL),
(178, '2019-04-10 13:20:00', '2019-04-10 13:20:00', 206, 1, 1, 4, 2, NULL);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `leietaker_has_sykler`
--

CREATE TABLE `leietaker_has_sykler` (
  `leietaker_leieid` int(11) NOT NULL,
  `sykler_sykkelid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `leietaker_has_sykler`
--

INSERT INTO `leietaker_has_sykler` (`leietaker_leieid`, `sykler_sykkelid`) VALUES
(171, 2),
(178, 2),
(171, 3),
(177, 3),
(171, 4),
(172, 5),
(173, 6),
(174, 7);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `leietaker_has_utstyr`
--

CREATE TABLE `leietaker_has_utstyr` (
  `leietaker_leieid` int(11) NOT NULL,
  `utstyr_utstyrid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `leietaker_has_utstyr`
--

INSERT INTO `leietaker_has_utstyr` (`leietaker_leieid`, `utstyr_utstyrid`) VALUES
(176, 5);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `sted`
--

CREATE TABLE `sted` (
  `stedid` int(11) NOT NULL,
  `sted` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `sted`
--

INSERT INTO `sted` (`stedid`, `sted`) VALUES
(1, 'Haugastøl'),
(2, 'Finse'),
(3, 'Flåm'),
(4, 'Voss'),
(5, 'Myrdal');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `stilling`
--

CREATE TABLE `stilling` (
  `stillingid` int(11) NOT NULL,
  `stilling` varchar(45) DEFAULT NULL,
  `admin` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `stilling`
--

INSERT INTO `stilling` (`stillingid`, `stilling`, `admin`) VALUES
(1, 'Selger', 0);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `sykkelstatus`
--

CREATE TABLE `sykkelstatus` (
  `statusid` int(11) NOT NULL,
  `statusmelding` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `sykkelstatus`
--

INSERT INTO `sykkelstatus` (`statusid`, `statusmelding`) VALUES
(1, 'Ok'),
(2, 'Behøver reparasjon: dekk'),
(3, 'Behøver reparasjon: gir'),
(4, 'Behøver reparasjon: bremser'),
(5, 'Behøver reparasjon: annet'),
(6, '#placeholder'),
(7, 'Kastes');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `sykler`
--

CREATE TABLE `sykler` (
  `id` int(11) NOT NULL,
  `merke` varchar(45) DEFAULT NULL,
  `modell` varchar(45) DEFAULT NULL,
  `sykkeltype` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `tilgjengelig` varchar(45) DEFAULT NULL,
  `lagerid` int(11) NOT NULL,
  `fritekst` varchar(255) DEFAULT NULL,
  `creation_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `modification_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `sykler`
--

INSERT INTO `sykler` (`id`, `merke`, `modell`, `sykkeltype`, `status`, `tilgjengelig`, `lagerid`, `fritekst`, `creation_time`, `modification_time`) VALUES
(1, 'Diamant', 'Mogul 7', 'terreng', 2, '1', 1, 'Forhjul', '2019-03-28 13:58:11', '2019-04-09 17:19:18'),
(2, 'Diamant', 'Mogul 7', 'terreng', 1, '1', 1, NULL, '2019-03-28 13:58:11', '2019-04-10 13:17:34'),
(3, 'Diamant', 'Mogul 7', 'terreng', 1, '1', 1, NULL, '2019-03-28 13:58:11', '2019-04-10 13:14:13'),
(4, 'Diamant', 'Mogul 7', 'terreng', 4, '1', 1, '2123', '2019-03-28 13:58:11', '2019-04-09 17:23:34'),
(5, 'Trek', 'T900', 'tandem', 1, '1', 1, NULL, '2019-03-28 13:58:11', '2019-04-09 17:14:30'),
(6, 'Trek', 'T900', 'tandem', 1, '1', 1, NULL, '2019-03-28 13:58:11', '2019-04-09 17:14:32'),
(7, 'Honda', '98', 'el', 1, '1', 1, NULL, '2019-03-31 01:43:49', '2019-04-09 17:14:34');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `utstyr`
--

CREATE TABLE `utstyr` (
  `utstyrid` int(11) NOT NULL,
  `utstyrtype` varchar(45) DEFAULT NULL,
  `lagerid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `utstyr`
--

INSERT INTO `utstyr` (`utstyrid`, `utstyrtype`, `lagerid`) VALUES
(1, 'hjelm', 1),
(2, 'hjelm', 1),
(3, 'barnevogn', 2),
(4, 'barnesete', 2),
(5, 'hjelm', 2),
(6, 'barnesete', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ansatte`
--
ALTER TABLE `ansatte`
  ADD PRIMARY KEY (`ansattid`),
  ADD KEY `fk_ansatte_stilling1_idx` (`stilling_stillingid`);

--
-- Indexes for table `kunder`
--
ALTER TABLE `kunder`
  ADD PRIMARY KEY (`brukerid`);

--
-- Indexes for table `lager`
--
ALTER TABLE `lager`
  ADD PRIMARY KEY (`lagerid`),
  ADD KEY `fk_lager_sted1_idx` (`sted_stedid`);

--
-- Indexes for table `leietaker`
--
ALTER TABLE `leietaker`
  ADD PRIMARY KEY (`leieid`),
  ADD KEY `fk_leietaker_kunder1_idx` (`kunder_brukerid`),
  ADD KEY `fk_leietaker_ansatte1_idx` (`ansatte_ansattid`),
  ADD KEY `fk_leietaker_lager1_idx` (`hentested`),
  ADD KEY `FK_leveringssted` (`leveringssted`);

--
-- Indexes for table `leietaker_has_sykler`
--
ALTER TABLE `leietaker_has_sykler`
  ADD PRIMARY KEY (`leietaker_leieid`,`sykler_sykkelid`),
  ADD KEY `fk_leietaker_has_sykler_sykler1_idx` (`sykler_sykkelid`),
  ADD KEY `fk_leietaker_has_sykler_leietaker1_idx` (`leietaker_leieid`);

--
-- Indexes for table `leietaker_has_utstyr`
--
ALTER TABLE `leietaker_has_utstyr`
  ADD PRIMARY KEY (`leietaker_leieid`,`utstyr_utstyrid`),
  ADD KEY `fk_leietaker_has_utstyr_utstyr1_idx` (`utstyr_utstyrid`),
  ADD KEY `fk_leietaker_has_utstyr_leietaker1_idx` (`leietaker_leieid`);

--
-- Indexes for table `sted`
--
ALTER TABLE `sted`
  ADD PRIMARY KEY (`stedid`);

--
-- Indexes for table `stilling`
--
ALTER TABLE `stilling`
  ADD PRIMARY KEY (`stillingid`);

--
-- Indexes for table `sykkelstatus`
--
ALTER TABLE `sykkelstatus`
  ADD PRIMARY KEY (`statusid`,`statusmelding`);

--
-- Indexes for table `sykler`
--
ALTER TABLE `sykler`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sykler_lager1_idx` (`lagerid`);

--
-- Indexes for table `utstyr`
--
ALTER TABLE `utstyr`
  ADD PRIMARY KEY (`utstyrid`),
  ADD KEY `fk_utstyr_lager1_idx` (`lagerid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ansatte`
--
ALTER TABLE `ansatte`
  MODIFY `ansattid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `kunder`
--
ALTER TABLE `kunder`
  MODIFY `brukerid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=207;

--
-- AUTO_INCREMENT for table `lager`
--
ALTER TABLE `lager`
  MODIFY `lagerid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `leietaker`
--
ALTER TABLE `leietaker`
  MODIFY `leieid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=179;

--
-- AUTO_INCREMENT for table `sted`
--
ALTER TABLE `sted`
  MODIFY `stedid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stilling`
--
ALTER TABLE `stilling`
  MODIFY `stillingid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sykler`
--
ALTER TABLE `sykler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `utstyr`
--
ALTER TABLE `utstyr`
  MODIFY `utstyrid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Begrensninger for dumpede tabeller
--

--
-- Begrensninger for tabell `ansatte`
--
ALTER TABLE `ansatte`
  ADD CONSTRAINT `fk_ansatte_stilling1` FOREIGN KEY (`stilling_stillingid`) REFERENCES `stilling` (`stillingid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Begrensninger for tabell `lager`
--
ALTER TABLE `lager`
  ADD CONSTRAINT `fk_lager_sted1` FOREIGN KEY (`sted_stedid`) REFERENCES `sted` (`stedid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Begrensninger for tabell `leietaker`
--
ALTER TABLE `leietaker`
  ADD CONSTRAINT `FK_leveringssted` FOREIGN KEY (`leveringssted`) REFERENCES `sted` (`stedid`),
  ADD CONSTRAINT `fk_leietaker_ansatte1` FOREIGN KEY (`ansatte_ansattid`) REFERENCES `ansatte` (`ansattid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_leietaker_kunder1` FOREIGN KEY (`kunder_brukerid`) REFERENCES `kunder` (`brukerid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_leietaker_lager1` FOREIGN KEY (`hentested`) REFERENCES `lager` (`lagerid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Begrensninger for tabell `leietaker_has_sykler`
--
ALTER TABLE `leietaker_has_sykler`
  ADD CONSTRAINT `fk_leietaker_has_sykler_leietaker1` FOREIGN KEY (`leietaker_leieid`) REFERENCES `leietaker` (`leieid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_leietaker_has_sykler_sykler1` FOREIGN KEY (`sykler_sykkelid`) REFERENCES `sykler` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Begrensninger for tabell `leietaker_has_utstyr`
--
ALTER TABLE `leietaker_has_utstyr`
  ADD CONSTRAINT `fk_leietaker_has_utstyr_leietaker1` FOREIGN KEY (`leietaker_leieid`) REFERENCES `leietaker` (`leieid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_leietaker_has_utstyr_utstyr1` FOREIGN KEY (`utstyr_utstyrid`) REFERENCES `utstyr` (`utstyrid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Begrensninger for tabell `sykler`
--
ALTER TABLE `sykler`
  ADD CONSTRAINT `fk_sykler_lager1` FOREIGN KEY (`lagerid`) REFERENCES `lager` (`lagerid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Begrensninger for tabell `utstyr`
--
ALTER TABLE `utstyr`
  ADD CONSTRAINT `fk_utstyr_lager1` FOREIGN KEY (`lagerid`) REFERENCES `lager` (`lagerid`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
