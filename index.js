let express = require('express');
let dotenv = require('dotenv')
let mongoose = require('mongoose')




let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let session = require('express-session');
let flash = require('connect-flash');

dotenv.config({path:'./config.env'})
mongoose.connect(process.env.MOngoURL)

let app = express() // create app
app.set('view engine', 'ejs') //view engine ejs setting
app.use(express.static(__dirname+'/public/')); // static folder setting

//MIDDLEWARE
    //bodyparreser middleware (read post form data)
    app.use(bodyParser.urlencoded({extended:true}))
    //methodOverride middleware (edit data)
    app.use(methodOverride('_method'))
    //session middleware (message setting in session)
    app.use(session({
        secret:'nodejs',
        resave:true,
        saveUninitialized:true
    }))
    //flash middleware (display message)
    app.use(flash())



//SET GLOBAL VARIABLE FOR MESSAGE 
    app.use((req, res, next)=>{
        res.locals.sucess = req.flash('sucess') 
        res.locals.err = req.flash('err')
        next()
    })

    
    

// CUSTOMIZE ROUTER HERE
let admin_page_router = require('./router/backend/adminRouter')
let frontent_page_router = require('./router/frontent/frontentRouter')

app.use('/admin/pages/',admin_page_router );
app.use('/',frontent_page_router)
//app.use('/users', users);

app.listen(process.env.PORT, ()=>{
    console.log(process.env.PORT, 'Port Working')
})
