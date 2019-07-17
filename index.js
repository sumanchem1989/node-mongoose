const mongoose = require("mongoose");
const Dish = require("./models/Dish");
const Person = require("./models/Person");
const Story = require("./models/Story");
require("dotenv").config();

const DatabaseConnection = async () => {
  try {
    const mongdbConnection = await mongoose.connect(process.env.mongoUrl, {
      useNewUrlParser: true,
      autoIndex: false
    });
    if (mongdbConnection) console.log("Mongodb connected....");
  } catch (err) {
    console.log(err);
  }
};

DatabaseConnection();

const createDish = async () => {
  try {
    const dish = await Dish.create({
      name: "chicken curry",
      description: "chicken curry with two egg at only Rs. 80.00"
    });
  } catch (err) {
    console.log(err);
  }
};

// createDish();

const findDishes = async () => {
  try {
    const dishes = await Dish.find({});
    if (dishes) console.log(dishes);
  } catch (err) {
    console.log(err);
  }
};

//findDishes();

const removeAll = async () => {
  try {
    const dishes = await Dish.deleteMany({}).exec();
    console.log(dishes);
  } catch (err) {
    console.log(err);
  }
};

// removeAll();

const author1 = {
  name: "Ion Fleming",
  age: 50
};

const author2 = {
  name: "Suman K Das",
  age: 30
};

const story1 = {
  title: "Casino Royale"
};

const story2 = {
  title: "The world Entertenment"
};

const createAuthor = async person => {
  try {
    const author = await Person.create(person);
    console.log(author);
  } catch (err) {
    console.log(err.message);
  }
};

// createAuthor(author1);
// createAuthor(author2);

const createStory = async story => {
  try {
    const authors = await Person.find();
    const str = await Story.create({
      title: story.title,
      author: authors[1]._id,
      fans: [authors[0]._id, authors[1]._id]
    });
    console.log(str);
  } catch (err) {
    console.log(err);
  }
};

// createStory(story1);
// createStory(story2);

const deleteAuthor = async () => {
  try {
    return await Person.deleteMany();
  } catch (err) {
    console.log(err);
  }
};

// deleteAuthor();

const deleteStory = async () => {
  try {
    return await Story.deleteMany();
  } catch (err) {
    console.log(err);
  }
};

// deleteStory();

const findAllPersons = async () => {
  try {
    const persons = await Person.find({});
    console.log(persons);
    return persons;
  } catch (err) {
    console.log(err);
  }
};

// findAllPersons();
//implimentation of regexp
const findStory = async (string, author) => {
  try {
    const stories = await Story.find({ title: new RegExp(string, "i") })
      .populate({
        path: "fans",
        select: "name age -_id",
        match: {
          age: { $lte: 50, $gte: 30 },
          name: new RegExp(author, "i")
        }
      })
      .populate("author", "name -_id")
      .exec();
    return stories;
  } catch (err) {
    console.log(err.message);
  }
};

// findStory("asino", "Sum")
//   .then(stories => {
//     stories.forEach(story => console.log(story));
//   })
//   .catch(err => console.log(err.message));

//mongoose error validation
//'Cast to number failed for value "eighteen" at path "age"'
const findAuthorAndUpdate = async () => {
  try {
    const author = await Person.findOneAndUpdate(
      {
        age: {
          $gte: 29,
          $lte: 49
        }
      },
      {
        $set: {
          age: "eighteen"
        }
      }
    );
    console.log(author);
    if (!author) {
      throw new Error("No author found");
    }
  } catch (err) {
    console.log(err);
  }
};

//findAuthorAndUpdate();

// const obj1 = { a: 1, b: 2 };
// const obj2 = { ...obj1, c: 3, a: 5 };
// console.log(obj2);
