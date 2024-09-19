import User from "../models/User.js";
import jwt from 'jsonwebtoken';

//handle errors
//così possiamo gestire meglio gli errori che recuperiamo dallo schema, avendo informazioni più dettagliate sul tipo di errore
//l'errore globale altro non è che un obj con diverse proprietà che contengono informazioni su vari errori incontrati
//anche gli errori che abbiamo specificato nello user schema, dunque per poter accedere a quei valori in maniera rapida
//e più pulita, per far questo creiamo un obj vuoto e lo popoliamo dinamicamente tramite [], prima con Object.values recuperiamo
//i valori di ogni key al suo interno, poi per ogni sua proprietà che destrutturiamo nel forEach matchiamo la key tramite .path
//se corrisponde al nome esatto della proprietà specificata nell'obj assegnerà il nuovo valore .message
function handleError(err){
    console.log(err.message , err.code);
    let errors = {email : '',password: ''}

    //incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'That email is not registered'
    }

    //incorrect password
    if(err.message === 'incorrect password'){
        errors.password = 'That password is incorrect'
    }

    //duplicate error code, l'errore di duplicazione sarà sempre 11000, se è presente questo codice modifica direttamente
    //il val di email nell'obj vuoto
    if(err.code === 11000){
        errors.email = 'Email is already registered'
        return errors
    }

    //validation errors
    if(err.message.includes('user validation failed')){
        //const properties = error.properties, direttamente viene destrutturato nel forEach
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

const maxAge = 3 * 24 * 60 * 60 //3 day in millisec
const createToken = (id) => { 
    //genera il token tramite .sign, 1° arg il riferimento, 2° la key segreta per controlli generali, 3° obj di opzioni
    return jwt.sign({id} , 'super secret key' , {expiresIn: maxAge})
}

export async function signUp(req , res){
    res.render('signup')
}

export async function signUpPost(req , res){
    const {email , password } = req.body // req.body possiamo accedere alla richiesta
    try {
        //con .create possiamo utilizzare lo schema creato e popolarlo con gli elementi richiesti
        //il processo è asincrono ovviamente 
        //con .status settiamo lo stato in risposta, e mandiamo il json con i dati
        //con .send invece mandiamo qualcosa da visualizzare nel browser
        const user = await User.create({email ,password});
        const token = createToken(user._id) //passiamo l'id recuperato dal DB, in mongo id = _id
        res.cookie('jwt', token, {httpOnly : true , maxAge: maxAge * 1000}) //salviamo il token in cookie 
        res.status(201).json({user: user._id})
        console.log('Utente registrato');
    } catch (err) {
        const errors = handleError(err)
        res.status(400).json({errors})
    }
}

export async function login(req , res){
    res.render('login')
}

export async function loginPost(req , res){
    const {email , password } = req.body
    try {
        //il metodo statico è stato definito in User.js
        const user = await User.login(email , password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly : true , maxAge: maxAge * 1000})
        res.status(200).json({user: user._id})
        console.log('Utente loggato');
    } catch (err) {
        const errors = handleError(err)
        res.status(400).json({errors})
    }
}

export function logoutGet(req,res){
    //recuperare il cookie con nome, il 2° arg permette di rimpiazzare il valore
    //indiachiamo anche che l'età del token è di un millisec
    res.cookie('jwt'  , '' , {maxAge : 1})
    res.redirect('/')
}