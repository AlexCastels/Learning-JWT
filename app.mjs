import express from 'express';
import mongoose from 'mongoose';
import { signUp, signUpPost, login, loginPost } from './controller/controller.mjs'

const app = express();

// middleware
app.use(express.static('public'));

// view engine, permette di settare la vista del motore utilizzato, in questo caso ejs una forma di html e js
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://Alex:admin@cluster0.vdw2h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000) , console.log('Server start at http://localhost:3000'))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

//istanziamo le route, avremo le funzioni in controller.mjs
//che si occuperanno di manipolare/controllare il nostro db
app.get('/signup' , signUp)
app.post('/signup' , signUpPost)
app.get('/login' , login)
app.post('/login' , loginPost)