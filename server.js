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

var cardList = [
  'Roy Campanella',
  'Paul Molitor',
  'Tony Gwynn',
  'Dennis Eckersley',
  'Reggie Jackson',
  'Gaylord Perry',
  'Buck Leonard',
  'Rollie Fingers',
  'Charlie Gehringer',
  'Wade Boggs',
  'Carl Hubbell',
  'Dave Winfield',
  'Jackie Robinson',
  'Ken Griffey, Jr.',
  'Al Simmons',
  'Chuck Klein',
  'Mel Ott',
  'Mark McGwire',
  'Nolan Ryan',
  'Ralph Kiner',
  'Yogi Berra',
  'Goose Goslin',
  'Greg Maddux',
  'Frankie Frisch',
  'Ernie Banks',
  'Ozzie Smith',
  'Hank Greenberg',
  'Kirby Puckett',
  'Bob Feller',
  'Dizzy Dean',
  'Joe Jackson',
  'Sam Crawford',
  'Barry Bonds',
  'Duke Snider',
  'George Sisler',
  'Ed Walsh',
  'Tom Seaver',
  'Willie Stargell',
  'Bob Gibson',
  'Brooks Robinson',
  'Steve Carlton',
  'Joe Medwick',
  'Nap Lajoie',
  'Cal Ripken, Jr.',
  'Mike Schmidt',
  'Eddie Murray',
  'Tris Speaker',
  'Al Kaline',
  'Sandy Koufax',
  'Willie Keeler',
  'Pete Rose',
  'Robin Roberts',
  'Eddie Collins',
  'Lefty Gomez',
  'Lefty Grove',
  'Carl Yastrzemski',
  'Frank Robinson',
  'Juan Marichal',
  'Warren Spahn',
  'Pie Traynor',
  'Roberto Clemente',
  'Harmon Killebrew',
  'Satchel Paige',
  'Eddie Plank',
  'Josh Gibson',
  'Oscar Charleston',
  'Mickey Mantle',
  'Cool Papa Bell',
  'Johnny Bench',
  'Mickey Cochrane',
  'Jimmie Foxx',
  'Jim Palmer',
  'Cy Young',
  'Eddie Mathews',
  'Honus Wagner',
  'Paul Waner',
  'Grover Alexander',
  'Rod Carew',
  'Joe DiMaggio',
  'Joe Morgan',
  'Stan Musial',
  'Bill Terry',
  'Rogers Hornsby',
  'Lou Brock',
  'Ted Williams',
  'Bill Dickey',
  'Christy Mathewson',
  'Willie McCovey',
  'Lou Gehrig',
  'George Brett',
  'Hank Aaron',
  'Harry Heilmann',
  'Walter Johnson',
  'Roger Clemens',
  'Ty Cobb',
  'Whitey Ford',
  'Willie Mays',
  'Rickey Henderson',
  'Babe Ruth'
];

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


// LETS GET EXPERIMENTAL
app.post('/api/addclass', async (req, res, next) =>
{
  // incoming: userId, className, setIds (optional)
  // userId is stored as a string (to be changed later?)
  // outgoing: error
  
  const { userId, className, setIds } = req.body;

  // If setIds is not provided, default to an empty array
  const newClass = {
    className: className,
    userId: userId,
    sets: setIds || []
  };

  var error = '';

  try
  {
    const db = client.db("Group3LargeProject");
    
    // Here the await keyword is necessary to wait for the insert operation to complete
    const result = await db.collection('Class').insertOne(newClass);
  }
  catch(e)
  {
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/addset', async (req, res) => {
  const { UserId, SetName, public } = req.body; // Remove cards from here

  try {
    const db = client.db("Group3LargeProject");
    
    // Insert the new set document into the 'Sets' collection
    const setResult = await db.collection('Sets').insertOne({
      UserId: UserId,
      SetName: SetName,
      public: public,
      // Don't include cards array here initially
    });
    
    if (setResult.acknowledged) {
      // If you want to add cards separately, you can do so here or on the client-side by making separate requests to an addCard endpoint
      res.status(200).json({ message: "New set added successfully", setId: setResult.insertedId });
    } else {
      throw new Error("Failed to add new set");
    }
  } catch(e) {
    res.status(500).json({ error: e.toString() });
  }
});

app.get('/api/getset/:setId', async (req, res) => {
  try {
    const db = client.db("Group3LargeProject");
    const setId = req.params.setId;

    // This example assumes you're using the referencing approach,
    // where each card stores the setId it belongs to
    const set = await db.collection('Sets').findOne({ _id: new ObjectId(setId) });
    const cards = await db.collection('Cards').find({ SetId: setId }).toArray();

    if (!set) {
      return res.status(404).json({ message: "Set not found" });
    }

    // Combine the set data with its cards and return it
    res.status(200).json({ ...set, cards });
  } catch (e) {
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
