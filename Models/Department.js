const con = require('../Config/dbConnection');

// add department
const addDep =async (name)=>{
    const sql= 'INSERT INTO departments (name) VALUES(?)';
    try {
        const [result] = await con.query(sql,[name]);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

//get departments 
const getDep =async ()=>{
    const sql= 'SELECT * FROM departments ORDER BY `id` DESC';
    try {
        const [result] = await con.query(sql);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}
//delete departments 
const delDep =async (id)=>{
    const sql= 'DELETE FROM departments WHERE id=?';
    try {
        const [result] = await con.query(sql,[id]);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}
module.exports = {addDep,getDep,delDep}