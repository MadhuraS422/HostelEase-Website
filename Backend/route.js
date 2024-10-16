app.post('/registraction',(req,res)=>{
    const newregistraction={Email: req.body.Email,Password: req.body.Password,Repeat_Password:req.body.Repeat_Password,Hostel_Name:req.body.Hostel_Name,Phone_Number:req.body.Phone_Number,Area:req.body.Area,City:req.body.City,Hostel_Address:req.body.Hostel_Address};
    const sql ='Insert Into registration ser?';
    db.query(sql,newregistraction,(err,result)=>{
        if(err) throw err;
        res.send('New Registration Added');
    });
});

app.post('/login/Password',(req,res)=>{
    const sql ='Update password Set code =${req.body.Password} Where Email =${req.params.Email}';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('Password Updated');
    });
});

const bcrypt=require('bcryptjs');

app.post('/sign_up',(req,res)=>{
    const {Email,Password}=req.body;
    const userCheckQuery ='Select * From users Where Email=?';
    db.query(userCheckQuery,[Email],async(err,results)=>{
        if(results.length>0) {
            return res.status(400).json({msg:'User already exists'});
        }
    
    const hashedPassword=await bcrypt.hash(Password,10);
    const sql = 'Insert Into Email(Email,Password)Values(?,?)';
    db.query(sql,[Email,hashedPassword],(err,result)=>{
        if(err) throw err; 
        res.send('User Registered');
    });
   });
});

const jwt=require('jsonwebtoken');

app.post('/login',(req,res)=>{
    const {Email,Password}=req.body;
    const userCheckQuery ='Select * From users Where Email=?';
    db.query(userCheckQuery,[Email],async(err,results)=>{
        if(results.length>0) {
            return res.status(400).json({msg:'User already exists'});
        }
    
    const hashedPassword=await bcrypt.hash(Password,10);
    const sql = 'Insert Into Email(Email,Password)Values(?,?)';
    db.query(sql,[Email,hashedPassword],(err,result)=>{
        if(err) throw err; 
        res.send('User Registered');
    });
   });
});
