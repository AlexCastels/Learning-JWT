import jwt from 'jsonwebtoken';
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