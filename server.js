const express = require('express');
require('dotenv').config();
const promisePool = require('./Config/dbConnection');
const cors = require('cors');
const userRoute = require('./Routes/UserRoutes');
const path = require('path');

const commonRoutes = require('./Routes/CommonRoutes');
const depRoutes = require('./Routes/DepartmentRoutes');
const jobRoleRoutes = require('./Routes/JobRoleRoutes');
const logsRoute = require('./Routes/LogRoutes');
const adminRoutes = require('./Routes/AdminRoutes');
const venueRoutes = require('./Routes/VenueRoutes');
const CustomerRoutes = require('./Routes/CustomerRoutes');
const PublicRoutes = require('./Routes/PublicRoutes');
const app = express();
const port = process.env.PORT || 5000;

promisePool
  .getConnection()
  .then((connection) => {
    console.log('Database connection successful!');
    connection.release();
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req,res,next)=>{
//   console.log(`${req.method} ${req.url}`);
//   next();
// })


app.use('/api/users', userRoute);
app.use('/api/common', commonRoutes);
app.use('/api/departments', depRoutes);
app.use('/api/job-roles', jobRoleRoutes);
app.use('/api/logs', logsRoute);
app.use('/api/venues', venueRoutes);

app.use('/api/customer', CustomerRoutes);
app.use('/api/public', PublicRoutes);






// Serve views
app.use(express.static(path.join(__dirname, 'Views/customer')));
app.use(express.static(path.join(__dirname, 'Views/admin')));

app.get('/bmichadmin', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views/admin', 'index.html'));
})
app.get('/bmichadmin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views/admin', 'index.html'));
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views/customer', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
