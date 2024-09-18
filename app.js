import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import {
    signUp,
    signUpPost,
    login,
    loginPost,
} from "./controller/controller.js";
//in package.json aggiungendo la proprietà "type" : "module" permettiamo l'utilizzo dei moduli ECMA
//senza dover specificare l'estenzione diretta del file con .mjs
const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json()); //per poter leggere file json (express non è in grado), trasfroma i file json in obj
app.use(cookieParser()); //per poter ottenere in maniera più semplice i cookies

// view engine, permette di settare la vista del motore utilizzato, in questo caso ejs una forma di html e js
app.set("view engine", "ejs");

// database connection
const dbURI = "mongodb+srv://Alex:admin@cluster0.vdw2h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//la Key generalmente sarà salvata in un file .env
const connectDB = async () => {
    try {
        await mongoose.connect(dbURI)
        app.listen(3000)
        console.log("Server start at http://localhost:3000")
    } catch (error) {
        console.log(error);
    }
};
connectDB()
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((result) => app.listen(3000),console.log("Server start at http://localhost:3000"))
//     .catch((err) => console.log(err));

// routes
//istanziamo le route, avremo le funzioni in controller.js che si occuperanno di manipolare/controllare il nostro db
//il primo argomento indica la route da navigare, il secondo arg la funzione da eseguire quando viene mandata la richiesta
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies")); //indica i file in View
app.get("/signup", signUp);
app.post("/signup", signUpPost);
app.get("/login", login);
app.post("/login", loginPost);

//set cookies
//troviamo i cookie nel devtool nella sezione Application>Cookies
//sempre nel devTool possiamo leggere i cookies tramite document.cookie
//hanno validità solamente per la sessione corrente
app.get('/set-cookies' , (req , res) => {
    // res.setHeader('Set-Cookie' , 'newUser=true');//1° arg azione, 2° coppia chiave valore in stringa
    // res.send('Cookie is set');
    res.cookie('newUser' , false) //metodo della libreria cookie-parser, il 3° arg è un obj di opzioni
    res.cookie('isEmployee' , true, {
        maxAge : 1000 * 60 * 60 * 24, //indica la durata del cookie == maxAge: giorno in millisec
        httpOnly : true, //il cookie può essere visto solamente tramite richieste backend
        //secure: true, //indica che può essere mnandato solamente quando abbiamo una richiesta https, secure connection
    }) 
    res.send('Cookie is set') //in express ricordarsi sempre di terminare la chiamata con una risposta, per evitare loop infiniti
})

app.get('/read-cookies' , (req , res) => {
    const cookies = req.cookies;//accedere ai cookie, è un obj con tutti i cookies presenti nel browser
    const userCookie = req.cookies.newUser    
})
