
export async function signUp(req , res){
    res.render('signup')
}

export async function signUpPost(req , res){
    const {email , password } = req.body
    console.log(email , password);
    res.send('new singup')
}


export async function login(req , res){
    res.render('login')
}

export async function loginPost(req , res){
    // req.body possiamo accedere alla richiesta
    const {email , password } = req.body
    console.log(email , password);
    res.render('user login')
}