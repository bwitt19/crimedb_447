var mongoose = require("mongoose")
var request = require("request")
var fs = require('fs');
const Crime = require('./models/crime.model');
require('dotenv').config();
var url = "https://data.baltimorecity.gov/resource/wsfq-mvij.json"
var schedule = require('node-schedule');


var j = schedule.scheduleJob({hour: 0, minute: 0, dayOfWeek: 0}, function(){
//var j = schedule.scheduleJob('* * * * *', function(){///////////////
    //I will need to connect to the open Baltimore server to retrieve the crimes in the database
    
    request({
        url: url,
        json: true
    }, function (error, response, body) {//body is a list holds all of the crimes
        var flag = true;
        var new_crimes = [];
        var count = 0;
        var old_date = fs.readFileSync('old_date.txt');//the last time the crimes were updated
        old_date = old_date.toString();
        
        old_date = new Date(old_date);
        
        
        if(!error && response.statusCode === 200){//if there is no error when retrieving new crimes, update those crimes
            //console.log(body)//print the json response
            while(flag === true && count < body.length){
                var newdate = new Date(body[count].crimedate);
                
                if(newdate.getTime() > old_date.getTime()){
                    
                    new_crimes.push(body[count]);
                    //console.log(body[count]);////////////
                    count = count + 1;
                }
                else{
                    flag = false;
                }
            }
            var curdate = new Date();
            curdate = curdate.toString();
            fs.writeFile("old_date.txt", curdate, (err) =>{
                if(err) throw err;

            });
            
            for(var i = 0; i < new_crimes.length; i++){
                
                var crime = new Crime({
                    _id: mongoose.Types.ObjectId(),
                    crimecode: (String(new_crimes[i].crimecode).length != 0 ? String(new_crimes[i].crimecode) : ""),
                    address:(String(new_crimes[i].location).length != 0 ? String(new_crimes[i].location) : ""),
                    type:(String(new_crimes[i].description).length != 0 ? String(new_crimes[i].description) : ""),
                    latitude:((new_crimes[i].latitude) === Number ? Number(new_crimes[i].latitude) : 0),
                    longitude:((new_crimes[i].longitude) === Number ? Number(new_crimes[i].longitude) : 0),
                    date:(new Date(new_crimes[i].crimedate.slice(0, 11)+ new_crimes[i].crimetime) ),
                    weapon: (String(new_crimes[i].weapon).length != 0 ? String(new_crimes[i].weapon) : ""),
                    district: (String(new_crimes[i].district).length != 0 ? String(new_crimes[i].district) : ""),
                    neighborhood: (String(new_crimes[i].neighborhood).length != 0 ? String(new_crimes[i].neighborhood) :""),
                    premise: (String(new_crimes[i].premise).length != 0 ? String(new_crimes[i].premise) : "")  
                                        
                })  
                          
            
                // Save it to the database
                crime.save(function (err, retUser) {
                    if (err) 
                        return console.error(err);
        
                    
                })
                
                       
            
            }

        }
      }	
    )
    const uri = process.env.MONGO_URI;
    mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true}, );
    const connection = mongoose.connection;
    

    console.log('updated database');
});
