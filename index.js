const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost/wikiDB",{useNewUrlParser:true , useUnifiedTopology:true});

const articaleschema = {
    name:String,
    desc:String
};

const Articale = mongoose.model("Articale",articaleschema);

app.route("/articales")

.get(function(req,res){
    Articale.find(function(err,result){
        if(!err){
            res.send(result);
        }else{
            res.send(err);
        }
    })
})

.post(function(req,res){

    const newarticale = new Articale({
        name: req.body.name,
        desc: req.body.desc
    });
    newarticale.save(function(err){
        if(!err){
            res.send("new articales added succesfully");
        }else{
            res.send(err);
        }
    });
})

.delete(function(req,res){
    Articale.deleteMany(function(err){
        if(!err){
            res.send("all articales deleted succesfully");
        }else{
            res.send(err);
        }
    });
});



app.route("/articales/:articalename")

.get(function(req,res){
    Articale.findOne({name:req.params.articalename},function(err,result){
        if(result){
            res.send(result);
        }else{
            res.send("sorry art5icale name not matcxhed");
        }
    });
})

.put(function(req,res){
    Articale.replaceOne(
        {name:req.params.articalename},
        {name:req.body.name, desc:req.body.desc},
        function(err){
            if(!err){
                res.send("update succesfully");
            }else{
                res.send(err);
            }
        });
})

.patch(function(req,res){
    Articale.updateMany(
        {name:req.params.articalename},
        {$set:req.body},
        function(err){
            if(!err){
                res.send("patch succesfully");
            }else{
                res.send(err);
            }
        });
})

.delete(function(req,res){
    Articale.deleteOne(
        {name:req.params.articalename},
        function(err){
            if(!err){
                res.send("articale name was deleted succesfully");
            }else{
                res.send(err);
            }
        }
    );
});


app.listen(3000 , function(req,res){
    console.log("server connected succesfully");
})