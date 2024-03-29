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

      res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.toString() });
  }
});

// Add card
app.post('/api/addcard', async (req, res) => {
  // incoming: userId, term, definition, setId, difficulty
  // outgoing: error, id (of new card)

  const { userId, term, definition, setId, difficulty } = req.body;
  var error = '';
  var id = null;

  try {
    const db = client.db("Group3LargeProject");

    // Validate difficulty to ensure it is 1, 2, or 3
    if (![1, 2, 3].includes(difficulty)) {
      throw new Error("Difficulty must be 1, 2, or 3");
    }

    const newCard = {
      Term: term,
      Definition: definition,
      UserId: userId,
      SetId: setId, // Store the setId in each card
      Difficulty: difficulty // Adding the "Difficulty" field to categorize the card
    };
    
    // insertOne is an async operation, using await to ensure the operation completes before proceeding
    const result = await db.collection('Cards').insertOne(newCard);
    
    // Check if the insert was acknowledged
    if (result.acknowledged) {
      id = result.insertedId; // Assign the new card's id for the response
    } else {
      throw new Error("Insert was not acknowledged");
    }
  } catch (e) {
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
   
		res.status(200).json({ message: "Card deleted successfully"});
	} catch(e) {
		res.status(500).json({ error: e.toString() });
	}
});

// Update Card
app.post('/api/updatecard', async (req, res) => {
	// cardId of card to be updated, UPdated INformation to be added, and code for what to change
	const { cardId, newInfo, code } = req.body; 
	// const newTerm = { $set: {Term:Term}};
	
	switch(code){
		case 1:
			// update Term
			var newTerm = { $set: {Term:newInfo}};
			break;
		case 2:
			// update def
			var newDef = { $set: {Definition:newInfo}};
			break;
		default:
			res.status(500).json({ error: "Control Code not found (assignment)" });
	}
	

  	var error = '';
	
	// Running command
	try {
		const db = client.db("Group3LargeProject");

		// update card
		switch(code){
			case 1:
				// update Term
				const resultTerm = await db.collection('Cards').updateOne({ "_id": new ObjectId(cardId) }, newTerm);
				break;
			case 2:
				// update Def
				const resultDef = await db.collection('Cards').updateOne({ "_id": new ObjectId(cardId) }, newDef);
				break;
			default:
				res.status(500).json({ error: "Control Code not found (update func)" });
		}
		

		res.status(200).json({ message: "Card updated successfully"});
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

app.get('/api/public-search', async (req, res) => {
  const { searchTerm = '' } = req.query; // Only extract searchTerm from query

  try {
    const db = client.db("Group3LargeProject");
    
    const searchRegex = new RegExp(searchTerm.trim(), 'i'); // Create a case-insensitive regex from searchTerm

    // Define a variable to determine if a searchTerm is provided
    const isSearchTermProvided = searchTerm.trim() !== '';

    // Fetch classes without filtering by userId, and conditionally filter by searchTerm if provided
    const classes = isSearchTermProvided ? await db.collection('Class').find({
      className: { $regex: searchRegex }
    }).toArray() : await db.collection('Class').find({}).toArray();

    // Fetch sets without filtering by userId, and conditionally filter by searchTerm if provided
    const sets = isSearchTermProvided ? await db.collection('Sets').find({
      SetName: { $regex: searchRegex }
    }).toArray() : await db.collection('Sets').find({}).toArray();

    // Fetch cards without filtering by userId, and conditionally filter by searchTerm if provided
    const cardsQuery = isSearchTermProvided ? {
      $or: [
        { Term: { $regex: searchRegex } },
        { Definition: { $regex: searchRegex } }
      ]
    } : {};

    const cards = await db.collection('Cards').find(cardsQuery).toArray();

    // Combine results into a single object to return
    const results = {
      classes,
      sets,
      cards
    };

    res.json(results);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.toString() });
  }
});







//const { v4: uuidv4 } = require('uuid'); // Import a package to generate unique IDs for each test

function generateTestId() {
  const timestamp = Date.now().toString();
  const randomPortion = Math.random().toString(36).substring(2, 15);
  return timestamp + randomPortion;
}


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getIncorrectAnswers(correctAnswer, allCards) {
  // Shuffle to randomize the order before slicing
  const shuffledCards = shuffle(allCards);
  
  return shuffledCards.filter(card => card.Definition !== correctAnswer)
                      .map(card => card.Definition)
                      .slice(0, 3); // Get only 3 incorrect answers
}

app.post('/api/test', async (req, res) => {
  const { setId } = req.body; // Use setId instead of userId

  if (!setId) {
    return res.status(400).json({ error: 'setId is required' });
  }

  try {
    const db = client.db("Group3LargeProject");
    let setCards = await db.collection('Cards').find({ SetId: setId }).toArray(); // Find by SetId

    if (setCards.length < 5) {
      return res.status(400).json({ error: 'Set has less than 5 cards' });
    }

    shuffle(setCards); // Shuffle the cards
    setCards = setCards.slice(0, 5); // Limit to first 5 cards after shuffle

    const testQuestions = [];
    const correctAnswers = [];

    setCards.forEach(card => {
      const question = card.Term;
      const correctAnswer = card.Definition;

      // Get other cards to find incorrect answers
      const otherCards = setCards.filter(c => c.Term !== question);
      const incorrectAnswers = getIncorrectAnswers(correctAnswer, otherCards);

      // Combine correct answer with incorrect ones and shuffle
      const answers = shuffle([correctAnswer, ...incorrectAnswers]);

      testQuestions.push({ question, answers });
      correctAnswers.push(correctAnswer);
    });

    const testId = generateTestId(); // A function to generate a unique testId
    const setTest = {
      testId,
      setId, // Store setId instead of userId
      questions: testQuestions,
      correctAnswers, // Store the correct answers for validation
    };

    await db.collection('Test').insertOne(setTest);

    // Return test object without the correct answers
    const returnTestData = {
      testId: setTest.testId,
      questions: setTest.questions.map(q => ({ question: q.question, answers: q.answers })),
    };

    res.status(200).json({ test: returnTestData, error: '' });
  } catch (error) {
    console.error('Error creating test', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});








app.post('/api/validate-test', async (req, res) => {
  const { testId, userAnswers } = req.body;
  console.log('Received testId:', testId); // Log the received testId

  if (!testId || !userAnswers) {
    console.log('Validation error: Missing testId or userAnswers');
    return res.status(400).json({ error: 'testId and userAnswers are required' });
  }

  try {
    const db = client.db("Group3LargeProject");
    console.log(`Looking for test with testId: ${testId}`);
    const test = await db.collection('Test').findOne({ testId: testId });

    console.log('Test query result:', test); // Log the result of the query
    if (!test) {
      console.log('Test not found in the database');
      return res.status(400).json({ error: 'Test not found' });
    }

    let score = 0;

    // Debugging: Verify the structure of the correct answers
    console.log('Correct answers from the test:', test.correctAnswers);
    test.correctAnswers.forEach((correctAnswer, index) => {
      console.log(`Checking answer ${index + 1}:`, userAnswers[index], correctAnswer);
      if (userAnswers[index] === correctAnswer) {
        score++; // Increment score for each correct answer
      }
    });

    console.log(`Final score for testId ${testId}:`, score);
    res.status(200).json({ score: score, error: '' });
  } catch (error) {
    console.error('Error validating test answers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.post('/api/addset', async (req, res) => {
  // Including "Description" in the destructured object from req.body
  const { UserId, SetName, Description, public, classId } = req.body;

  try {
      const db = client.db("Group3LargeProject");
      
      // Insert the new set document into the 'Sets' collection with the "Description" field
      const setResult = await db.collection('Sets').insertOne({
          UserId: UserId,
          SetName: SetName,
          Description: Description, // Adding the "Description" field
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
