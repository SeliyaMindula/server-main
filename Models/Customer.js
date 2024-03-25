const con = require('../Config/dbConnection');

const GetUserByEmail = async (email) => {
    try {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await con.execute(sql, [email]);
        return rows;
    } catch (error) {
        console.log(error);
        return { error: error }
    }
}

const CreateCustomer = async (name, email, password, role) => {
    console.log({ name, email, password, role });
    try {
        const sql = 'INSERT INTO users (full_name, email, passwd, role) VALUES (?,?,?,?)';
        const [rows] = await con.execute(sql, [name, email, password, role]);
        return rows;
    } catch (error) {
        console.log(error);
        return { error: error }
    }
}

const SaveToken = async (token, id) => {
    try {
        const sql = 'UPDATE users SET token = ? WHERE id = ?';
        const [rows] = await con.execute(sql, [token, id]);
        return rows;
    } catch (error) {
        console.log(error);
        return { error: error }
    }
}

// const GetVenues = async (venue_type, start_date, end_date, filter) => {

//     // console.log(venue_type);
//     const sql_get_venue = `SELECT * FROM venue`;
//     const sql_get_min_const = `
//     SELECT MIN(min_const) AS overall_min_const
//     FROM (
//         SELECT LEAST(fri_sat_sun, tue_wed_thu, mon) AS min_const
//         FROM booking_option
//         WHERE venue_id = ? AND book_with_another_option <> 1
//     ) AS subquery;
// `;


//     try {
//         let [rows] = await con.execute(sql_get_venue);
//         console.log("rows", rows);

//         if (venue_type !== 'all') {
//             rows = rows.filter(row => {
//                 return row.venue_type.includes(venue_type);
//             })
//         }

//         // 
//         const with_min_cost = await Promise.all(rows.map(async row => {
//             const [rows] = await con.execute(sql_get_min_const, [row.id]);
//             return { ...row, min_const: rows[0].overall_min_const };
//         }))


//         return with_min_cost;
//     } catch (error) {
//         console.log(error);
//         return { error: error }
//     }
// }

// const GetVenues = async (venue_type, start_date, end_date, filter) => {
//     const sql_get_venue = `SELECT * FROM venue`;
//     const sql_get_min_const = `
//     SELECT
//         CASE
//             WHEN WEEKDAY(?) IN (0) THEN mon
//             WHEN WEEKDAY(?) IN (1, 2, 3) THEN LEAST(mon, tue_wed_thu)
//             WHEN WEEKDAY(?) IN (4, 5, 6) THEN fri_sat_sun
//             ELSE LEAST(mon, tue_wed_thu, fri_sat_sun)
//         END AS min_const
//     FROM booking_option
//     WHERE venue_id = ? AND book_with_another_option <> 1`;


//     try {
//         let [rows] = await con.execute(sql_get_venue);
//         console.log("rows", rows);

//         if (venue_type !== 'all') {
//             rows = rows.filter(row => row.venue_type.includes(venue_type));
//         }

//         const with_min_cost = await Promise.all(rows.map(async row => {
//             const [rows] = await con.execute(sql_get_min_const, [start_date, end_date, row.id]);
//             return { ...row, min_const: rows[0].min_const };
//         }));

//         return with_min_cost;
//     } catch (error) {
//         console.log(error);
//         return { error: error }
//     }
// }

// const GetVenues = async (venue_type, start_date, end_date, filter) => {
//     const sql_get_venue = `SELECT * FROM venue`;
//     const sql_get_min_const = `
//         SELECT
//             CASE
//                 WHEN WEEKDAY(?) IN (0) THEN mon
//                 WHEN WEEKDAY(?) IN (0, 1, 2, 3) THEN LEAST(mon, tue_wed_thu)
//                 WHEN WEEKDAY(?) IN (1, 2, 3, 4, 5, 6) THEN LEAST(tue_wed_thu,fri_sat_sun)
//                 WHEN WEEKDAY(?) IN (1, 2, 3) THEN tue_wed_thu
//                 WHEN WEEKDAY(?) IN (4, 5, 6) THEN fri_sat_sun
//                 ELSE LEAST(mon, tue_wed_thu, fri_sat_sun)
//             END AS min_const
//         FROM booking_option
//         WHERE venue_id = ? AND book_with_another_option <> 1
//     `;

//     try {
//         let [rows] = await con.execute(sql_get_venue);
//         console.log("rows", rows);

//         if (venue_type !== 'all') {
//             rows = rows.filter(row => row.venue_type.includes(venue_type));
//         }

//         const with_min_cost = await Promise.all(rows.map(async row => {
//             const [rows] = await con.execute(sql_get_min_const, [start_date, start_date, end_date, end_date, end_date, row.id]);
//             return { ...row, min_const: rows[0].min_const };
//         }));

//         return with_min_cost;
//     } catch (error) {
//         console.log(error);
//         return { error: error }
//     }
// }

const GetVenues = async (venue_type, start_date, end_date, filter) => {
    const sql_get_venue = `SELECT * FROM venue`;
    const sql_get_all_rates = `
        SELECT
            mon, tue_wed_thu, fri_sat_sun
        FROM booking_option
        WHERE venue_id = ? AND book_with_another_option <> 1
    `;

    try {
        let [rows] = await con.execute(sql_get_venue);

        if (venue_type !== 'all') {
            rows = rows.filter(row => row.venue_type.includes(venue_type));
        }

        const with_all_rates = await Promise.all(rows.map(async row => {
            const [rates] = await con.execute(sql_get_all_rates, [row.id]);
            return { ...row, rates: rates[0] };
        }));

        return with_all_rates;
    } catch (error) {
        console.log(error);
        return { error: error }
    }
}





const GetVenueByID = async (id) => {
    try {
        const sql = 'SELECT * FROM venue WHERE id = ?';
        const [rows] = await con.execute(sql, [id]);
        return rows;
    } catch (error) {
        console.log(error);
        return { error: error }
    }
}


// 

const SaveBasicBookingData = async (data, uniqueRandomNumber) => {
    // console.log(data);



    const _data = [uniqueRandomNumber, ...data]

    try {
        const sql = 'INSERT INTO booking(booking_id, name_of_organization_individual, refund_drawn, contact_person, video_wall, event_type, setup, meal_plan, public_performance_approval, chief_guest, number_of_guests, VAT_registration_no, vat_copy, venue_id, booking_data) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        const [rows] = await con.execute(sql, _data);
        return rows;
    }
    catch (error) {
        console.log(error);
        return { error: error }
    }
}

const BookingOptionWithAddons = async (data) => {
    // console.log('DATA', data);
    // return
    try {
        const sql = 'INSERT INTO option_booking(booking_id, option_id, option_title, addons, cost, start_time, end_time, date) VALUES (?,?,?,?,?,?,?,?)';
        const [rows] = await con.execute(sql, data);
        return rows;
    }
    catch (error) {
        console.log(error);
        return { error: error }
    }
}



module.exports = { GetUserByEmail, BookingOptionWithAddons, SaveBasicBookingData, CreateCustomer, SaveToken, GetVenues, GetVenueByID }