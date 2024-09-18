//Spiegazione cookies
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