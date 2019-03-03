DROP TABLE IF EXISTS Houses;

CREATE TABLE Houses (
  `id` INT auto_increment NOT NULL,
  `link` VARCHAR(50) NOT NULL,
  `market_date` DATE DEFAULT "2000-01-01",
  `location_country` VARCHAR(50) NOT NULL,
  `location_city` VARCHAR(50) NOT NULL,
  `location_address` VARCHAR(50) NOT NULL,
  `size_living_area` VARCHAR(10) NOT NULL,
  `size_rooms` INT UNSIGNED NOT NULL,
  `price_value` FLOAT UNSIGNED NOT NULL,
  `price_currency` CHAR(3) NOT NULL,
  `location_coordinates_lat` FLOAT UNSIGNED,
  `location_coordinates_lng` FLOAT UNSIGNED ,
  `description` TEXT,
  `title` TEXT, 
  `images`  TEXT,
  `sold` ENUM('1','0'),

  PRIMARY KEY (`id`),
  UNIQUE(`link`)
 
  );

  INSERT INTO Houses (
    link,
    market_date,
    location_country,
    location_city,
    location_address,
    size_living_area,
    size_rooms,
    price_value,
    price_currency,
    location_coordinates_lat,
    location_coordinates_lng,
    description,
    title,
    images,
    sold
  ) 
  VALUES (
    'URL here',
    NOW(),
    'Country-Location',
    'City-Location',
    'Adress',
    '20m',
    '3',
    2000,
    '$',
    123,
    342,
    'Description',
    'Title',
    'images',
    1
  )