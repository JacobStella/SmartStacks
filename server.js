const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// email setup
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const emailPass = process.env.EMAIL_PASS;

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

app.use(cors({ origin: '*' }));

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

// for email
const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: "daimondsailer@gmail.com",
		pass: emailPass,
	},
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
      const result = await usersCollection.insertOne({
          Email: email,
          FirstName: firstName,
          LastName: lastName,
          Username: username,
          Password: password,
          Verified: verified,
      });
	var id = result.insertedId;

      res.status(201).json({ message: 'User registered successfully', userId: id });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.toString() });
  }
});

// Email Ops
// Sending Verification
app.post('/api/send-verif', async (req, res) => {
	const {userId, email } = req.body;
	const token = crypto.randomBytes(32).toString('hex');

	// Save token to userId
	const db = client.db("Group3LargeProject");
	const result = await db.collection('Users').updateOne({ "_id": new ObjectId(userId) }, { $set: {Token:token}});
	// make sure above line succeeded
	if (!result){
		res.status(400).json({message: "Token could not be saved to User"});
	}

	// the email
	const mailOptions = {
		from: "daimondsailer@gmail.com",
		to: email,
		subject: "Verify your email",
		text: `Click this link to verify your email: http://largeprojectgroup3-efcc1eed906f.herokuapp.com/verify/${token}`,
	};

	// sending the email
	transporter.sendMail(mailOptions, (error, info) => {
		if (error){
			res.status(500).json({message: "Error sending verification email"});
		} else {
			res.status(200).json({message: "Verification email sent", token:token});
		}
	});
});

// checking verification

app.get('/api/verify/:token', async (req, res) => {
  const { token } = req.params;

  if (!token) {
      res.status(400).json({ message: "Token not received" });
      return;
  }

  try {
      const db = client.db("Group3LargeProject");
      const result = await db.collection('Users').findOne({ Token: token });

      if (!result) {
          res.status(404).json({ message: "User not found with the provided token" });
          return;
      }

      // Update user's record to mark them as verified
      const verif = await db.collection('Users').updateOne({ Token: token }, { $set: { Verified: true } });

      // Send a response indicating successful verification
      res.status(200).json({ message: "Email verified, redirecting soon" });
  } catch (error) {
      console.error('Error verifying email:', error.message);
      res.status(500).json({ error: error.message });
  }
});

/*ONE ONE
app.get('/api/verify/:token', async (req, res) => {
	const {token} = req.params;
	if(!token){
		res.status(400).json({ message: "Token not recieved" });
  		return;
	}
	
	try{
		const db = client.db("Group3LargeProject");
		const result = await db.collection('Users').findOne({ Token: {$eq:token}});
		
		// if a matching token is found, verify the user
		const verif = await db.collection('Users').updateOne({Token:token}, {$set: {Verified:true}});
		
	} catch(e) {
		error = e.toString();
		res.status(500).json({error : error});
		res.send(error); // TESTING
	}
	
  	res.status(200).json({ message: "Verification Succeeded" });
});
*/

// send forgot password email
app.post('/api/sendforgot', async (req, res) => {
	const {email} = req.body;

	// find userId
	const db = client.db("Group3LargeProject");
	const result = await db.collection('Users').findOne({Email : {$eq: email}});
	const userId = result._id;
	
	// the email
	const mailOptions = {
		from: "daimondsailer@gmail.com",
		to: email,
		subject: "Forgot your password",
		text: `Click this link to reset your password: http://largeprojectgroup3-efcc1eed906f.herokuapp.com/forgor/${userId}`,
	};

	// sending the email
	transporter.sendMail(mailOptions, (error, info) => {
		if (error){
			res.status(500).json({message: "Error sending forgot password email"});
		} else {
			res.status(200).json({message: "Forgot password email sent"});
		}
	});
});

app.post('/api/forgot', async (req, res) => {
	const {userId, newPass} = req.body;
	
	try{
		const db = client.db("Group3LargeProject");
		const result = await db.collection('Users').updateOne({"_id": new ObjectId(userId)}, {$set: {Password:newPass}});
		if(!result){
			res.status(500).json({message: "Could not change pass"});
		}
	} catch(e){
		error = e.toString();
		res.status(500).json({error : error});
	}
	res.status(200).json({message: "Password Reset"});
});

// Card Ops
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
      SetId: setId, // Store the setId in each card
	Difficulty: 2 
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
		case 3:
			// update difficulty
			var newDiff = { $set: {Difficulty:newInfo}};
		case 4:
			// update Set
			var newSet = { $set: {SetId:newInfo}};
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
			case 3:
				const resultDiff = await db.collection('Cards').updateOne({ "_id": new ObjectId(cardId) }, newDiff);
				break;
			case 4:
				const resultSet = await db.collection('Cards').updateOne({ "_id": new ObjectId(cardId) }, newSet);
				break;
			default:
				res.status(500).json({ error: "Control Code not found (update func)" });
		}
		

		res.status(200).json({ message: "Card updated successfully"});
	} catch(e) {
		res.status(500).json({ error: e.toString() });
	}
});


// Class ops
// Add Class
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


// Delete Class
app.post('/api/deleteclass', async (req, res, next) => {
	const { classId } = req.body; // Get cardId from request

	// Running command
	try {
		const db = client.db("Group3LargeProject");
		
		// delete card
		const result = await db.collection('Class').deleteOne({ _id: new ObjectId(classId) });
   
		res.status(200).json({ message: "Class deleted successfully"});
	} catch(e) {
		res.status(500).json({ error: e.toString() });
	}
});

// Update Class
app.post('/api/updateclass', async (req, res) => {
	// cardId of card to be updated, UPdated INformation to be added, and code for what to change
	const { classId, newInfo, code } = req.body; 
	// const newTerm = { $set: {Term:Term}};

	// control code
	switch(code){
		case 1:
			// update Name
			var newName = { $set: {className:newInfo}};
			break;
		default:
			res.status(500).json({ error: "Control Code not found (assignment)" });
	}
	
  	var error = '';
	
	// Running command
	try {
		const db = client.db("Group3LargeProject");

		// update class control code
		switch(code){
			case 1:
				// update className
				const resultTerm = await db.collection('Class').updateOne({ "_id": new ObjectId(classId) }, newName);
				break;
			default:
				res.status(500).json({ error: "Control Code not found (update func)" });
		}
		
		res.status(200).json({ message: "Class updated successfully"});
	} catch(e) {
		res.status(500).json({ error: e.toString() });
	}
});

app.get('/api/getClassAndSets/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const db = client.db("Group3LargeProject");
    // Assuming classes are related to users by a userId field in the Class collection
    const classes = await db.collection('Class').find({ userId: userId }).toArray();

    if (!classes.length) {
      res.status(404).json({ error: "No classes found for this user" });
      return;
    }

    // For each class, find the associated sets
    const classesWithSets = await Promise.all(classes.map(async (classDoc) => {
      const sets = await db.collection('Sets').find({ classId: classDoc._id.toString() }).toArray();
      return {
        ...classDoc,
        sets: sets
      };
    }));

    res.status(200).json(classesWithSets);
  } catch (e) {
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

app.post('/api/test', async (req, res) => {
  // incoming: userId
  // outgoing: test, error
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

    const testQuestions = [];
    const allAnswers = [];

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * userCards.length);
      const card = userCards[randomIndex];
      const correctAnswer = card.Term;
      testQuestions.push(card.Definition);

      allAnswers.push(correctAnswer);
      allAnswers.push(
        ...shuffle([
          ...getIncorrectAnswers(correctAnswer, card.Definition, userCards),
        ])
      );
    }

    const userTest = {
      //id: uuidv4(),
      userId: userId,
      questions: testQuestions,
      answers: allAnswers,
    };

    // Insert the generated test into the 'Test' collection
    await db.collection('Test').insertOne(userTest);

    res.status(200).json({ test: userTest, error: '' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Helper function to get three incorrect answers for each question
function getIncorrectAnswers(correctAnswer, currentQuestion, userCards) {
  const incorrectAnswers = userCards
    .filter((card) => card.Definition !== currentQuestion)
    .map((x) => x.Term)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return incorrectAnswers.filter((term) => term !== correctAnswer);
}

// Helper function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

app.post('/api/validate-test', async (req, res) => {
    // incoming: testId, userAnswers
    // outgoing: score, error
    const { testId, userAnswers } = req.body;

    if (!testId || !userAnswers) {
      return res.status(400).json({ error: 'testId and userAnswers are required' });
    }

    try {
      const db = client.db("Group3LargeProject");
      const test = await db
        .collection('Test')
        .findOne({ id: testId });

      if (!test) {
        return res.status(400).json({ error: 'Test not found' });
      }

      let score = 0;

      test.answers.forEach((answer, index) => {
        if (answer === userAnswers[index]) {
          score++;
        }
      });

      res.status(200).json({ score: score, error: '' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });








// Set Ops
// Add Set
/*
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
*/

// Delete Set
app.post('/api/deleteset', async (req, res, next) => {
	const { setId } = req.body; // Get setId from request

	// Running command
	try {
		const db = client.db("Group3LargeProject");
		
		// delete set
		const result = await db.collection('Sets').deleteOne({ _id: new ObjectId(setId) });
   		
		if(result){
			res.status(200).json({ message: "Set deleted successfully"});
		}
		
	} catch(e) {
		res.status(500).json({ error: e.toString() });
	}
});

// Update Set
app.post('/api/updateset', async (req, res) => {
	// cardId of card to be updated, UPdated INformation to be added, and code for what to change
	const { setId, newInfo, code } = req.body; 
	// const newTerm = { $set: {Term:Term}};

	// control code
	switch(code){
		case 1:
			// update Name
			var newName = { $set: {SetName:newInfo}};
			break;
		case 2:
			// update public value
			var newPub = { $set: {public:newInfo}};
			break;
		case 3:
			// update description
			var newDesc = { $set: {Description:newInfo}};
			break;
		default:
			res.status(500).json({ error: "Control Code not found (assignment)" });
	}
	
  	var error = '';
	
	// Running command
	try {
		const db = client.db("Group3LargeProject");

		// update class control code
		switch(code){
			case 1:
				// update SetName
				const resultTerm = await db.collection('Sets').updateOne({ "_id": new ObjectId(setId) }, newName);
				break;
			case 2:
				// update set public value
				const resultVal = await db.collection('Sets').updateOne({ "_id": new ObjectId(setId) }, newPub);
				break;
			case 3:
				// update description
				const resultDesc = await db.collection('Sets').updateOne({ "_id": new ObjectId(setId) }, newDesc);
				break;
			default:
				res.status(500).json({ error: "Control Code not found (update func)" });
		}

		res.status(200).json({ message: "Set updated successfully"});
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

app.get('/api/users/name/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('FirstName LastName Username'); // Selecting specific fields

    if (user) {
      res.json({
        FirstName: user.FirstName,
        LastName: user.LastName,
        Username: user.Username // Returning the username as well
      });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/api/public-search', async (req, res) => {
  const { searchTerm = '' } = req.body; // Only extract searchTerm from query

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



//WITH DESC
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
