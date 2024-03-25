const Venue = require('../Models/Venue');
const asyncHandler = require('express-async-handler');
const { convertImageToBase64 } = require('../MiddleWare/ConvertImage');
const { DeleteFile } = require('../MiddleWare/Delete');

// venue add
const create = asyncHandler(async (req, res) => {
    const { name, desc, pax, stage, floor, ceiling, type, refundable_deposit, advance_payment } = req.body;
    const facilities = JSON.parse(req.body.facilities);
    const thumbnail = req.files['thumbnail'][0];
    const gallery = req.files['gallery'] || [];
    const floorPlan = req.files['floorPlan'][0];
    const thumbFilename = thumbnail ? thumbnail.filename : '';
    const galleryFilenames = gallery.map(file => file.filename).join('|');
    const floorPlanFilename = floorPlan ? floorPlan.filename : '';
    const values = {
        name, desc, thumbnail: thumbFilename, gallery: galleryFilenames, pax, stage, floor, ceiling, type, floorPlan: floorPlanFilename, facilities, refundable_deposit, advance_payment
    };



    try {
        const result = await Venue.cerate(values);
        if (result.insertId) {
            res.status(200).json({ message: 'New venue creation successfully!' });
            return
        }
        res.status(400).json({ error: 'New venue creation error!' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error!' });
    }

});

//get all venues
// const getAllVenues = asyncHandler(async (req, res) => {

//     try {
//         const result = await Venue.getAllVenues();
//         const thumbnails = result.map(item => [{ id: item.id, thumbnail: convertImageToBase64(item.thumbnail, 'venue') }]);
//         if (Array.isArray(result)) {
//             res.json([result, thumbnails]);
//             return
//         }
//         res.status(400).json({ error: 'Data fetching error!' });
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ error: 'Internal server error!' });
//     }


// });

const getAllVenues = asyncHandler(async (req, res) => {
    const result = await Venue.getAllVenues();
    console.log(result);
    if (Array.isArray(result)) {
        res.status(200).json(result);
    }
    else {
        res.status(400).json({ error: 'Data fetching error!' });
    }
})

//get venue by id
// const getVenueById = asyncHandler(async (req, res) => {
//     const id = req.params.id;
//     try {
//         const result = await Venue.getVenueById(id);

//         if (Array.isArray(result)) {
//             const thumbnails = result.map(item => [convertImageToBase64(item.thumbnail, 'venue')]);
//             const imageGallery = result[0].gallery ? result[0].gallery.split('|') : [];
//             const gallery = imageGallery.map(item => convertImageToBase64(item, 'venue'));
//             const floorPlan = convertImageToBase64(result[0].floor_plan, 'venue');
//             res.json({
//                 result: result,
//                 gallery: gallery,
//                 floorPlan: floorPlan,
//                 thumbnails: thumbnails
//             });
//             return
//         }
//         res.status(400).json({ error: 'Data fetching error!' });
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ error: 'Internal server error!' });
//     }
// });

const getVenueById = async(req, res) => {
    const { id } = req.params;
    const result = await Venue.getVenueById(id);
    
    res.status(200).json(result);
    
    
    // else {
    //     res.status(400).json({ error: 'Data fetching error!' });
    // }
}

// venue update
const update = asyncHandler(async (req, res) => {
    const { name, desc, pax, stage, floor, ceiling, type, } = req.body;

    const facilities = JSON.parse(req.body.facilities);
    const id = req.params.id;
    const thumbnail = req.files && req.files['thumbnail'] ? req.files['thumbnail'][0] : null;
    const gallery = req.files && req.files['gallery'] ? req.files['gallery'] : null;
    const floorPlan = req.files && req.files['floorPlan'] ? req.files['floorPlan'][0] : null;

    const thumbFilename = req.files && thumbnail ? thumbnail.filename : null;
    const galleryFilenames = req.files && gallery ? gallery.map(file => file.filename).join('|') : null;
    const floorPlanFilename = req.files && floorPlan ? floorPlan.filename : null;


    try {
        const venueResult = await Venue.getVenueById(id);


        const values = {
            id,
            name: name || venueResult[0].name,
            desc: desc || venueResult[0].description,
            thumbnail: thumbFilename || venueResult[0].thumbnail,
            gallery: galleryFilenames || venueResult[0].gallery,
            pax: pax === null ? pax : venueResult[0].capacity,
            stage: stage === null ? stage : venueResult[0].stage,
            floor: floor === null ? floor : venueResult[0].floor_area,
            ceiling: ceiling === null ? ceiling : venueResult[0].ceiling_height,
            type: type === null ? type : venueResult[0].venue_type,
            floorPlan: floorPlanFilename || venueResult[0].floor_plan,
            facilities: { foc: facilities.foc || venueResult.foc, chargeable: facilities.chargeable || venueResult.chargeable }
        };

        const result = await Venue.update(values);

        if (result === 1) {
            res.status(200).json({ message: 'New venue update successfully!' });
            return
        }
        res.status(400).json({ error: ' venue update error!' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error!' });
    }

});

//delete venue
const del = asyncHandler(async (req, res) => {
    const id = req.params.id;

    try {

        const venue = await Venue.getVenueById(id);
        // const gallery = venue[0].gallery
        const thumbnail = venue[0].thumbnail;
        // const floorPlan = venue[0].floor_plan;

        const { result } = await Venue.del(id);

        if (result.affectedRows === 1) {

            // delete gallery images
            // const galleryImageDeleteResult = await DeleteFile(gallery, 'venue');
            // if (!galleryImageDeleteResult) {
            //     console.log('Gallery image deleting error!');
            // }

            // delete thumbnail
            const thumbnailDeleteResult = await DeleteFile(thumbnail, 'venue');
            if (!thumbnailDeleteResult) {
                console.log('Thumbnail deleting error!');
            }

            // delete floor plan
            // const floorPlanDeleteResult = await DeleteFile(floorPlan, 'venue');
            // if (!floorPlanDeleteResult) {
            //     console.log('Floor plan deleting error!');
            // }

            res.status(200).json({ message: 'Deleting successfully!' });
            return
        }
        res.status(400).json({ error: "Venue deleting error" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error!" });
    }
});


const SaveBasicVenueData = async (req, res, next) => {
    const { venue_name, description, pax, stage_size, floor_area, ceiling_height, venue_type, refundable_deposit, advance_payment, cancelation_fee } = req.body;

    if (!venue_name || !description || !pax || !stage_size || !floor_area || !ceiling_height || !venue_type || !refundable_deposit || !advance_payment || !cancelation_fee) {
        res.status(400).json({ error: 'All fields are required!' });
        return;
    }

    const venueData = [venue_name, description, pax, stage_size, floor_area, ceiling_height, venue_type, refundable_deposit, advance_payment, cancelation_fee];

    const result = await Venue.CreateVenueAddingBasicData(venueData);

    if (result.insertId) {
        res.status(200).json({ message: 'Venue basic data saved successfully!', id: result.insertId });
        return;
    }
    res.status(400).json({ error: "Can't save venue data!" });

}

const SaveVenueImage = async (req, res, next) => {
    const venueId = req.params.id;

    const thumbnail = req.files['thumbnail'][0];

    // validate
    if (!thumbnail) {
        res.status(400).json({ error: 'Image is required!' });
        return;
    }

    // file size validate
    if (thumbnail.size > 1000000) {
        res.status(400).json({ error: 'Image size should be less than 1MB!' });
        return;
    }

    // file type validate
    if (thumbnail.mimetype !== 'image/jpeg' && thumbnail.mimetype !== 'image/png') {
        res.status(400).json({ error: 'Image type should be jpeg or png!' });
        return;
    }

    const thumbnailName = thumbnail.filename;

    const data = {
        thumbnail: thumbnailName
    }

    const result = await Venue.SaveVenueImages(venueId, data);

    console.log(result);

    if (result.affectedRows) {
        res.status(200).json({ message: 'Image saved successfully!' });
        return;
    }
    res.status(400).json({ error: "Can't save image!" });

}

const AddVenueOptions = async (req, res, next) => {
    const { id } = req.params;
    let { options } = req.body;

    console.log(options);

    try{
        options = JSON.parse(options).map(item => {
            return {
                ...item,
                venue_id: id
            }
        })
    
        console.log(options);
    
        // [
        //     {
        //       title: 'sxascc',
        //       initial_booking_hours: 2,
        //       price_per_additional_hour: 2,
        //       max_booking_hours: 12,
        //       book_with_another_option: 'true',
        //       different_prices: true,
        //       different_date_price_Fri_Sat_Sun: 22,
        //       different_date_price_Tue_Wed_Thu: 20,
        //       different_date_price_Mon: 22,
        //       venue_id: '78'
        //     }
        //   ]
    
        const result = await Venue.SaveVenueOptions(options);
    
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Venue options saved successfully!' });
            return;
        }
        res.status(400).json({ error: "Can't save venue options!" });
    }
    catch(err){
        console.log(err);
        res.status(400).json({ error: "Can't save venue options!" });
    }

}

const AddVenueAddons = async (req, res, next) => {
    const { id } = req.params;
    let { addons } = req.body;

    addons = JSON.parse(addons).map(item => {
        return {
            ...item,
            venue_id: id
        }
    })

    const result = await Venue.SaveVenueAddons(addons, id);

    if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Venue add-ons saved successfully!' });
        return;
    }
    res.status(400).json({ error: "Can't save venue add-ons!" });

}

const UpdateBasicData = async (req, res, next) => {
    const {name, description, capacity, stage, floor_area, ceiling_height, refundable_deposit, advance_payment, cancelation_fee, venue_type} = req.body;

    const id = req.params.id;

    if(!name || !description || !capacity || !stage || !floor_area || !ceiling_height || !refundable_deposit || !advance_payment || !cancelation_fee || !venue_type){
        res.status(400).json({error: 'All fields are required!'});
        return;
    }

    const data = {
        name, description, capacity, stage, floor_area, ceiling_height, refundable_deposit, advance_payment, cancelation_fee, venue_type
    }

    try{
        const result = await Venue.UpdateBasicData(data, id);
        if(result.affectedRows){
            res.status(200).json({message: 'Basic data updated successfully!'});
            return;
        }

        res.status(400).json({error: "Can't update basic data!"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error!'});
    }
}

const UpdateOption = async (req, res, next) => {
    const {title, initial_booking_hours, price_per_additional_hour, book_with_another_option, fri_sat_sun, tue_wed_thu, mon } = req.body;

    // return console.log({title, initial_booking_hours, price_per_additional_hour, book_with_another_option, fri_sat_sun, tue_wed_thu, mon});

    if(!title || !initial_booking_hours || !price_per_additional_hour || !typeof(book_with_another_option)==='undefined' || !fri_sat_sun || !tue_wed_thu || !mon){
        res.status(400).json({error: 'All fields are required!'});
        return;
    }

    const id = req.params.id;

    const data = {
        title, initial_booking_hours, price_per_additional_hour, book_with_another_option, fri_sat_sun, tue_wed_thu, mon
    }

    try{
        const result = await Venue.UpdateOption(data, id);
        if(result.affectedRows){
            res.status(200).json({message: 'Option updated successfully!'});
            return;
        }

        res.status(400).json({error: "Can't update option!"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error!'});
    }
}

const DeleteOption = async(req, res) => {
    const id = req.params.id;

    try{
        const result = await Venue.DeleteOption(id);
        if(result.affectedRows>0){
            res.status(200).json({message: 'Option deleted successfully!'});
            return;
        }

        res.status(400).json({error: "Can't delete option!"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error!'});
    }
}


const DeleteAddon = async(req, res) => {
    const id = req.params.id;

    try{
        const result = await Venue.DeleteAddon(id);
        if(result.affectedRows>0){
            res.status(200).json({message: 'Add-on deleted successfully!'});
            return;
        }

        res.status(400).json({error: "Can't delete add-on!"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error!'});
    }

}

const UpdateAddons = async(req, res) => {
    const {addon_name, addon_description, cost} = req.body;

    if(!addon_name || !addon_description || !cost){
        res.status(400).json({error: 'All fields are required!'});
        return;
    }

    const id = req.params.id;

    const data = {
        addon_name, addon_description, cost
    }

    try{
        const result = await Venue.UpdateAddons(data, id);
        if(result.affectedRows){
            res.status(200).json({message: 'Add-on updated successfully!'});
            return;
        }

        res.status(400).json({error: "Can't update add-on!"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: 'Internal server error!'});
    }
}


module.exports = { create, DeleteAddon, UpdateAddons, DeleteOption, getAllVenues, UpdateOption, UpdateBasicData, getVenueById, update, del, SaveBasicVenueData, SaveVenueImage, AddVenueOptions, AddVenueAddons }