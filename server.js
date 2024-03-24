const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongo() {
  try {
    await client.connect();
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
  }
}
//client.connect("mongodb connected");
connectToMongo();
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

app.set('port', (process.env.PORT || 5000));
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});



app.post('/api/register', async (req, res) => {
  const { email, firstName, lastName, username, password } = req.body;
  let verified = false; // Default verification status

  try {
      const db = client.db("Group3LargeProject"); // Use your database name
      const usersCollection = db.collection('Users');

      // Check if user (by email or username) already exists to avoid duplicates
      const userExists = await usersCollection.findOne({ $or: [{ Email: email }, { Username: username }] });
      if (userExists) {
          return res.status(400).json({ error: 'User already exists' });
      }

      // Hash password
      //const salt = await bcrypt.genSalt(10);
      //const hashedPassword = await bcrypt.hash(password, salt);

      // Insert new user
      await usersCollection.insertOne({
          Email: email,
          FirstName: firstName,
          LastName: lastName,
          Username: username,
          Password: password,
          Verified: verified,
      });

      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.toString() });
  }
});

// Add card
app.post('/api/addcard', async (req, res) => {
  // incoming: userId, term, definition, setId
  // outgoing: error, id (of new card)

  const { userId, term, definition, setId } = req.body;
  var error = '';
  var id = null;

  try {
    const db = client.db("Group3LargeProject");
    const newCard = {
      Term: term,
      Definition: definition,
      UserId: userId,
      SetId: setId // Store the setId in each card
    };
    
    // insertOne is an async operation, using await to ensure the operation completes before proceeding
    const result = await db.collection('Cards').insertOne(newCard);
    
    // Check if the insert was acknowledged
    if(result.acknowledged) {
      id = result.insertedId; // Assign the new card's id for the response
    } else {
      throw new Error("Insert was not acknowledged");
    }
  } catch(e) {
    error = e.toString();
  }

  // Response object containing any errors and the id of the new card
  var ret = { error: error, id: id };
  res.status(200).json(ret);
});

// Delete Card
app.post('/api/deletecard', async (req, res, next) => {
	const { cardId } = req.body; // Get cardId from request

	// Running command
	try {
		const db = client.db("Group3LargeProject");
		
		// delete card
		const result = await db.collection('Cards').deleteOne({ _id: new ObjectId(cardId) });

		// check if card was deleted correctly
		// result returns true if card was deleted
		if(!result){
			res.status(400).json({ message: "Generic Error" });
		}
    
		res.status(200).json({ message: "Card deleted successfully"})
	} catch(e) {
		res.status(500).json({ error: e.toString() });
	}
});

// LETS GET EXPERIMENTAL
app.post('/api/addclass', async (req, res, next) => {
  const { userId, className } = req.body; // Removed setIds as it's no longer directly managed here

  try {
    const db = client.db("Group3LargeProject");

    // Insert the new class
    const result = await db.collection('Class').insertOne({
      className: className,
      userId: userId,
      // Removed the sets array since sets will now reference this class via classID in their own documents
    });

    // Respond with success and the ID of the newly created class
    res.status(200).json({ message: "Class added successfully", classId: result.insertedId });
  } catch(e) {
    res.status(500).json({ error: e.toString() });
  }
});

app.get('/api/getClassAndSets/:classId', async (req, res) => {
  const { classId } = req.params; // Get classId from the route parameters

  try {
      const db = client.db("Group3LargeProject");
      const classDoc = await db.collection('Class').findOne({ _id: new ObjectId(classId) });
      if (!classDoc) {
          res.status(404).json({ error: "Class not found" });
          return;
      }

      const sets = await db.collection('Sets').find({ classId: classId }).toArray();
      const result = {
          ...classDoc,
          sets: sets
      };

      res.status(200).json(result);
  } catch(e) {
      res.status(500).json({ error: e.toString() });
  }
});

app.get('/api/search', async (req, res) => {
  // Destructure with default empty strings to prevent undefined errors
  const { userId = '', searchTerm = '' } = req.query;

  try {
    const db = client.db("Group3LargeProject");
    
    // Ensure we have a valid userId and searchTerm before proceeding
    if (!userId || !searchTerm) {
      return res.status(400).json({ error: "userId and searchTerm are required." });
    }

    const searchRegex = new RegExp(searchTerm.trim(), 'i'); // Trim to remove whitespace

    const userIdTrimmed = userId.trim(); // Trim the userId to remove whitespace

    // Fetch classes, ensuring to filter by userIdTrimmed
    const classes = await db.collection('Class').find({
      userId: userIdTrimmed,
      className: { $regex: searchRegex }
    }).toArray();

    // Fetch sets, ensuring to filter by userIdTrimmed
    const sets = await db.collection('Sets').find({
      UserId: userIdTrimmed,
      SetName: { $regex: searchRegex }
    }).toArray();

    // Fetch cards, ensuring to filter by userIdTrimmed
    const cards = await db.collection('Cards').find({
      UserId: userIdTrimmed,
      $or: [
        { Term : { $regex: searchRegex } },
        { Definition : { $regex: searchRegex } }
      ]
    }).toArray();

    // Combine results into a single object to return
    const results = {
      classes,
      sets,
      cards
    };

    res.json(results);
  } catch(e) {
    console.error(e);
    res.status(500).json({ error: e.toString() });
  }
});

//const { v4: uuidv4 } = require('uuid'); // Import a package to generate unique IDs for each test

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Define the getIncorrectAnswers function to get three incorrect answers for each question
function getIncorrectAnswers(correctAnswer, otherCards) {
  // Select "Definition" from other cards, ensuring they are not the same as the correct answer
  const incorrectAnswers = otherCards
    .map(card => card.Definition)
    .filter(definition => definition !== correctAnswer)
    .sort(() => 0.5 - Math.random()); // Shuffle to randomize the selection

  return incorrectAnswers.slice(0, 3); // Return only 3 incorrect answers
}
 

function generateTestId() {
  const timestamp = Date.now().toString();
  const randomPortion = Math.random().toString(36).substring(2, 15);
  return timestamp + randomPortion;
}

app.post('/api/test', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const db = client.db("Group3LargeProject");
    const userCards = await db.collection('Cards').find({ UserId: userId }).toArray();

    if (userCards.length < 5) {
      return res.status(400).json({ error: 'User has less than 5 cards' });
    }

    let testQuestions = [];

    // Shuffle the cards to randomize which cards are selected for the test
    shuffle(userCards);

    // Ensure a diverse selection of questions and answers
    userCards.slice(0, 5).forEach((card, index, arr) => {
      const question = card.Term;
      const correctAnswer = card.Definition;
      
      // Filter out the current card to avoid using its definition as an incorrect answer
      const otherCards = arr.filter(c => c.Term !== question);
      let incorrectAnswers = getIncorrectAnswers(correctAnswer, otherCards);

      // Make sure we only have 3 incorrect answers and shuffle them with the correct one
      incorrectAnswers = incorrectAnswers.slice(0, 3);
      const answers = shuffle([correctAnswer, ...incorrectAnswers]);

      testQuestions.push({ question, answers });
    });

    const testId = generateTestId();
    const userTest = {
      testId: testId,
      userId: userId,
      questions: testQuestions.map(q => ({ question: q.question, answers: q.answers })), // Keeps the original format
      correctAnswers: testQuestions.map(q => q.correctAnswer), // Stores correct answers for validation
    };
    

    // Insert the generated test into the 'Test' collection
    await db.collection('Test').insertOne(userTest);

    const returnTestData = {
      testId: userTest.testId,
      questions: testQuestions,
    };

    res.status(200).json({ test: returnTestData, error: '' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.post('/api/validate-test', async (req, res) => {
  const { testId, userAnswers } = req.body;

  if (!testId || !userAnswers) {
    return res.status(400).json({ error: 'testId and userAnswers are required' });
  }

  try {
    const db = client.db("Group3LargeProject");
    // Ensure the property used to find the test matches how it's stored
    const test = await db.collection('Test').findOne({ testId: testId }); 

    if (!test) {
      return res.status(400).json({ error: 'Test not found' });
    }

    let score = 0;

    // Iterate over the correct answers and compare them to the user's answers
    test.correctAnswers.forEach((correctAnswer, index) => {
      if (userAnswers[index] === correctAnswer) {
        score++; // Increment score for each correct answer
      }
    });

    res.status(200).json({ score: score, error: '' });
  } catch (error) {
    console.error('Error validating test answers', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});










app.post('/api/addset', async (req, res) => {
  const { UserId, SetName, public, classId } = req.body;

  try {
      const db = client.db("Group3LargeProject");
      
      // Insert the new set document into the 'Sets' collection
      const setResult = await db.collection('Sets').insertOne({
          UserId: UserId,
          SetName: SetName,
          public: public,
          classId: classId, // Linking set to class via classId
      });
      
      if (setResult.acknowledged) {
          res.status(200).json({ message: "New set added successfully", setId: setResult.insertedId });
      } else {
          throw new Error("Failed to add new set");
      }
  } catch(e) {
      res.status(500).json({ error: e.toString() });
  }
});


const { ObjectId } = require('mongodb');

app.get('/api/getset/:setId', async (req, res) => {
  try {
    const db = client.db("Group3LargeProject");
    // Keep setId as a string, since SetId in Cards is stored as a string
    const setId = req.params.setId;

    // Fetch the set using its _id, converting setId to ObjectId for this query
    const set = await db.collection('Sets').findOne({ _id: new ObjectId(setId) });

    // Now query using SetId as a string to match the stored format in Cards
    const cards = await db.collection('Cards').find({ SetId: setId }).toArray();

    if (!set) {
      return res.status(404).json({ message: "Set not found" });
    }

    // Return the set details along with its associated cards
    res.status(200).json({ ...set, cards });
  } catch (e) {
    console.error(e); // Log the error for server-side visibility
    if (e instanceof TypeError) {
      res.status(400).json({ error: "Invalid setId format" });
    } else {
      res.status(500).json({ error: e.toString() });
    }
  }
});







// UPDATE CLASS
/*app.post('/api/updateclass', async (req, res, next) =>
{
  // incoming: userId, className
	// userId is stored as a string (to be changed later?)
  // outgoing: error
	
  const {classId, className } = req.body;

  const newClass = { $set: {className:className}};

  var error = '';

  try
  {
    const db = client.db("Group3LargeProject");
    const result = db.collection('Class').updateOne(classId, newClass);
  }
  catch(e)
  {
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
});*/

app.post('/api/login', async (req, res, next) => {
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

  var error = '';

  const { login, password } = req.body;

  const db = client.db("Group3LargeProject");
  // Adjusted to match directly with plaintext password for demonstration purposes
  const user = await db.collection('Users').findOne({ Username: login, Password: password });

  if (user) {
      var id = user._id; // Using MongoDB's default '_id' field, adjust if using a custom 'UserID'
      var fn = user.FirstName; // Ensure these field names match your schema
      var ln = user.LastName;

      var ret = { id: id.toString(), firstName: fn, lastName: ln, error: '' }; // Convert _id to string if necessary
      res.status(200).json(ret);
  } else {
      // No user found with the provided username and password
      res.status(400).json({ error: 'Invalid login credentials.' });
  }
});


app.post('/api/searchcards', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = '';

  const { userId, search } = req.body;

  var _search = search.trim();
  
  const db = client.db("Group3LargeProject");
  const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*'}}).toArray();

  
  var _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].Card );
  }
  
  var ret = {results:_ret, error:error};
  res.status(200).json(ret);
});

///////////////////////////////////////////////////
// For Heroku deployment
// Server static assets if in production
if (process.env.NODE_ENV === 'production')
{
// Set static folder
app.use(express.static('frontend/build'));
app.get('*', (req, res) =>
{
res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});
}


app.listen(PORT, () =>
{
console.log('Server listening on port ' + PORT);
});
