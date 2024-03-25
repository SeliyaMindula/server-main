const con = require('../Config/dbConnection');


// create venue
const cerate = async (data) => {

    const { name, desc, thumbnail, gallery, pax, stage, floor, ceiling, type, floorPlan, facilities, refundable_deposit, advance_payment } = data;
    const venueData = [name, thumbnail, desc, gallery, pax, stage, floor, ceiling, type, floorPlan, refundable_deposit, advance_payment];

    const sql = `INSERT INTO venue(name,thumbnail,description,gallery,capacity,stage,floor_area,ceiling_height,venue_type,floor_plan,refundable_deposit,advance_payment)
                    VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`;

    try {
        const [result] = await con.query(sql, venueData);

        const lastInsertId = result.insertId;
        // Insert facilities
        await con.query('INSERT INTO facilities(venue_id, foc,chargeable) VALUES (?,?,?)', [lastInsertId, facilities.foc, facilities.chargeable]);


        return result;
    } catch (error) {
        console.log(error);
        return error;
    }

}

const CreateVenueAddingBasicData = async (data) => {

    const sql = `INSERT INTO venue(name, description, capacity, stage, floor_area, ceiling_height, venue_type, refundable_deposit, advance_payment, cancelation_fee) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    try {
        const [result] = await con.query(sql, data);
        return result;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}
const SaveVenueImages = async (venueId, data) => {
    const { thumbnail } = data;
    const sql = 'UPDATE venue SET thumbnail=? WHERE id=?';
    const pass = [thumbnail, venueId];
    try {
        const [result] = await con.query(sql, pass);
        return result;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}


const SaveVenueOptions = async (options) => {
    try {
        const values = options.map(
            (option) =>
                `('${option.title}', ${option.initial_booking_hours}, ${option.price_per_additional_hour}, ${option.max_booking_hours}, ${option.book_with_another_option}, ${option.venue_id}, ${option.different_date_price_Fri_Sat_Sun}, ${option.different_date_price_Tue_Wed_Thu}, ${option.different_date_price_Mon})`
        );

        const query = `INSERT INTO booking_option (title, initial_booking_hours, price_per_additional_hour, max_booking_hours, book_with_another_option, venue_id, fri_sat_sun, tue_wed_thu, mon) VALUES ${values.join(',')}`;

        const [result] = await con.execute(query);
        return result;
    } catch (error) {
        console.error(error);
        return error;
    }
};

const SaveVenueAddons = async (addons, id) => {
    try {
        const values = addons.map(
            (addon) =>
                `('${addon.venue_id}', '${addon.add_ons_name}', '${addon.add_ons_description}','${addon.cost}','${addon.max_qty}')`
        );

        const query = `INSERT INTO add_ons (venue_id, add_ons_name, add_ons_description, cost, max_qty) VALUES ${values.join(',')}`;

        const [result] = await con.execute(query);
        return result;
        // // venue activate
        // const sql = 'UPDATE venue SET active = 1 WHERE id = ?';
        // const [result2] = await con.execute(sql, [id]);

        // if(result2.affectedRows === 0){
        //     throw new Error('Venue not activated');
        // }else{
        //     return result;
        // }
    } catch (error) {
        console.error(error);
        return error;
    }
};




//get all venue
const getAllVenues = async () => {
    const sql = 'SELECT * FROM venue';

    try {
        const [result] = await con.query(sql);

        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}
//get venue by id
// const getVenueById = async (id) => {
//     const sql = 'SELECT venue.*, facilities.* FROM venue LEFT JOIN facilities ON venue.id = facilities.venue_id WHERE venue.id = ?';
//     try {
//         const [result] = await con.query(sql, [id]);
//         return result;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

const getVenueById = async (id) => {
    let venue_data = {
        basic: {},
        add_ons: [],
        options: []
    };
    const sql = 'SELECT * FROM venue WHERE id = ?';
    const sql2 = 'SELECT * FROM add_ons WHERE venue_id = ?';
    const sql3 = 'SELECT * FROM booking_option WHERE venue_id = ?';
    try {
        const [result] = await con.query(sql, [id]);
        venue_data.basic = result[0];

        const [result2] = await con.query(sql2, [id]);
        venue_data.add_ons = result2;

        const [result3] = await con.query(sql3, [id]);
        venue_data.options = result3;


        return venue_data;

    } catch (error) {
        console.log(error);
        return error;
    }

}

//update venue details
const update = async (data) => {
    const { id, name, desc, thumbnail, gallery, pax, stage, floor, ceiling, type, floorPlan, facilities } = data;
    const venueData = [name, thumbnail, desc, gallery, pax, stage, floor, ceiling, type, floorPlan, id];
    const sql = `UPDATE venue SET
                name=?, thumbnail=?, description=?,gallery=?, capacity=?, stage=?, floor_area=?, ceiling_height=?,
                venue_type=?, floor_plan=? WHERE id=?`;
    const sql2 = 'UPDATE facilities SET foc=?, chargeable=?  WHERE venue_id=?';

    try {
        const [result] = await con.query(sql, venueData);

        await con.query(sql2, [facilities.foc, facilities.chargeable, id]);

        return result.affectedRows;
    } catch (error) {
        console.error('Error in update:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }
};

//delete
const del = async (id) => {
    const sql = 'DELETE FROM venue WHERE id=?';
    const sql2 = 'DELETE FROM facilities WHERE venue_id=?';

    try {
        const [result] = await con.execute(sql, [id]);
        await con.query(sql2, [id]);
        return { result };
    } catch (error) {
        console.error('Error in del:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }
};

const UpdateBasicData = async (data, id) => {
    const { name, description, capacity, stage, floor_area, ceiling_height, refundable_deposit, advance_payment, cancelation_fee, venue_type } = data;
    const sql = 'UPDATE venue SET name=?, description=?, capacity=?, stage=?, floor_area=?, ceiling_height=?, refundable_deposit=?, advance_payment=?, cancelation_fee=?, venue_type=? WHERE id=?';

    try {
        const [result] = await con.execute(sql, [name, description, capacity, stage, floor_area, ceiling_height, refundable_deposit, advance_payment, cancelation_fee, venue_type, id]);
        return result;
    }
    catch (error) {
        console.error('Error in UpdateBasicData:', error);
        throw error;
    }
}

const UpdateOption = async (data, id) => {
    const { title, initial_booking_hours, price_per_additional_hour, book_with_another_option, fri_sat_sun, tue_wed_thu, mon } = data;
    const sql = 'UPDATE booking_option SET title=?, initial_booking_hours=?, price_per_additional_hour=?, book_with_another_option=?, fri_sat_sun=?, tue_wed_thu=?, mon=? WHERE option_id=?';


    // return console.log([title, initial_booking_hours, price_per_additional_hour, book_with_another_option, fri_sat_sun, tue_wed_thu, mon, id]);

    try {
        const [result] = await con.execute(sql, [title, initial_booking_hours, price_per_additional_hour, book_with_another_option, fri_sat_sun, tue_wed_thu, mon, id]);
        return result;
    }
    catch (error) {
        console.error('Error in UpdateOption:', error);
        throw error;
    }
}

const DeleteOption = async (id) => {
    const sql = 'DELETE FROM booking_option WHERE option_id=?';
    try {
        const [result] = await con.execute(sql, [id]);
        return result;
    }
    catch (error) {
        console.error('Error in DeleteOption:', error);
        throw error;
    }

}

const DeleteAddon = async (id) => {
    const sql = 'DELETE FROM add_ons WHERE add_ons_id=?';
    try {
        const [result] = await con.execute(sql, [id]);
        return result;
    }
    catch (error) {
        console.error('Error in DeleteAddon:', error);
        throw error;
    }

}

const UpdateAddons = async (data, id) => {
    const { addon_name, addon_description, cost } = data;

    // return console.log({addon_name, addon_description, cost, id});
    const sql = 'UPDATE add_ons SET add_ons_name=?, add_ons_description=?, cost=? WHERE add_ons_id=?';

    try {
        const [result] = await con.execute(sql, [addon_name, addon_description, cost, id]);
        return result;
    }
    catch (error) {
        console.error('Error in UpdateAddons:', error);
        throw error;
    }

}

module.exports = { cerate, DeleteAddon, UpdateAddons, DeleteOption, getAllVenues, UpdateOption, UpdateBasicData, getVenueById, update, del, CreateVenueAddingBasicData, SaveVenueImages, SaveVenueOptions, SaveVenueAddons }