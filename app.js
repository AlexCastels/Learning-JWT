import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import {
    signUp,
    signUpPost,
    login,
    loginPost,
    logoutGet,
} from "./controller/controller.js";
import { checkUser, requireAuth } from "./middleware/middleware.js";
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

// routes
//istanziamo le route, avremo le funzioni in controller.js che si occuperanno di manipolare/controllare il nostro db
//il primo argomento indica la route da navigare, il secondo arg la funzione da eseguire quando viene mandata la richiesta
//con * inidichiamo tutte le routes possibili presenti nel nostro sito
app.get('*' , checkUser)
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies")); //indica i file in View
app.get("/signup", signUp);
app.post("/signup", signUpPost);
app.get("/login", login);
app.post("/login", loginPost);
app.get("/logout" , logoutGet);

