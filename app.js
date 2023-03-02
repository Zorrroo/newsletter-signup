const express = require('express');
const bodyparser = require('body-parser');
var https = require('https');
const request = require('request');
const app = express()
const port = 3000
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true})); 
app.get('/',function (req, res){
    res.sendFile(__dirname + "/signup.html");
})
app.post('/', function (req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME  : lastName,
                }
            }
        ]
    };
    const jsondata = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/efec40ffaf"
    const options = {
        method: "POST",
        auth: "sigma:f49c7ddd263b356f9564d6352b824d0-us21",
    }
    const request = https.request(url,options, function(response){
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }   
        else{
            res.sendFile(__dirname + "/success.html")
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata);
    request.end();
});
app.post("/failure", function(req,res){
res.redirect("/")
})
app.listen(port, () => console.log(`server is running on port ${port}!`))

// API Key
// bf49c7ddd263b356f9564d6352b824d0-us21 

//unique id 
// efec40ffaf