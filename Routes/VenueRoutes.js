const express = require('express');
const router = express.Router();
const { create, getAllVenues, getVenueById, update, del, SaveBasicVenueData, SaveVenueImage, AddVenueOptions, AddVenueAddons, UpdateBasicData, UpdateOption, DeleteOption, UpdateAddons, DeleteAddon } = require('../Controllers/VenueController');
const { upload2 } = require('../MiddleWare/Uploads');
const { ADMIN_SESSION_URL } = require('../Config');

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ADMIN_SESSION_URL); // Note: '*' should be replaced with the specific origin during production.
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

router.options('*', (req, res) => {
  res.sendStatus(200)
});


// router.route('/:id')
//   .get(getVenueById)
//   // .put(upload2.fields([
//   //   { name: 'thumbnail', maxCount: 1 },
//   //   { name: 'gallery' },
//   //   { name: 'floorPlan', maxCount: 1 },
//   // ]), update)

//   .delete(del);

router.route('/')
  .post(upload2.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'gallery' },
    { name: 'floorPlan', maxCount: 1 },
  ]), create)
  .get(getAllVenues);

  // 
  router.get('/:id', getVenueById)
  router.post('/basic-data', SaveBasicVenueData)
  router.post('/gallery/:id', upload2.fields([{ name: 'thumbnail', maxCount: 1 }]) , SaveVenueImage)
  router.post('/option/:id', AddVenueOptions)
  router.post('/addons/:id', AddVenueAddons)
  
  router.put('/basic-data/:id', UpdateBasicData)
  router.put('/option/:id', UpdateOption)
  router.put('/addon/:id', UpdateAddons)

  router.delete('/:id', del)
  router.delete('/option/:id', DeleteOption)
  router.delete('/addon/:id', DeleteAddon)

module.exports = router;