
DROP DATABASE IF EXISTS swag;

CREATE DATABASE swag;

USE swag;

CREATE TABLE rentals (
  id int NOT NULL AUTO_INCREMENT,
  rental_name varchar(255) NOT NULL,
  rental_description varchar(255) NOT NULL,
  rating decimal(10, 2) NOT NULL,
  guestMax int NOT NULL,
  pricePerNight decimal(10, 2) NOT NULL,
  discountPricePerNight decimal(10, 2) NOT NULL,
  weeklyDiscount boolean NOT NULL,
  cleaningFee decimal(10, 2) NOT NULL,
  serviceFee decimal(10, 2) NOT NULL,
  numOfReviews int NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE booking (
  id int NOT NULL AUTO_INCREMENT,
  person_name varchar(50) NOT NULL,
  adults int NOT NULL,
  children int NOT NULL,
  infants int NOT NULL,
  startDate date NOT NULL,
  endDate date NOT NULL,
  rentalID int NOT NULL,
  totalPrice decimal(10, 2) NOT NULL,
  totalSaved decimal(10, 2) NOT NULL,
  PRIMARY KEY (ID),
  foreign key(rentalID) references rentals(id)
);

CREATE TABLE placeToStay
(
  id int AUTO_INCREMENT NOT NULL,
  placeName varchar (255) NOT NULL,
  location varchar (255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE pictures
(
  id INT AUTO_INCREMENT NOT NULL,
  images varchar (255) NOT NULL,
  caption varchar(255) NOT NULL,
  stay_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (stay_id) REFERENCES placeToStay(id)
);

CREATE TABLE ratings
(
  id int AUTO_INCREMENT NOT NULL,
  number_Of_Reviews INT NOT NULL,
  stars DECIMAL(19 , 1) NOT NULL,
  stay_id INT NOT NULL,
  superHost varchar (255) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (stay_id) REFERENCES placeToStay(id)
);

CREATE TABLE lists (
  id INT AUTO_INCREMENT,
  name VARCHAR(100),
  PRIMARY KEY(id)
);

CREATE TABLE properties (
  id INT AUTO_INCREMENT,
  name VARCHAR(300),
  superhost INT,
  type VARCHAR(100),
  beds INT,
  price INT,
  rating FLOAT,
  review_count INT,
  image VARCHAR(300),
  list INT,
  PRIMARY KEY(id),
  FOREIGN KEY (list) REFERENCES lists(id)
);