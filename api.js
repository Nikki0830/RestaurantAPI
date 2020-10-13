var express = require('express');
var app = express();
var port = process.env.PORT || 5500;
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var mongourl = "mongodb+srv://niki0830:niki0830@cluster0.zjsuq.mongodb.net/<Edureka>?retryWrites=true&w=majority";
var cors = require('cors');
var db;

app.use(cors());


/*app.get('/health',(req,res) => {
    res.send("Api is working");
})*/

app.get('/',(req,res) => {
    res.send(`<a href="http://localhost:5500/location" target="_blank">City</a> </br>
            <a href="http://localhost:5500/meal" target="_blank">MealType</a> </br>
            <a href="http://localhost:5500/cusn" target="_blank">Cusine</a> </br>
            <a href="http://localhost:5500/rest" target="_blank">Restaurant</a> </br>
            <a href="http://localhost:5500/order" target="_blank">Orders</a> </br>`)
})

//To get city
app.get('/location',(req,res) => {
    db.collection('city').find({}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


app.get('/meal',(req,res) => {
    db.collection('mealtype').find({}).toArray((err,output) => {
        if(err) throw err;
        res.send(output);
    })
})

app.get('/cusn',(req,res) => {
    db.collection('cuisine').find({}).toArray((err,output) => {
        if(err) throw err;
        res.send(output);
    })
})

app.get('/rest',(req,res) => {
    db.collection('restaurant').find({}).toArray((err,output) => {
        if(err) throw err;
        res.send(output);
    })
})
app.get('/order',(req,res) => {
    db.collection('orders').find({}).toArray((err,output) => {
        if(err) throw err;
        res.send(output);
    })
})

MongoClient.connect(mongourl,(err,connection) => {
    if(err) throw err;
    db = connection.db('Edureka');
    app.listen(port,(err) => {
        if(err) throw err;
        console.log(`Server is running on port ${port}`);
    })
})


