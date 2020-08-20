const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

let day = date.getDate();

var item = "";
var items = [];
var workItems = [];
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res)=>{


res.render("list", {listTitle : day ,newListItems: items});
});

app.post("/", (req,res)=>{
    item = req.body.newItem;
    if(req.body.list === "Work"){
      workItems.push(item);
      res.redirect("/work");
    
   }else{
    items.push(item);
    res.redirect("/");
   }
   
});

app.get("/work", (req,res) =>{
    res.render("list", {listTitle: "Work List" , newListItems: workItems});
});

app.post("/work", (req,res) =>{
    let item = req.body.newWItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about", (req,res) =>{
    res.render("about");
});

app.listen(3000, ()=>{
console.log("Listening on port 3000");

});