const express = require("express");
const res = require("express/lib/response");
const https=require("https");
const bodyParser=require("body-parser");
const { urlencoded } = require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});


app.post("/" , function(req,res){
    console.log(req.body.city);
    
    var city=req.body.city;
   // var apiKey="7742ce76bb76ceefe371eb307987d4ec4";
    var units = "metric";
    var url="https://"+"api.openweathermap.org/data/2.5/weather?q="+city+"&units="+units+"&appid=3451b2f018e53c78adc0e733d56f4afe";
    console.log(url);
    https.get(url,function(response){
        response.on("data",function(data){
           var weatherData = JSON.parse(data);
           console.log(weatherData);
           var temprature = weatherData.main.temp;
           var weatherDescription = weatherData.weather[0].description;
           var imageId = weatherData.weather[0].icon;
           console.log(imageId);
           imageURL="http://openweathermap.org/img/wn/"+imageId+ "@2x.png";
           res.write("<p>the weather is currently "+weatherDescription +"</p>");
           res.write("<h1>the temperature in "+city +" is "+temprature+" degree celcius</h1>");
           res.write("<img src="+imageURL+">");
           res.send();
        });
    });
    
    
    });

app.listen(3000,function(){
    console.log("server started");
});