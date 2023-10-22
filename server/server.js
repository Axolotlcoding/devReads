const CLIENT_ID = "c0209758ca554097d7fe"
const CLIENT_SECRET = "73596a7d72b0d2496d588f140ff665179469a6db"
const PORT = 3000;
const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const articleController = require('./controllers/articleController');

app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../client')));

//route to homepage
app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../client/src/index.html'));
});


//route for github OAuth
app.get('/getAccessToken', articleController.authorizeUser, (req, res) => {
    res.status(200)/*.json(res.locals.authorizeUser)*/;
});


// //route to loggedIn
app.get('/user/', articleController.getUserPage, (req, res) => {
  res.status(200).json(res.locals.user);
});

// //add article route
// app.post('/article', articleController.addArticle , (req, res) => {
//   console.log('The front end is connected to the back end!!!!! !!!!! !!!!!!');
//   res.status(200).json(res.locals.addArticle);
// });

// //delete article route
// app.delete('/article', articleController.deleteArticle, (req, res) => {
//   res.status(200).json(res.locals.deleteArticle);
// });

//404 route
app.all('*', (req, res) => {
  res.status(404).send('The page you are looking for does not exist');
});

//global error handler
app.use((err, req, res, next) => {
  //define default error object
  const defaultErr = {
    log: "Express middleware error", //server sees this message
    status: 500,
    message: { err: "An error occured"} //client sees this message
  }
  //assign default error object to an errorObj variable
  const errorObj = Object.assign(defaultErr, err);
  //return json response including error object status and error object message
  return res.status(errorObj.status).json(errorObj.message);
});

//start server
app.listen(PORT, ()=> console.log('The server is listening on port 3000'));