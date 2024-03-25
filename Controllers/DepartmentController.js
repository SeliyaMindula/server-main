const Dep = require('../Models/Department');
const asyncHandler = require('express-async-handler');

//add departments
const addDep = asyncHandler(async(req,res)=>{
    const {name} = req.body;
    try {
        const result = await Dep.addDep(name);
        if(result.affectedRows ===1){
            res.status(200).json({message:"New department adding successfully!"});
            return
        }
        res.status(400).json({error:"Department adding error"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error!"});
    }
});
//get all departments
const getDeps = asyncHandler(async(req,res)=>{
    
    try {
        const result = await Dep.getDep();
        if(result){
            res.status(200).json(result);
            return
        }
        res.status(400).json({error:"Department fetching error"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error!"});
    }
});

//get all departments
const delDeps = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    try {
        const result = await Dep.delDep(id);
        if(result.affectedRows===1){
            res.status(200).json(result);
            return
        }
        res.status(400).json({error:"Department deleting error"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error!"});
    }
});

module.exports = {addDep,getDeps,delDeps}