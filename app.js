if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
//const morgan = require('morgan');
const ExpressError = require('./utils/ExpressError');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const productRoutes = require('./routes/products');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/farokht', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
}

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
    secret: 'ahiddensecret!',
    resave: false,
    saveUninitialized: true, 
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.engine('ejs', ejsMate);
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));
//app.use(morgan('tiny'));

//FLASH middleware - global
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.use('/products', productRoutes);
app.use('/products/:id/reviews', reviewRoutes);
app.use('/', userRoutes);

app.get('/', (req,res)=>{
    res.render('home')
})

app.all('*', (req,res,next)=>{
    next(new ExpressError('Page not found', 404))
})

app.use((err,req,res,next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message= 'Oh No, Something went wrong!';
    res.status(statusCode).render('error', {err});
})

app.listen(3000, ()=>{
    console.log("SERVING ON 3000")
})


