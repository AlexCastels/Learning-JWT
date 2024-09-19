import jwt from 'jsonwebtoken';
import User from '../models/User.js';
//adesso ad esempio ritorna l'utilizzo della chiave segreta che abbiamo utilizzato per poter creare il token inizialmente
//in controller, la chiave serve per poter creare la verifica effettiva del token assegnato

//check jwt exixts and is verified
//jwt.verify accetta tre argomenti, il token ricevuto, la key segreta impostata per poter eseguire i controlli ed una func
//la funzione deve contenere 2 argomenti, uno è l'errore, l'altro arg contiene il token decodificato
//semplicemente qui stiamo dicendo che se il token non va bene si viene forzatamente renderizzati al login, senza possibilita
//di poter navigare altro nel sito
//questa middleware può essere usata in qualsiasi pagina si voglia navigare per poter bloccare l'accesso

export function requireAuth(req, res, next){
    const token = req.cookies.jwt  
    if(token){
        jwt.verify(token , 'super secret key' , (err , decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/login')
            } else {
                console.log(decodedToken);
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}

//check current user
//middleware per riccevere informazioni dell'utente loggato, utilizziamo sempre il controllo del token se esiste
//res.locals permette di passare informazioni dalle middleware, in questo caso le informazioni di user
//decodedToken rappresenta il payload di jwt, contenende le informazioni del token, siccome noi lo generiamo in base
//all'id utente, conterrà l'esatto id ricevuto dal DB, dunque utilizziamo findById passando questo id per recuperare l'user
export function checkUser(req , res , next){
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token , 'super secret key' , async (err , decodedToken) => {
            if(err){
                console.log(err.message);
                res.locals.user = null
                next()
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}