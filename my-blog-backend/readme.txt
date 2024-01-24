Steps:

1. npm init -y         // Creating Package.json file
2. npm install express // Installing Express Package
3. Add "type": "module" in package.json to support import and export statements
4. node src/server.js  // To run server
5. npm install nodemon --save-dev // Installs as dev dependency instead of actual prod dependency
6. npx nodemon src/server.js      // Automatically restarts server
7. Add "dev": "npx nodemon src/server.js" under scripts, so we can just use `npm run dev` to Run Application.
8. npm install mongodb // Allows us to connect to DB and make operations
9. npm install firebase-admin // Connecting to Firebase from Backend
10. npm install dotenv // for storing mongo username and password

Mongo Shell Commands:

> show dbs
> db.articles.insertMany([{...}])
> db.articles.find({})
> db.articles.find({}).pretty()
> db.articles.find({name: 'learn-react'})
> db.articles.find({upvotes: 0})
