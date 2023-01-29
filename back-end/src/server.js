import express from 'express';
import bodyParser from 'body-parser';
import mongodb from 'mongodb';

const app = express();
app.use(bodyParser.json());

// Api to store the resumes in mongodb
app.post('/api/text', async (req, res) => {

    // Connecting with mongodb server
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = client.db('resumes');
    const collection = db.collection('docs');
    await collection.insertOne({ text: req.body.text });
    res.send('Text inserted into MongoDB collection');
    client.close();
});


// Api to get all the resumes stored in mongodb

app.get('/api/resumes', async (req, res) => {

    // Connecting with mongodb server

    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = client.db('resumes');
    const collection = db.collection('docs');

    // Sending back the array to our component in react
    collection.find({}).toArray((err, docs) => {
        if (err) throw err;
        res.send(docs);
        client.close();
    })



})

app.listen(8000, () => {
    console.log('Server started on http://localhost:3000');
});
