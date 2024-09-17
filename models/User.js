import mongoose from 'mongoose'
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

const User = mongoose.model('user' , userSchema)

export default User