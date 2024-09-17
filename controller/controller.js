import User from "../models/User.js";

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
        const user = await User.create({email ,password})
        res.status(201).json(user).send('new singup')
    } catch (error) {
        console.log(error);
        res.status(400).send("error, user not created")
    }
}


export async function login(req , res){
    res.render('login')
}

export async function loginPost(req , res){
    const {email , password } = req.body
    console.log(email , password);
    res.render('user login')
}