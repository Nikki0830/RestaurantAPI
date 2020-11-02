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


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.get('/health',(req,res) => {
    res.send("Api is working")
});

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

//restaurant
app.get('/rest',(req,res) => {
    var condition = {};
    if(req.query.city && req.query.mealtype){
        condition = {city:req.query.city,"type.mealtype":req.query.mealtype}
    }
    else if(req.query.city){
        condition={city:req.query.city}
    } else if(req.query.mealtype){
        condition={"type.mealtype":req.query.mealtype}
    }
    else{
        condition={}
    }
    db.collection('restaurant').find(condition).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//RestaurentDetai+
app.get('/restaurantdetails/:id',(req,res) => {
    var query = {_id:req.params.id}
    db.collection('restaurant').find(query).toArray((err,result) => {
        res.send(result)
    })
})

//RestaurantList
app.get('/restaurantList/:mealtype',(req,res) => {
    var condition = {};
    var sort={cost:1}
    if(req.query.cuisine){
        condition={"type.mealtype":req.params.mealtype,"Cuisine.cuisine":req.query.cuisine}
    }else if(req.query.city){
        condition={"type.mealtype":req.params.mealtype,city:req.query.city}
    }else if(req.query.lcost && req.query.hcost){
        condition={"type.mealtype":req.params.mealtype,cost:{$lt:Number(req.query.hcost),$gt:Number(req.query.lcost)}}
    }else if(req.query.sort){
        condition={"type.mealtype":req.params.mealtype}
        sort={cost:Number(req.query.sort)}
    }
    else{
        condition= {"type.mealtype":req.params.mealtype}
    }
    db.collection('restaurant').find(condition).sort(sort).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


//PlaceOrder
app.post('/placeorder',(req,res) => {
    console.log(req.body);
    db.collection('orders').insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('posted')
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


