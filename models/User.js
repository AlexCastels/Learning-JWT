import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import pkg from 'validator';
const { isEmail } = pkg;

//si importano tutti i pakage di validator e si destrutturano le funzioni che servono

//così è come poter definire degli schermi tramite mongoose, per poter creare modelli per poter inserire dati
//con le [] in required possiamo specificare prima il tipo, poi un msg per gestire gli errori
//validate è un parametro che permette l'aggiunzione di una funzione personalizzata e non per poter creare un controllo
//in questo caso viene utilizzata una lib esterna che presenta già una funzione per la verifica della mail. 
//(scrittura personalizzata):validate: (val) => {} il val corrisponde al valore inserito nel'oggetto email 

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required : [true , 'Please enter an email'],
        unique: true ,
        lowercase : true,
        validate: [isEmail, 'Please enter an valid email']
    },
    password:{
        type: String,
        required : [true , 'Please enter an password'],
        minlength: [6 , 'Minimum password length is 6 characters'],
    },
})

//hook di mongoose
//avviare una funzione dopo il salvataggio nel DB, mongoose middleware, ce ne sono di diverse, ed il tipo viene specificato come
//1° arg, il secondo argomento è la funzione che verrà avviata
userSchema.post('save' , function(doc){ //documento
    console.log('new user was created' , doc)
})

//avviare una funzione prima del salvataggio in DB, middleware con .pre
//all'interno delle middleware, this si riferisce all' istanza dell'oggetto su cui la middleware sta operando
userSchema.pre('save' , async function(){
    const salt = await bcrypt.genSalt(); //genera il salt che verrà accoppiato successivamente
    this.password = await bcrypt.hash(this.password, salt) //genera l'hash della pass insieme al salt    
})

//static method to login user
//possiamo definire dei metodi definiti statici legati allo schema, in questo caso un login
//this si riferisce al modello che abbiamo creato di user (l'obj) e findOne è un metodo per interfacciare il DB
//se viene trovata un email significherà che esiste l'user, altrimenti la variabile darà undefined
//la funzione vorrà passati email e password dall'utente in fase di login, funzione definita in controller.js
userSchema.statics.login = async function(email , password){
    const user = await this.findOne({email})
    if(user){
        //tramite il metodo della libreria compariamo la password criptata presente nel DB, con la password che fornisce l'user
        const auth = await bcrypt.compare(password , user.password)
        if(auth){
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const User = mongoose.model('user' , userSchema)

export default User

//hashing a password
//utilizzando bcrypt abbiamo la possibilita di criptare le nostre password nel DB, non è mai un azione sicura quella di 
//storare le password direttamente nel DB, hashing sta per trasformare la password in una serie di caratteri alfanumerici
//ma solamente questo non basta, perchè si potrebbe eseguire un azione inversa per poter recuperare la pass originale dal DB,
//per una maggiore sicurezza viene generato un salt, cioe un codice univoco unito alla password e poi convertito in hash
//per garantire ancor più sicurezza, dopo di chè bisognerà avere un confronto tra salt e password per garantire l'accesso