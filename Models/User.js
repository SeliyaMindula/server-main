const con = require('../Config/dbConnection');

// add user
const addUser = (user)=>{
    const {email,role,department,status,token,createdAt}=user;
    const values = [email,role,department,status,token,createdAt];
    const sql = 'INSERT INTO users (email,role,department,status,token,created_at) VALUES(?,?,?,?,?,?)';
    return new Promise(async(resolve,reject)=>{
        try {
            const [result] = await con.query(sql,values);
            resolve(result.insertId);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}
//check email 
const isEmail=async(email)=>{
    const sql = 'SELECT COUNT(*) as count FROM users WHERE email = ?'
    const [rows] = await con.execute(sql,[email]);
    if(rows[0].count>0){
        
        return true;
    }else
        return false;
}

//get user token
const getToken=async(id)=>{
    try {
        const sql = 'SELECT token from users WHERE id =?';
        const [result] = await con.query(sql,[id]);
        return result;
    } catch (error) {
        console.log(error);
        return {error:error}
    }
}

// is account active
const isActive =async (id)=>{
    try {
        const [rows] = await con.execute('SELECT status FROM users WHERE id = ?', [id]);
        
        if (rows.length > 0) {
          const status = rows[0].status;
          return status === 'pending';
        } else {
          // User with the given ID not found
          return false;
        }
    } catch (error) {
        console.error('Error checking user status:', error.message);
        throw error; // 
    }
}

// create user profile
const createAccount =(user)=>{
    const {username,fullName,emp_no,passwd,image,status,id}=user;
    const values =[username,fullName,emp_no,passwd,image,status,id];
    const sql ='UPDATE users SET username=?,full_name=?,emp_no=?,passwd=?,image=?,status=? WHERE id=?'
    return new Promise(async(resolve,reject)=>{
        try {
            const [result]= await con.query(sql,values);
            resolve(result.affectedRows);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}
// get single user by token
const getUser=async(token)=>{
    try {
        const sql = 'SELECT * from users WHERE token =?';
        const [result] = await con.query(sql,[token]);
        return result;
    } catch (error) {
        console.log(error);
        return {error:error}
    }
}

// get all users
const getUsers = async()=>{
    const sql = 'SELECT * FROM users';
    try {
        const [result]= await con.execute(sql);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
// get all users
const getActiveUsers = async()=>{
    const sql = "SELECT * FROM users WHERE status='active'";
    try {
        const [result]= await con.execute(sql);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
// get all users
const getPendingUsers = async()=>{
    const sql = "SELECT * FROM users WHERE status='pending'";
    try {
        const [result]= await con.execute(sql);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
// get all users
const getInactiveUsers = async()=>{
    const sql = "SELECT * FROM users WHERE status='inactive'";
    try {
        const [result]= await con.execute(sql);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//change status
const changeStatus =async(data)=>{
    const sql ="UPDATE users SET status=? WHERE id=?"
    const {status,id} =data;
    const values=[status,id];
    try {
        const [result] = await con.query(sql,values);
        return result.affectedRows;
    } catch (error) {
        console.log(error);

    }
}

//get user by id
const getUserById =async(id)=>{
    try {
        const sql = 'SELECT * from users WHERE id =?';
        const [result] = await con.query(sql,[id]);
        return result;
    } catch (error) {
        console.log(error);
        return {error:error}
    }
}

//user login
const userLogin = async(email) => {
    try {
        const sql = 'SELECT * from users WHERE email =?';
        const [result] = await con.query(sql,[email]);
        return result;
    } catch (error) {
        console.log(error);
        return {error:error}
    }
};

//update user
const updateAccount =(user)=>{
    const {username,full_name,contact,email,department,image,id}=user;
    const values =[username,full_name,contact,email,department,image,id];
    const sql ='UPDATE users SET username=?,full_name=?,contact=?,email=?,department=?,image=? WHERE id=?'
    return new Promise(async(resolve,reject)=>{
        try {
            const [result]= await con.query(sql,values);
            resolve(result.affectedRows);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

//update password
const updatePassword =async (data)=>{
    const {password,id}=data;
    const values=[password,id];
    try {
        const sql = 'UPDATE users SET passwd=? WHERE id=?';
        const [result] = await con.query(sql,values);
        return result.affectedRows;
    } catch (error) {
        console.log(error);
        return {error:error}
    }
}
//get user by id
const getUserByEmail =async(email)=>{
    try {
        const sql = 'SELECT * from users WHERE email =?';
        const [result] = await con.query(sql,[email]);
        return result;
    } catch (error) {
        console.log(error);
        return {error:error}
    }
}

const GetAllBookingRequest = async () => {
    try {
        const sql = 'SELECT * FROM booking';
        const [rows] = await con.execute(sql);
        return rows;
    }
    catch (error) {
        console.log(error);
        return { error: error }
    }
}

const GetBookingFormData = async (id) => {
    try {
        const sql = 'SELECT * FROM booking WHERE booking_id = ?';
        const [rows] = await con.execute(sql, [id]);
        return rows;
    }
    catch (error) {
        console.log(error);
        return { error: error }
    }
}

const GetBookingPricing = async (id) => {
    try {
        const sql = 'SELECT * FROM option_booking WHERE booking_id = ?';
        const [rows] = await con.execute(sql, [id]);
        return rows;
    }
    catch (error) {
        console.log(error);
        return { error: error }
    }

}

module.exports={
    addUser,
    GetBookingPricing,
    GetAllBookingRequest,
    GetBookingFormData,
    isEmail,
    createAccount,
    getToken,
    isActive,
    getUser,
    getUsers,
    getActiveUsers,
    getPendingUsers,
    getInactiveUsers,
    changeStatus,
    getUserById,
    userLogin,
    updateAccount,
    updatePassword,
    getUserByEmail
}