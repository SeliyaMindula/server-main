const Log = require('../Models/Log');
const asyncHandler = require('express-async-handler');

//create log

//get all logs
const getLogs = asyncHandler(async(req,res)=>{
    
    try {
        const result = await Log.getAllLogs();
        if(result){
            res.status(200).json(result);
            return
        }
        res.status(400).json({error:"Log fetching error"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error!"});
    }
});
//get all logs by filter
const getLogsByDate = asyncHandler(async(req,res)=>{
    const {startDate,endDate}=req.query;
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    const range = {parsedStartDate,parsedEndDate}
    console.log(range)
    try {
        const result = await Log.getLogsByDate(range);
        if(result){
            res.status(200).json(result);
            return
        }
        res.status(400).json({error:"Log fetching error"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error!"});
    }
});



module.exports = {getLogs,getLogsByDate}