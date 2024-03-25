const express  = require('express');
const router = express.Router();
const path = require('path');


router.get('/venue-image/:name', (req, res) => {
    const { name } = req.params;

    const imagePath = path.join(__dirname, '../Uploads/venue', name);  // Correct the path to your image directory

    // Send the image file
    res.sendFile(imagePath, (err) => {
        if (err) {
            // Handle error, for example, send a 404 status
            res.status(404).send('Image not found');
        }
    });
})


module.exports = router