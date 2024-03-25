const Dep = require('../Models/JobRole');
const asyncHandler = require('express-async-handler');

//add jobRoles
const addJobRole = asyncHandler(async(req,res)=>{
    const {role} = req.body;
    try {
        const result = await Dep.addRole(role);
        if(result.affectedRows ===1){
            res.status(200).json({message:"New job role adding successfully!"});
            return
        }
        res.status(400).json({error:"Job role adding error"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error!"});
    }
});
//get all jobRoles
const getJobRoles = asyncHandler(async(req,res)=>{
    
    try {
        const result = await Dep.getRole();
        if(result){
            res.status(200).json(result);
            return
        }
        res.status(400).json({error:"Job role fetching error"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error!"});
    }
});

//get all jobRoles
const delJobRoles = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    try {
        const result = await Dep.delRole(id);
        if(result.affectedRows===1){
            res.status(200).json(result);
            return
        }
        res.status(400).json({error:"Job role deleting error"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error!"});
    }
});

module.exports = {addJobRole,getJobRoles,delJobRoles}