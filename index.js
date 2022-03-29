const express = require('express')
const app = express()
const {initScheduler, initSchedulers} = require("./scheduler.js")

const PORT = process.env.PORT || 3000;

app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())

//to schedule a single event
app.post("/scheduleEvent",(req,res)=>{
    try{
        initScheduler(req.body);
        res.send("Successfully scheduled the event.")
    } catch(err){
        if(err.message=="IDF"){
            const msg = "Invalid Date Format!";
            console.log(msg);
            return res.status(400).send(msg);
        }
        console.log(err.message);
        res.status(500).send("An error occured while trying to schedule the event.")
    }
})

//to schedule multiple events at once
app.post("/scheduleEvents",(req,res)=>{
    try{
        initSchedulers(req.body);
        res.send("Successfully scheduled the events.")
    } catch(err){
        if(err.message=="IDF"){
            const msg = "Invalid Date Format!";
            console.log(msg);
            return res.status(400).send(msg);
        }
        console.log(err.message);
        res.status(500).send("An error occured while trying to schedule the event.")
    }
})

app.listen(PORT,()=>{
    console.log("Listening on PORT "+ PORT)
})