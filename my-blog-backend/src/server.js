import fs from 'fs';
import admin from 'firebase-admin';
import express from 'express';
// import { MongoClient } from 'mongodb';
import { db, connectToDb } from './db.js';

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const app = express();
app.use(express.json());    // It parses input json and makes it available on request.body

/*
let articlesInfo = [{
    name: 'learn-react',
    upvotes: 0,
    comments: []
}, {
    name: 'learn-node',
    upvotes: 0,
    comments: []
}, {
    name: 'mongodb',
    upvotes: 0,
    comments: []
}];
*/

app.use(async (req, res, next) => {
    const { authtoken } = req.headers;
    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (e) {
            return res.sendStatus(400);
        }
    }
    req.user = req.user || {};
    next();
});

app.get('/api/articles/:name', async (request, response) => {
    /*
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('react-blog-db');
    */

    const {name} = request.params;
    const {uid} = request.user;
    const article = await db.collection('articles').findOne({ name });
    if(article){
        const upvoteIds = article.upvoteIds || [];
        article.canUpvote = uid && !upvoteIds.includes(uid);
        console.log(article);
        response.json(article);
    } else{
        response.sendStatus(404);
    }
});

app.use((request, response, next) => {
    if(request.user) {
        next();
    } else {
        response.sendStatus(401);
    }
});

app.put('/api/articles/:name/upvote', async (request, response) => {
    /*
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('react-blog-db');
    */

    const {name} = request.params;
    const {uid} = request.user;

    const article = await db.collection('articles').findOne({ name });
    if(article){
        const upvoteIds = article.upvoteIds || [];
        const canUpvote = uid && !upvoteIds.includes(uid);
        if(canUpvote){
            await db.collection('articles').updateOne({ name }, {
                $inc: {upvotes: 1},
                $push: {upvoteIds: uid}
            });
        }
        const updatedArticle = await db.collection('articles').findOne({ name });
        response.json(updatedArticle);
    } else {
        response.sendStatus(404);
    }

    /*
    const article = articlesInfo.find(article => article.name === name);
    if(article){
        article.upvotes += 1;
        response.send(`The ${name} article now has ${article.upvotes} upvotes`);
    } else {
        response.send('The given article doesn\'t exist');
    }
    */
});

app.post('/api/articles/:name/comments', async (request, response) => {
    /*
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('react-blog-db');
    */

    const {name} = request.params;
    const {postedBy, text} = request.body;

    await db.collection('articles').updateOne({ name }, {
        $push: {comments: {postedBy, text}}
    });
    const article = await db.collection('articles').findOne({ name });
    if(article){
        response.json(article);
    } else{
        response.send('The given article doesn\'t exist');
    }

    /*
    const article = articlesInfo.find(article => article.name === name);
    if(article){
        article.comments.push({postedBy, text});
        response.send(article.comments);
    } else{
        response.send('The given article doesn\'t exist');
    }
    */
});

/*
app.post('/hello', (request, response) => {
    response.send(`Hello ${request.body.name}!`);
});

app.get('/hello/:name', (request, response) => {
    // const name = request.params.name;
    const {name} = request.params; // Object Destructuring
    response.send(`Hello ${name}`);
});
*/

connectToDb(() => {
    console.log('Successfully connected to database!!')
    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    });
})
