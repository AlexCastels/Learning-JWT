
export async function signUp(req , res){
    res.render('signup')
}

export async function signUpPost(req , res){
    res.send('new singup')
}


export async function login(req , res){
    res.render('login')
}

export async function loginPost(req , res){
    res.render('user login')
}