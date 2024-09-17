import express from "express";
import mongoose from "mongoose";
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
