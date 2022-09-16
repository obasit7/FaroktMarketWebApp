const User = require('../models/user');

module.exports.renderRegister = (req,res)=>{
    res.render('users/register')
}

module.exports.registerUser = async(req,res, next)=>{
    try{
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password); //sotres hashed password
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', 'Welcome to Productify!');
            res.redirect('/products');
        })
        
    } catch(e){
        req.flash('error', e.message);
        res.redirect('register');
    }    
}

module.exports.renderLogIn = (req,res)=>{
    res.render('users/login')
}

module.exports.login = (req,res)=>{
    //using passport middleware
    req.flash('success', 'Welcome back');
    const redirectURL = req.session.returnTo || '/products';
    delete req.session.returnTo;
    res.redirect(redirectURL);  
}

module.exports.logout = (req,res)=>{
    req.logOut();
    req.flash('success', "Successfully logged out.");
    res.redirect('/products');
}