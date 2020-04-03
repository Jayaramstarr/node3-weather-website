const request = require('request');

const geoCode =(ads,cb)=>{
    
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(ads)}.json?access_token=pk.eyJ1IjoiamF5YXJhbTAwNyIsImEiOiJjazhmb2IyMHYwNTdqM2Rtazg2bmdyNGY4In0.d9RsKRkf97-hHtiAGlGH6g&limit=1`;
    
    request({url,json:true},(er,{body}={})=>{
        if(er)
            cb("Unable to connect to the location services",undefined);  
        else if (body.features.length==0)
            cb("Unable to find the location",undefined);
        else
            cb(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            });
    });
}

module.exports=geoCode;