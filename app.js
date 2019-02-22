const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.json());
const db = require("./db");
const collection ="todos";
const PORT = process.env.PORT || 2000;

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname, 'index.html'));
// })

app.use('/', express.static('public'));
// retrieve the items
app.get('/getTodos', (req,res)=>{
    db.getDB().collection(collection).find({}).toArray((err,documents)=>{
        if(err)
        console.log(err);
        else{
            console.log(documents);
            res.json(documents);
        }
    });
});

// Update the item
app.put('/:id',(req,res)=>{
    const todoID = req.params.id; 
    const userInput = req.body;
    db.getDB().collection(collection).findOneAndUpdate({_id : db.getPrimaryKey(todoID)},{$set : {todo : userInput.todo}},{returnOriginal : false},(err,result)=>{
        if(err)
            console.log(err);
        else{
            res.json(result);
        }      
    });
});

// Adding Items
app.post('/',(req, res)=>{
    const userInput = req.body;
    db.getDB().collection(collection).insertOne(userInput, (err, result)=>{
    if(err){
        console.log(err)
    }
    else{
        res.json({result: result, document: result.ops[0]});
    }
    })
})


// Delete
app.delete('/:id',(req,res)=>{
    const todoId = req.params.id;
    db.getDB().collection(collection).findOneAndDelete({_id: db.getPrimaryKey(todoId)},(err, result)=>{
        if(err)
        console.log(err);
        else{
            res.json(result);
        }
    });
})



// Connection
db.connect((err)=>{
    if(err){
    console.log("unable to connect to database");
    process.exit();
    }
    else{
        app.listen(PORT, ()=>{
            console.log(`connected to database, app listneing to ${PORT}`);
        });
    }
})
