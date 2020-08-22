const db = require('./index.js');
const random = require('./InfoGeneration.js');

var adjective1 = ["Beautiful", "Homey", "Peaceful", "Wonderful", "Happening", "Unforgettable", "Lovely", "Amazing", "One-Of-A-Kind", "Fantastic", "Glorious", "Somewhat-Rundown"];

var rentalType = ["Apartment", "House", "House Boat", "Tree House", "Bio Dome", "Space Ship", "Trailer", "Mobile Home", "Villa", "Castle"];

var adjective2 = ["By The Sea", "Close To Downtown", "By The River", "By The Lake", "In The Countryside", "Close To Restaurants and Shopping"];

var descriptionHelper = [" is a great place to say", " is fun for the whole family", " is also occupied by 7 cats", " is best known for its ghost sightings", " will make you forget your worries", " is the best place to stay EVER", " will make you never want to leave"];


var generateRental = () => {
  var randomRentalName = adjective1[Math.floor(Math.random() * adjective1.length)] + ' ' + rentalType[Math.floor(Math.random() * rentalType.length)] + ' ' + adjective2[Math.floor(Math.random() * adjective2.length)];


  var randomDescription = randomRentalName + descriptionHelper[Math.floor(Math.random() * descriptionHelper.length)];

  var randomRating = (4 + Math.random()*1).toFixed(2);

  var randomGuestMax = 2 + Math.floor(Math.random()*8);

  var randomPricePerNight = 125+ Math.floor(Math.random()*400);

  var randomDiscountedPricePerNight = randomPricePerNight * .8;

  var randomHasWeeklyDiscount = Math.floor(Math.random()*2);

  var randomCleaningFee = 30 + Math.floor(Math.random()*90);

  var randomServiceFee = 35 + Math.floor(Math.random()*165);

  var randomnumOfReviews = 76 + Math.floor(Math.random()* 700);


    db.query(`insert into rentals (rental_name, rental_description, rating, guestMax, pricePerNight, discountPricePerNight, weeklyDiscount, cleaningFee, serviceFee, numOfReviews) values ("${randomRentalName}", "${randomDescription}", ${randomRating}, ${randomGuestMax}, ${randomPricePerNight}, ${randomDiscountedPricePerNight}, ${randomHasWeeklyDiscount}, ${randomCleaningFee}, ${randomServiceFee}, ${randomnumOfReviews})`, (err, results, fields) => {
      if (err) {
        console.log(err);
      } else {
        console.log(null, results);
      }
    })
}


var generateRentals = (num) => {
  for (var i=0; i < num; i++){
    generateRental();
  }
}

generateRentals(100);

//moreplacetostay


var generator = function () {
  var adjective = ['Cozy', 'Cute', 'Rustic', 'Comfy', 'Beautiful', '']
  var noun = ['Cabin', 'Cabin', 'Lodge', 'Lodge', 'Studio', 'Apartment', 'Chalet']
  var description =['with fireplace', 'in South Lake Tahoe', 'near lake', 'for getaway', 'with hottub', 'minutes to ski resorts', 'near stateline']
  var types = ['Entire place', 'Private room', 'Shared room'];
  var images = ['https://moreplaces.s3-us-west-1.amazonaws.com/img1.jpg', 'https://moreplaces.s3-us-west-1.amazonaws.com/img2.jpg', 'https://moreplaces.s3-us-west-1.amazonaws.com/img3.jpg', 'https://moreplaces.s3-us-west-1.amazonaws.com/img4.jpg', 'https://moreplaces.s3-us-west-1.amazonaws.com/img5.jpg', 'https://moreplaces.s3-us-west-1.amazonaws.com/img6.jpg', 'https://moreplaces.s3-us-west-1.amazonaws.com/img7.jpg', 'https://moreplaces.s3-us-west-1.amazonaws.com/img8.jpg', 'https://moreplaces.s3-us-west-1.amazonaws.com/img9.jpg', 'https://moreplaces.s3-us-west-1.amazonaws.com/img10.jpg'];

  var properties = [];
  for (var i = 1; i < 101; i++) {
    var property = {};
    property.adjective = adjective[Math.floor(Math.random() * adjective.length)];
    property.noun = noun[Math.floor(Math.random() * noun.length)];
    property.description = description[Math.floor(Math.random() * description.length)];
    property.name = `${property.adjective} ${property.noun} ${property.description}`;
    property.superhost = Math.floor(Math.random() * 2);
    property.type = types[Math.floor(Math.random() * 3)];
    property.beds = 1+ Math.floor(Math.random() * 3);
    property.price = 300 + Math.floor(Math.random() * 200);
    property.rating = 4 + 0.1 * Math.floor(Math.random() * 10);
    property.review_count = 5 + Math.floor(Math.random() * 10);
    property.image = images[Math.floor(Math.random() * 10)];
    property.list = 1 + Math.floor(Math.random() * 2);
    properties.push(property);
  }
  return properties;
};

var seeder = function () {
  var properties = generator();
  //deletes all existing entries in both table, resets id fields to 1
  db.query('DELETE FROM properties;');
  db.query('ALTER TABLE properties AUTO_INCREMENT = 1;');
  db.query('DELETE FROM lists;');
  db.query('ALTER TABLE lists AUTO_INCREMENT = 1;');

  //populates lists table
  db.query(`INSERT INTO lists (name) VALUES ('Stateline')`);
  db.query(`INSERT INTO lists (name) VALUES ('Kirkwood')`);
  db.query(`INSERT INTO lists (name) VALUES ('Olympic Valley')`);

  //populates properties table
  for (var i = 0; i < properties.length; i++) {
    var current = properties[i]
    db.query(`INSERT INTO properties (name, superhost, type, beds, price, rating, review_count, image, list) VALUES ('${current.name}', ${current.superhost}, '${current.type}', ${current.beds}, ${current.price}, ${current.rating}, ${current.review_count}, '${current.image}', ${current.list});`);
  }
}

seeder();

//gallery



const insertInfo = () => {
  for (let i = 1; i < 101; i++) {
    const placeName = random.randomListingName();
    const location = random.randomLocation();
    db.query(`insert into placeToStay (placeName, location) values ("${placeName}", "${location}")`, (err) => {
      if (err) {
        console.log('error insert data into db');
      }
    });
  }
};

const insertRating = () => {
  for (let i = 1; i < 101; i++) {
    const reviews = random.randomNum(10, 388);
    const stars = random.randomDeciNum(3, 5);
    const host = random.superHost();
    db.query(`insert into ratings (number_Of_Reviews, stars, stay_id, superHost) values ("${reviews}", "${stars}","${i}", "${host}")`, (err) => {
      if (err) {
        console.log('error insert data into db', err);
      }
    });
  }
};

const insertPictures = () => {
  for (let i = 1; i < 101; i++) {
    const randomNumberOfPictures = random.randomNum(10, 35);
    for (let j = 0; j < randomNumberOfPictures; j++) {
      const picture = random.randomPictures();
      const caption = random.randomCaptions();
      db.query(`insert into pictures (images, caption, stay_id) values ("${picture}", "${caption}", "${i}")`, (err) => {
        if (err) {
          console.log('error insert data into db', err);
        }
      });
    }
  }
};

insertInfo();
insertRating();
insertPictures();
