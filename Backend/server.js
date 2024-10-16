const express =require('express');
const mysql=require('mysql');
const bodyParser=require('body-parser');
const app=express();
const PORT=3000;

app.use(bodyParser.urlencoded({extends:true}));
app.use(express.static('public'));

const db =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Madhura*866028#king',
    database:'hostel_management_system'
});

db.connect((err)=>{
    if(err) throw err;
    console.log('Connected to Database');
})

app.post('/login',(req,res)=>{
    const {Username,Password}=req.body;

    const query ='Select * From users Where USer=? And Password=?';

    db.query(query,[Username,Password],(err,results)=>{
        if(err) throw err; 

        if(results.length>0) {
           res.send('Login in Successful');
        }
        else{
            res.send('Invalid Username or Password.');
        }
   });
});

app.listen(PORT,()=>{
    console.log('Server is running on http://localhost:${Port}')
});