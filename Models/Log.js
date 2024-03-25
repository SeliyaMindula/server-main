const con = require('../Config/dbConnection');

//create log
const createLog = async(data)=>{
    const {activity,email,ip,activityBy} = data;
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is zero-based
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const logEntry = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    const values = [activity,email,ip,activityBy,logEntry];

    const sql = "INSERT INTO log (activity,email,ip,activity_by,date) VALUES(?,?,?,?,?)";
    try {
        const [result] = await con.query(sql,values);
        return result;
    } catch (error) {
        console.log(error);

    }
}

//get all log
const getAllLogs =async()=>{
    const sql = "SELECT * FROM log ORDER BY `id` DESC";
    try {
        const [result] = await con.query(sql);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//filter logs by date range
const getLogsByDate= async(range)=>{
    const {parsedStartDate,parsedEndDate} = range;
    
    const sql = `SELECT * FROM log WHERE date BETWEEN '${parsedStartDate.toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, '')}' AND '${parsedEndDate.toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, '')}'`;

    console.log(sql)
    try {
        const [result] =await con.query(sql);
        return result;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {createLog,getAllLogs,getLogsByDate}