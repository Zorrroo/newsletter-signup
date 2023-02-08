const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');
const app = express()
const port = 3000
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true})); 
app.get('/',function (req, res){
    res.sendFile(__dirname + "/signup.html");
})
app.post('/', function (request,resposne){
    var firstName = request.body.fName;
    var lastName = request.body.lName;
    var email = request.body.email;
    console.log(firstName, lastName, email);
})
app.listen(port, () => console.log(`server is running on port ${port}!`))