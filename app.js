 const express = require("express");
 const app = express();
 const bodyParseer = require("body-parser");
 const request = require("request");
 const https = require("https");

 app.use(express.static("public"));
 app.use(bodyParseer.urlencoded({
   extended: true
 }));

 app.get("/", function(req, res) {
   res.sendFile(__dirname + "/signup.html");
 });

 app.post("/", function(req, res) {
   const firstname = req.body.fname;
   const lastname = req.body.lname;
   const email = req.body.email;
   console.log(firstname, lastname, email);

   var data = {
     members: [{
       email_address: email,
       status: "subscribed",
       merge_fields: {
         FNAME: firstname,
         LNAME: lastname
       }
     }]
   };

   const jsonData = JSON.stringify(data);
   const url = "https://us14.api.mailchimp.com/3.0/lists/193190517b";
   const options = {
     method: "POST",
     auth: "sparsh:ec945592daf8d17ec355c8c2c3113d30-us14"

   }


   const request = https.request(url, options, function(response) {

       res.sendFile(__dirname+"/failure.html");



     response.on("data", function(data) {
       console.log(response.stausCode);

     });
   });
   request.write(jsonData);
   request.end();
 });


 app.listen(process.env.PORT||3000, function() {
   console.log("server started in port 3000");
 });
 //listid
 //193190517b.
//api key
 //ec945592daf8d17ec355c8c2c3113d30-us14
