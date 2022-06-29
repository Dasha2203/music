-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 21, 2022 at 04:39 AM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `music_app`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAlbums` ()  NO SQL
BEGIN
SELECT albom.*, artist.name AS artistName FROM albom JOIN artist_albom ON artist_albom.albom_id = albom.id JOIN artist ON artist.id = artist_albom.artist_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getCountArtist` ()  NO SQL
BEGIN
	SELECT COUNT(*) FROM artist;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getCountGenres` ()  NO SQL
BEGIN
	SELECT COUNT(*) FROM genres;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getCountTrackByArtist` (IN `idArtist` INT)  NO SQL
    DETERMINISTIC
BEGIN
	SELECT COUNT(*) from track_artist WHERE artist_id = idArtist;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getCountTracks` ()  NO SQL
BEGIN
	SELECT COUNT(*) FROM track;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getTracksArtist` (IN `id` INT)  NO SQL
BEGIN
	SELECT  track.name, track_artist.artist_id FROM track INNER JOIN track_artist ON track_artist.artist_id = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getTracksByArtist` (IN `artistID` INT)  NO SQL
BEGIN
	SELECT track.*, artist.name AS artistName, track_artist.artist_id FROM track_artist INNER JOIN track ON track.id = track_artist.track_id INNER JOIN artist ON artist.id = track_artist.artist_id WHERE artis.id = artistID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getTracksByName` (IN `nameTrack` VARCHAR(50))  NO SQL
BEGIN
	SELECT track.*, artist.name AS artistName, track_artist.artist_id FROM track_artist INNER JOIN track ON track.id = track_artist.track_id INNER JOIN artist ON artist.id = track_artist.artist_id WHERE track.name LIKE CONCAT('%',nameTrack,'%') ;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `albom`
--

CREATE TABLE `albom` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `year` varchar(4) NOT NULL,
  `srcImg` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `albom`
--

INSERT INTO `albom` (`id`, `name`, `year`, `srcImg`) VALUES
(9, 'Mercury', '2021', 'public/images/1653050460033.jpeg'),
(10, 'Evolve', '2017', 'public/images/1653050778108.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `artist`
--

CREATE TABLE `artist` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `srcImg` varchar(150) NOT NULL,
  `description` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `artist`
--

INSERT INTO `artist` (`id`, `name`, `srcImg`, `description`) VALUES
(5, 'Imagine Dragons', 'public/images/1653039739199.jpeg', 'Imagine Dragons have sold more than 75 million records worldwide, making them one of the world\'s best-selling music artists. They were the most streamed group of 2018 on Spotify and are the first rock act to have four songs, \"Radioactive\", \"Demons\", \"Believer\", and \"Thunder\", to surpass one billion streams each.'),
(6, 'Полина Гагарина', 'public/images/1653039801537.jpeg', 'Поли́на Серге́евна Гага́рина — российская певица, актриса кино, телевидения, озвучивания и дубляжа, композитор и фотомодель. Участница и победительница проекта Первого канала «Фабрика звёзд-2». Представительница России на музыкальном конкурсе «Евровидение-2015», занявшая второе место'),
(7, 'Miyagi & Andy Panda', 'public/images/1653075746958.jpeg', 'MiyaGi & Andy Panda — российский хип-хоп-дуэт из города Владикавказа, Северная Осетия, образованный в 2015 году. Коллектив состоит из двух человек, известных под сценическими псевдонимами: «MiyaGi» - Азамат Кудзаев и «Andy Panda» - Сослан Бурнацев. '),
(8, 'The Hatters', 'public/images/1653076316820.jpeg', 'The Hatters — российская джипси-фолк-рок группа, основанная в 2016 году в Санкт-Петербурге. В основной состав группы входят Юрий Музыченко, Павел Личадеев, Александр «Кикир» Анисимов, Дмитрий Вечеринин, Анна Музыченко. '),
(9, 'Иванушки International', 'public/images/1653099934715.jpeg', '«Иванушки International» — российская музыкальная группа, основанная в 1995 году композитором и продюсером Игорем Матвиенко.'),
(11, 'Руки вверх!', 'public/images/1653102046354.jpeg', '«Руки Вверх!» — российская музыкальная поп-группа. До августа 2006 года состояла из Сергея Жукова и Алексея Потехина');

-- --------------------------------------------------------

--
-- Table structure for table `artist_albom`
--

CREATE TABLE `artist_albom` (
  `artist_id` int(11) NOT NULL,
  `albom_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `artist_albom`
--

INSERT INTO `artist_albom` (`artist_id`, `albom_id`) VALUES
(5, 9),
(5, 10);

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `user_id` int(11) NOT NULL,
  `track_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `srcImage` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`id`, `name`, `srcImage`) VALUES
(10, 'Rock', 'public/images/1653039538783.jpeg'),
(11, 'POP', 'public/images/1653039658619.png'),
(12, 'HIP-HOP', 'public/images/1653075698803.png');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `track_id` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `user_id`, `track_id`, `date`) VALUES
(1, 9, 12, '2022-05-20'),
(2, 9, 13, '2022-05-20'),
(3, 9, 12, '2022-05-20'),
(4, 9, 13, '2022-05-20'),
(5, 9, 15, '2022-05-20'),
(6, 9, 14, '2022-05-20'),
(7, 9, 14, '2022-05-20'),
(8, 9, 15, '2022-05-20'),
(9, 9, 12, '2022-05-20'),
(10, 9, 12, '2022-05-20'),
(11, 9, 15, '2022-05-20'),
(12, 9, 16, '2022-05-20'),
(13, 9, 12, '2022-05-21'),
(14, 9, 12, '2022-05-21'),
(15, 9, 12, '2022-05-21'),
(17, 9, 17, '2022-05-21'),
(18, 9, 22, '2022-05-21');

-- --------------------------------------------------------

--
-- Table structure for table `language`
--

CREATE TABLE `language` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `language`
--

INSERT INTO `language` (`id`, `name`) VALUES
(1, 'English'),
(2, 'Русский');

-- --------------------------------------------------------

--
-- Table structure for table `playlist`
--

CREATE TABLE `playlist` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `srcImg` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `playlist`
--

INSERT INTO `playlist` (`id`, `name`, `srcImg`) VALUES
(5, 'Hits of the 90', 'public/images/1653098363401.jpeg'),
(6, 'Spring novelties', 'public/images/1653098762290.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `textTrack`
--

CREATE TABLE `textTrack` (
  `id` int(11) NOT NULL,
  `text` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `textTrack`
--

INSERT INTO `textTrack` (`id`, `text`) VALUES
(1, 'text for little big'),
(2, 'Dasha'),
(3, 'fff'),
(4, 'description'),
(5, '12312312312'),
(6, 'g,,g,g'),
(7, 'finate text'),
(8, '5555'),
(9, 'text without you'),
(10, 'strach text'),
(11, 'artur text'),
(12, 'rrrtext'),
(13, 'uiii'),
(14, 'text'),
(15, 'Can I wish on a star for another life?\n\'Cause it feels like I\'m all on my own tonight\nAnd I find myself in pieces\nThere are pills on the table and a thought in my head\nAnd I walk through the halls where I used to be led\nMy heart is filled with reasons\nI\'m tryin\' to be somebody else\nI\'m findin\' it hard to love myself\nI\'ve wanted to be somebody new\nBut that is impossible to do\nI\'m runnin\' out of my mind\nIs this really my life?\nI\'m runnin\' out of time\nIs this really my life? My life\nI could run from it all but I\'d only get lost\nOh, I\'ve walked on the bridge that I shouldn\'t have crossed\nAnd I find myself, a user\nOh, I wake every day with addictions to feed\nThey all call me a friend but I\'ll never be freed\nFrom the face of a faithless future\nI\'m tryin\' to be somebody else\nI\'m findin\' it hard to love myself\nI\'ve wanted to be somebody new\nBut that is impossible to do\nI\'m runnin\' out of my mind\nIs this really my life?\nI\'m runnin\' out of time\nIs this really my life? My life\nThese years pass by'),
(16, 'You know I got your number, number all night\nI\'m always on your team, I got your back alright\nTaking those, taking those losses if it treats you right\nI want to put you into the spotlight\nIf the world would only know what you\'ve been holding back\nHeart attacks every night\nOh, you know it\'s not right\nI will follow you way down wherever you may go\nI\'ll follow you way down to your deepest low\nI\'ll always be around wherever life takes you\nYou know I\'ll follow you\nCall you up, you\'ve been cryin\', cryin\' all night\nYou\'re only disappointed in yourself, alright\nTaking those, taking those losses if it treats you right\nI wanna take you into the sunlight\nIf the world would only know what you\'ve been holding back\nHeart attacks every night\nOh, you know it\'s not right\nI will follow you way down wherever you may go\nI\'ll follow you way down to your deepest low\nI\'ll always be around wherever life takes you\nYou know I\'ll follow you\nBa-da-da-da-da\nDa-da-da-da-da\nBa-da-da-da-da\nYou know I\'ll follow you\nLa'),
(17, 'Песен ещё не написанных сколько?\nСкажи кукушка, пропой\nВ городе мне жить или на выселках?\nКамнем лежать или гореть звездой, звездой?\nСолнце моё, взгляни на меня\nМоя ладонь превратилась в кулак\nИ если есть порох, дай огня!\nВот так!\nКто пойдёт по следу одинокому?\nСильные да смелые головы сложили в поле, в бою\nМало кто остался в светлой памяти\nВ трезвом уме да с твёрдой рукой в строю, в строю\nСолнце моё, взгляни на меня\nМоя ладонь превратилась в кулак\nИ если есть порох, дай огня!\nВот так!\nГде же ты теперь, воля вольная?\nС кем же ты сейчас ласковый рассвет встречаешь?\nОтветь!\nХорошо с тобой, да плохо без тебя\nГолову да плечи, терпеливые под плеть, под плеть\nТы, солнце моё, взгляни на меня\nМоя ладонь превратилась в кулак\nИ если есть порох, дай огня!\nВот так!\nСолнце моё, взгляни на меня\nМоя ладонь превратилась в кулак\nИ если есть порох, дай огня!\nВот так!'),
(18, 'Для тебя найду добро и верну ему пульс\nВновь куда-то так увлекусь\nВремя остановится пусть\nСейчас\nИ пока я тут, считай эти звёзды — путь\nНе понадобится ничуть\nДруг об друга лечили грусть\nВсегда\nС тобой же в один лад\nЧуть тоньше намекай\nДо дрожи похожи\nЖевали мармелад\nПродолжи понимать\nОтложим всё опять\nДо дрожи по коже\nВникали в звездопад\nСердце забрала, на небо лупили в звёзды\nУплетая мармелад, с тобою дышу свободой\nБез тебя я в кандалах, надумали вечно жить мы\nПродолжаясь на битах (мы, продолжаясь на битах)\nСердце забрала, на небо лупили в звёзды\nУплетая мармелад, с тобой дышу свободой\nБез тебя я в кандалах, надумали вечно жить мы\nПродолжаясь на битах (мы, продолжаясь на битах, и, и, и)\nСнова в трип, валит бит\nНаши чувства — Boeing, пристегнём ремни\nЧто мне нужно от тебя? Детка, знай\nЭто сладкий vibe, но о нём позже, зай\nПолуголый тон, звездопад, смотри\nКрасивый вид, ведь рядом ты\nРасплываются тени\nВолнуюсь, будто на сцене\nСамый сладкий vibe я не разбазарю\nНе продам, уж тем более не п'),
(19, 'Всё, что вы сказали, — мне не обидно\nПростите, но со стороны себя не видно\nВсё, что вы сказали, — по барабану\nЯ так живу — мне всё по фану\nСам себе fan\nСам себе sunshine\nСам себе friend\nСам себе kaifman\nСам себе fan\nСам себе sunshine\nСам себе friend\nСам себе kaifman\nKaifman, kaifman\nKaifman, kaifman\nKaifman, kaifman\nKaifman, кайфмэн\nKaifman, кайфмэн\nKaifman, кайфмэн\nKaifman\nI am a kaifman\nКто-то ищет выгоду — мне незавидно\nПростите, но тут снизу вас не видно\nВы где-то там, на Олимпе\nСпускайтесь вниз, давайте вместе\nСам себе fan\nСам себе sunshine\nСам себе friend\nСам себе kaifman\nСам себе fan\nСам себе sunshine\nСам себе friend\nСам себе kaifman\nKaifman, kaifman\nKaifman, kaifman\nKaifman, kaifman\nKaifman, кайфмэн\nKaifman, кайфмэн\nKaifman, кайфмэн\nKaifman\nI am a kaifman\nKaifman\n(Турбо gipsy, алкохардкор) Kaifman\n(Street gipsy, алкохардкор) Kaifman\n(Турбо gipsy, алкохардкор) Kaifman\nKaifman\nKaifman\nKaifman\nI am a kaifman\nВсё, что вы сказали, — мне не обидно\nПростите, но со стороны себя не видн'),
(20, 'Крошка моя, я по тебе скучаю я от тебя письма не получаю.\nТы далеко и даже не скучала, но я вернусь, вернусь, чтоб ты узнала,\nЧто я далеко, я по тебе скучаю я от тебя письма не получаю ты далеко и даже не скучаешь,\nНо я вернусь, вернусь, и ты узнаешь, что я далеко от тебя.\nТы обещала написать, обещала рассказать как живешь, как тебе там сложно.\nТы обещала долго ждать и страдать и сгорать от любви, но это невозможно.\nНет, нет ни строчки от тебя, ни словечка от тебя зря поверил я твоим признаниям.\nДа, может это было зря, может это было зря ты скажи, что ж за наказание.\nКрошка моя, я по тебе скучаю я от тебя письма не получаю.\nТы далеко и даже не скучала, но я вернусь, вернусь, чтоб ты узнала,\nЧто я далеко, я по тебе скучаю я от тебя письма не получаю ты далеко и даже не скучаешь,\nНо я вернусь, вернусь, и ты узнаешь, что я далеко от тебя.\nЧто, что еще произошло сколько времени прошло ты не едешь, не звонишь, не пишешь.\nДа, может быть твое письмо затерялось, не дошло, напиши еще разок, ты '),
(21, 'Крошка моя, я по тебе скучаю я от тебя письма не получаю.\nТы далеко и даже не скучала, но я вернусь, вернусь, чтоб ты узнала,\nЧто я далеко, я по тебе скучаю я от тебя письма не получаю ты далеко и даже не скучаешь,\nНо я вернусь, вернусь, и ты узнаешь, что я далеко от тебя.\nТы обещала написать, обещала рассказать как живешь, как тебе там сложно.\nТы обещала долго ждать и страдать и сгорать от любви, но это невозможно.\nНет, нет ни строчки от тебя, ни словечка от тебя зря поверил я твоим признаниям.\nДа, может это было зря, может это было зря ты скажи, что ж за наказание.\nКрошка моя, я по тебе скучаю я от тебя письма не получаю.\nТы далеко и даже не скучала, но я вернусь, вернусь, чтоб ты узнала,\nЧто я далеко, я по тебе скучаю я от тебя письма не получаю ты далеко и даже не скучаешь,\nНо я вернусь, вернусь, и ты узнаешь, что я далеко от тебя.\nЧто, что еще произошло сколько времени прошло ты не едешь, не звонишь, не пишешь.\nДа, может быть твое письмо затерялось, не дошло, напиши еще разок, ты '),
(22, 'Крошка моя, я по тебе скучаю я от тебя письма не получаю.\nТы далеко и даже не скучала, но я вернусь, вернусь, чтоб ты узнала,\nЧто я далеко, я по тебе скучаю я от тебя письма не получаю ты далеко и даже не скучаешь,\nНо я вернусь, вернусь, и ты узнаешь, что я далеко от тебя.\nТы обещала написать, обещала рассказать как живешь, как тебе там сложно.\nТы обещала долго ждать и страдать и сгорать от любви, но это невозможно.\nНет, нет ни строчки от тебя, ни словечка от тебя зря поверил я твоим признаниям.\nДа, может это было зря, может это было зря ты скажи, что ж за наказание.\nКрошка моя, я по тебе скучаю я от тебя письма не получаю.\nТы далеко и даже не скучала, но я вернусь, вернусь, чтоб ты узнала,\nЧто я далеко, я по тебе скучаю я от тебя письма не получаю ты далеко и даже не скучаешь,\nНо я вернусь, вернусь, и ты узнаешь, что я далеко от тебя.\nЧто, что еще произошло сколько времени прошло ты не едешь, не звонишь, не пишешь.\nДа, может быть твое письмо затерялось, не дошло, напиши еще разок, ты '),
(23, 'Sometimes, I can get a little\nI can get a little lonely\nSometimes, I can get a little\nI can get a little lonely\nSome nights, I get a little lonely\nIt\'s even when there\'s people all around me\nSometimes, I get a little anxious\n\'Cause these pills don\'t work the way the doctor played it\nI\'m startin\' to spin, needles and pins\nRight on the brim, hand on a limb, takin\' it in\nSleep it away, life in a day, and a day in a life\nMixing it up, checkin\' it twice\nTrying to breathe, starting to seize\nLights, camera, action and scene\nStory of my life\nOh, love (sometimes, I can get a little)\nHave mercy (I can get a little lonely)\nOn me (sometimes, I can get a little)\nAnd keep me company (I can get a little lonely)\nI said, \"Oh, love\" (sometimes, I can get a little)\n\"Have mercy\" (I can get a little lonely)\n\"On me\" (sometimes, I can get a little)\n\"And keep me company\" (I can get a little lonely)\nI said-'),
(24, 'Крошка моя, я по тебе скучаю я от тебя письма не получаю.\nТы далеко и даже не скучала, но я вернусь, вернусь, чтоб ты узнала,\nЧто я далеко, я по тебе скучаю я от тебя письма не получаю ты далеко и даже не скучаешь,\nНо я вернусь, вернусь, и ты узнаешь, что я далеко от тебя.\nТы обещала написать, обещала рассказать как живешь, как тебе там сложно.\nТы обещала долго ждать и страдать и сгорать от любви, но это невозможно.\nНет, нет ни строчки от тебя, ни словечка от тебя зря поверил я твоим признаниям.\nДа, может это было зря, может это было зря ты скажи, что ж за наказание.');

-- --------------------------------------------------------

--
-- Table structure for table `track`
--

CREATE TABLE `track` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `srcImg` varchar(150) DEFAULT NULL,
  `path` varchar(150) NOT NULL,
  `lang_id` int(11) NOT NULL,
  `textTrack_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `track`
--

INSERT INTO `track` (`id`, `name`, `srcImg`, `path`, `lang_id`, `textTrack_id`) VALUES
(12, 'My Life', 'public/images/1653051850021.jpeg', 'public/musics/1653051849967.mpeg', 1, 15),
(13, 'Follow you', 'public/images/1653068247722.jpeg', 'public/musics/1653068247684.mpeg', 1, 16),
(14, 'Кукушка', 'public/images/1653072317329.jpeg', 'public/musics/1653072317274.mpeg', 1, 17),
(15, 'Мармелад', 'public/images/1653075963322.jpeg', 'public/musics/1653075963280.mpeg', 1, 18),
(16, 'Кайфмэн', 'public/images/1653076453691.jpeg', 'public/musics/1653076453655.mpeg', 1, 19),
(17, 'Тополиный пух', 'public/images/1653100049205.jpeg', 'public/musics/1653100049150.mpeg', 1, NULL),
(20, 'Крошка моя', 'public/images/1653101714739.jpeg', 'public/musics/1653101714705.mpeg', 1, 22),
(21, 'Lonely', 'public/images/1653101961720.jpeg', 'public/musics/1653101961696.mpeg', 1, 23),
(22, 'Крошка моя', 'public/images/1653102146802.jpeg', 'public/musics/1653102146787.mpeg', 1, 24);

-- --------------------------------------------------------

--
-- Table structure for table `track_albom`
--

CREATE TABLE `track_albom` (
  `track_id` int(11) NOT NULL,
  `albom_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `track_albom`
--

INSERT INTO `track_albom` (`track_id`, `albom_id`) VALUES
(12, 9),
(13, 9);

-- --------------------------------------------------------

--
-- Table structure for table `track_artist`
--

CREATE TABLE `track_artist` (
  `track_id` int(11) NOT NULL,
  `artist_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `track_artist`
--

INSERT INTO `track_artist` (`track_id`, `artist_id`) VALUES
(12, 5),
(13, 5),
(14, 6),
(15, 7),
(16, 8),
(17, 9),
(21, 5),
(22, 11);

-- --------------------------------------------------------

--
-- Table structure for table `track_genre`
--

CREATE TABLE `track_genre` (
  `track_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `track_genre`
--

INSERT INTO `track_genre` (`track_id`, `genre_id`) VALUES
(12, 10),
(13, 10),
(16, 10),
(21, 10),
(14, 11),
(17, 11),
(22, 11),
(15, 12);

-- --------------------------------------------------------

--
-- Table structure for table `track_playlist`
--

CREATE TABLE `track_playlist` (
  `track_id` int(11) NOT NULL,
  `playlist_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `track_playlist`
--

INSERT INTO `track_playlist` (`track_id`, `playlist_id`) VALUES
(17, 5),
(22, 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `srcImg` varchar(150) DEFAULT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `dateRegister` date NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `srcImg`, `name`, `email`, `password`, `dateRegister`, `role_id`) VALUES
(1, NULL, 'admin', 'admin@admin.ru', 'admin', '2022-05-12', 1),
(2, NULL, 'dasha', 'dashkakorbut@gmail.com', '$2a$06$BRbmeazQoFW.lZDnPhho4O.es5Jj.yXr.6muE/7xDlo6xC0UyNW8O', '2022-05-12', 2),
(3, NULL, 'Даша', 'admin1@adminroot.ru', '$2a$06$PjSuxPHlGLGeDIFcTnJsZekp6ZpO4AAcov6oesN0gNVp1dEjwkM.a', '2022-05-12', 2),
(5, NULL, 'dsfd', 'hhh@mail.ru', '$2a$06$IUJVpIxOzkteZGIoyXSbfu46aBFkg4.aV/2ko1YIPcsFQUA5eWe1S', '2022-05-13', 2),
(6, NULL, 'TookCafe', 'took@mail.ru', '$2a$06$QWeGSiyOttdbRhKRDLfVE.NbsA0.N0HVL46HQ.oWaB7AtIApTXSTy', '2022-05-14', 2),
(7, NULL, 'Artur', 'artur@gmail.com', '$2a$06$xNO5vKqSiuJrpaFrB/GqvutiWpAidky5rJcTpIo2zcR22J2Z7gQFG', '2022-05-14', 2),
(8, NULL, 'Artur', 'artur@mai.ru', '$2a$06$P3CEpyKQMkFITLRh9ShbHeHwYBZ1UbW/PfUEP78dbFAWD8HBFkPi.', '2022-05-14', 2),
(9, NULL, 'Darya Korbut', 'admin@bg.ru', '$2a$06$h7VGzOF/1LMRzK3GtsPEme.HagU5YdHLB8xQt5cxPm8PFoYO/F2Gm', '2022-05-20', 1),
(11, NULL, 'test1', 'test1@mail.ru', '$2a$06$FqUFiGk/fyO3oI3EYgQf1uWUXp6GotfgmnXdfet.i2v1n/6lPwP4.', '2022-05-20', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `albom`
--
ALTER TABLE `albom`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `artist`
--
ALTER TABLE `artist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `artist_albom`
--
ALTER TABLE `artist_albom`
  ADD PRIMARY KEY (`artist_id`,`albom_id`),
  ADD KEY `artist_id` (`artist_id`),
  ADD KEY `albom_id` (`albom_id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`user_id`,`track_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `track_id` (`track_id`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `track_id` (`track_id`);

--
-- Indexes for table `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `textTrack`
--
ALTER TABLE `textTrack`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `track`
--
ALTER TABLE `track`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lang_id` (`lang_id`),
  ADD KEY `textTrack_id` (`textTrack_id`);

--
-- Indexes for table `track_albom`
--
ALTER TABLE `track_albom`
  ADD PRIMARY KEY (`track_id`,`albom_id`),
  ADD KEY `track_id` (`track_id`),
  ADD KEY `albom_id` (`albom_id`);

--
-- Indexes for table `track_artist`
--
ALTER TABLE `track_artist`
  ADD PRIMARY KEY (`track_id`,`artist_id`),
  ADD KEY `track_id` (`track_id`),
  ADD KEY `artist_id` (`artist_id`);

--
-- Indexes for table `track_genre`
--
ALTER TABLE `track_genre`
  ADD PRIMARY KEY (`track_id`,`genre_id`),
  ADD KEY `track_id` (`track_id`,`genre_id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Indexes for table `track_playlist`
--
ALTER TABLE `track_playlist`
  ADD PRIMARY KEY (`track_id`,`playlist_id`),
  ADD KEY `playlist_id` (`playlist_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `albom`
--
ALTER TABLE `albom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `artist`
--
ALTER TABLE `artist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `language`
--
ALTER TABLE `language`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `playlist`
--
ALTER TABLE `playlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `textTrack`
--
ALTER TABLE `textTrack`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `track`
--
ALTER TABLE `track`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `artist_albom`
--
ALTER TABLE `artist_albom`
  ADD CONSTRAINT `artist_albom_ibfk_1` FOREIGN KEY (`albom_id`) REFERENCES `albom` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `artist_albom_ibfk_2` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`track_id`) REFERENCES `track` (`id`);

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`track_id`) REFERENCES `track` (`id`),
  ADD CONSTRAINT `history_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `track`
--
ALTER TABLE `track`
  ADD CONSTRAINT `track_ibfk_1` FOREIGN KEY (`lang_id`) REFERENCES `language` (`id`),
  ADD CONSTRAINT `track_ibfk_2` FOREIGN KEY (`textTrack_id`) REFERENCES `textTrack` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `track_albom`
--
ALTER TABLE `track_albom`
  ADD CONSTRAINT `track_albom_ibfk_1` FOREIGN KEY (`albom_id`) REFERENCES `albom` (`id`),
  ADD CONSTRAINT `track_albom_ibfk_2` FOREIGN KEY (`track_id`) REFERENCES `track` (`id`);

--
-- Constraints for table `track_artist`
--
ALTER TABLE `track_artist`
  ADD CONSTRAINT `track_artist_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `track_artist_ibfk_2` FOREIGN KEY (`track_id`) REFERENCES `track` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `track_genre`
--
ALTER TABLE `track_genre`
  ADD CONSTRAINT `track_genre_ibfk_1` FOREIGN KEY (`track_id`) REFERENCES `track` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `track_genre_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `track_playlist`
--
ALTER TABLE `track_playlist`
  ADD CONSTRAINT `track_playlist_ibfk_1` FOREIGN KEY (`track_id`) REFERENCES `track` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `track_playlist_ibfk_2` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);
