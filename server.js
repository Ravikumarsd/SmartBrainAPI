const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
      app.use(bodyParser.json());
      app.use(cors());

const database = {
    users:[
        {
            id:'123',
            name:'ravi',
            email:'ravi@gmail.com',
            entries:0,
            joined: new Date()
        },

        {
            id:'124',
            name:'rakesh',
            email:'rakesh@gmail.com',
            entries:0,
            joined: new Date()
        }
    ]
}

app.get('/',(req,res)=> {
    res.json(database.users)
})

app.post('/signin',(req,res) => {
    
    if(req.body.email === database.users[0].email && 
       req.body.password === database.users[0].password) {
                res.json("Success");
            } else {
                res.status(400).json("error logging in");
             }
})

app.post('/register',(req,res)=>{
    const {email,name,password} = req.body;
    // Store hash in your password DB.
    bcrypt.hash(password, null, null, (err, hash) => {
        console.log(hash);
    });

    database.users.push(
        {
            id:'129',
            name:name,
            email:email,
            entries:0,
            joined: new Date()
        }
    )
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id',(req,res)=>{
        const { id } = req.params;
        let found = false;
        database.users.forEach( user => {
            if( user.id === id) {
                found = true;
                 return res.json(user);
            } 
        })
        if(!found){
            res.status(404).json("Not found");
        }
})

app.post('/images',(req,res)=>{
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            user.entries++;
            return res.json(user);
        }
    })
    if(!found) {
        res.status(404).json("Not found");
    }
 })

app.listen(3000,() =>{
    console.log("Server is runnin on port 3000");
})


 // // Load hash from your password DB.
    // bcrypt.compare("hari", '$2a$10$82CmQfl3dGFZ.0rTsefFpOv92MQRQTl/vN8qETzdf3v2AgMQ.H4Cy', function(err, res) {
    //     console.log("first guess",res);
    // });
    // bcrypt.compare("hari", '$2a$10$82CmQfl3dGFZ.0rTsefFpOv92MQRQTl/vN8qETzdf3v2AgMQ.H4Cy', function(err, res) {
    //     console.log("second guess",res);
    // });