const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//define paths for Express config
const pubDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');


//setup handelbars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(pubDirPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:"Jayaram"
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About me",
        name:"Jayrama"
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        msg:"Example message",
        name:"Jayram"
    });
});

app.get('/weather',(req,res)=>{
    
    if(!req.query.address)
        return res.send({
            error:'Please enter the address'
        });
    
    geoCode(req.query.address,(er,{latitude:lat,longitude:lon,location:loc}={})=>{
        if(er)
         return res.send({
             error:er
         });
         
         
        forecast(lat,lon,(er,body)=>{
        if(er)
            return res.send({
                error:er
            });
        res.send({
                loc,
                summary:body.daily.data[0].summary,
                temperature:body.currently.temperature,
                precipitation:body.currently.precipProbability,
                lat,
                lon
            });
        });
    });
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        msg:'Help article not found',
        name:'Jayram'
    });
});

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        msg: 'Page not found',
        name:'Jayram'
    });
});

app.listen(port,()=>{
    console.log("Server is up on port "+ port);
});
