const con = require('../Config/dbConnection');

// add department
const addRole =async (role)=>{
    const sql= 'INSERT INTO job_roles (role) VALUES(?)';
    try {
        const [result] = await con.query(sql,[role]);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

//get job_roles 
const getRole =async ()=>{
    const sql= 'SELECT * FROM job_roles ORDER BY `id` DESC';
    try {
        const [result] = await con.query(sql);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}
//delete job_roles 
const delRole =async (id)=>{
    const sql= 'DELETE FROM job_roles WHERE id=?';
    try {
        const [result] = await con.query(sql,[id]);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}
module.exports = {addRole,getRole,delRole}