
const request = require('request');


const forecast = (lat,long,cb)=>{

    const url = `https://api.darksky.net/forecast/07f07d67ccadae513615882d60f70635/${lat},${long}`;
    request({url,json:true},(err,{body})=>{

        if(err)
            cb(`Unable to connect to the location services`,undefined);
        else if (body.error)
            cb(`Unable to find the location`,undefined);
        else
            cb(undefined,body);
    });

}

 
module.exports = forecast;

