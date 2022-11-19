const express=require('express')
const app=express()
const sessions=require('express-session')

// setting view engine
app.set('view engine','ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// app.use(cookieParser())
app.use(sessions({
    resave:true,
    saveUninitialized:true,
    secret:'secretpassword',    
}))
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});

const user={
 email:'admin@gmail.com',
 password:'12345'
}

//rendering home page
app.get('/',(req,res)=>{
    res.render('login')
})
app.post('/',(req,res)=>{
    if(req.body.email===user.email && req.body.password===user.password){
        req.session.user = req.body.email;   
        console.log('session created')
        res.redirect('/home')
    }
    else{
        res.render('login',{wrong:"Invalid username or Password"})  
    }
})

app.get('/home',(req,res) => {
    if(req.session.user) {
        res.render('index', { users:"Alan" })
    }
    else {
        res.redirect('/')
    }
})

app.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/');
    res.end();
}
)
app.listen(3000,()=> console.log(`server started at http://localhost:3000 port `)

)