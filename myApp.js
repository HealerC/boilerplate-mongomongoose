require('dotenv').config({path: __dirname + "/.env"});
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

/* Person schema responsible for creating the Model for the documents */
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number, 
  favoriteFoods: [{type: String}]
});

let Person = mongoose.model('Person', personSchema);

/* Create a document from the Person model defined above and save the document to the database */
const createAndSavePerson = (done) => {
  const uyi = new Person({          // A document
    name: "Uyioghosa Nosa-Ihaza",
    age: 20,
    favoriteFoods: ["Beans and Plantain", "Fried Rice and Chicken", "Jollof Rice"]
  });

  uyi.save(function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

/* Create many documents (perhaps) and add them to the database from an array of object definitions */
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return done(err);
    done(null, data);
  })
};

/* Find all the people having a certain name */
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) {
    if (err) return done(err);
    done(null, data);
  })
};

/* Find only one document that has a particular food as one of his favorite foods */
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

/* Find a person by the id using mongoose's dedicated findById method */
const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

/* Find a person using the id, edit the document of the person and save it back to the database */
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, data) { // Find the document
    if (err) done(err);
    
    data.favoriteFoods.push(foodToAdd);       // Edit the document
    
    data.save(function(err, data) {           // Save the edited document back to the database
      if (err) done(err);
      done(null, data);
    });
  });
};

/* Using built in classes in mongoose to find and edit */
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, 
    function(err, updatedPerson) {
      if (err) return done(err);
      done(null, updatedPerson);
    }
  );
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
