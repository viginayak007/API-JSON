
const express = require('express')
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');


app.use(bodyParser.json());

app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send('Welcome to API');
});

app.get('/authenticate', (req, res) => {
    fs.readFile('./data/login.json', 'utf-8', (err, data) =>{
        if (err) throw err;

        let Data = JSON.parse(data);
        let users = Data.users;
        let result = false;
        for (let i = 0; i < users.length - 1; i++) {
            if (users[i].userID === req.query.userID && users[i].password === req.query.password) {
                result = true;
            }
        }
        res.send(result);
       
    });
});


app.post('/student', (req, res) => {
    fs.readFile('./data/student.json', 'utf-8', (err, data) => {
        if (err) throw err;

        let Data = JSON.parse(data);
        let students = Data;
        Data.students.push({
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "age": req.body.age,
            "gender": req.body.gender,
            "department": req.body.department   
        });

        fs.writeFile('./data/student.json', JSON.stringify(Data), 'utf-8', function (err) {
            if (err) throw err;
        });
    });
});

app.listen(8080, () => {
    console.log('Example app listening on port 8080!')
})