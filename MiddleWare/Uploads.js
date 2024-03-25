const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup storage and destination
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = path.join(__dirname, 'Uploads','users');


        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create multer instance


// for venue
const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = './Uploads/venue/';

        cb(null, destinationPath);
        // Specify the correct folder path here
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const storage3 = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = './Uploads/vatimg/';

        cb(null, destinationPath);
        // Specify the correct folder path here
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});



const upload = multer({ storage: storage });
const upload2 = multer({ storage: storage2 });
const upload3 = multer({ storage: storage3 });





module.exports={upload,upload2,upload3};