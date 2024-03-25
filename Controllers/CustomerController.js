const asyncHandler = require('express-async-handler');
const { GetUserByEmail, CreateCustomer } = require("../Models/Customer");
const { ComparePassword, HashPassword } = require("../utility/Password");
const { GenerateResetToken } = require('../utility/token');
const User = require('../Models/User');
const Customer = require('../Models/Customer');
const { CUSTOMER_SESSION_URL } = require('../Config');
const sendMail = require('../MiddleWare/SendEmail');
const Venue = require('../Models/Venue');
const { v4: uuidv4 } = require('uuid');
const { json } = require('express');

// Initialize global and static incremental number
let incrementalNumber = 951;

const CustomerLogin = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Require email or password' });
  }
  if (email.trim() === '' || password.trim() === '') {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  if (email && password) {
    const user = await GetUserByEmail(email);
    if (user.length === 0) {
      // If the email is not found in the database, return an error message
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const compare = await ComparePassword(password, user[0].passwd);
    if (compare) {
      // If the email and password are correct, create a session and return the user details
      const { id, email, role } = user[0];
      req.session.user = user;
      res.status(200).json({ message: 'Login successful', user: { id, email, role } });
    } else {
      // If the email and password are invalid, return an error message
      res.status(400).json({ message: 'Invalid email or password' });
    }

  } else {
    // If the email and password are invalid, return an error message
    res.status(400).json({ message: 'Invalid email or password' });
  }
})

const customerCheckAuth = (req, res) => {
  if (req.session.user) {
    console.log(req.session.user[0]);
    res.status(200).json({ message: 'Authenticated', user: req.session.user[0] });
  } else {
    res.status(400).json({ message: 'Unauthenticated' });
  }
}

const Logout = asyncHandler(async (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: 'Logged out' });
})

const Validate = (pattern, value) => {
  return pattern.test(value);
}

const CreateCustomerAccount = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Password do not match' });
  }

  // validate
  if (!Validate(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }
  if (!Validate(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}/, password)) {
    return res.status(400).json({ message: 'Password must contain at least 8 characters, including UPPER/lowercase and numbers' });
  }

  // find existing user
  const userExist = await GetUserByEmail(email);
  console.log(userExist);

  if (userExist.length > 0) {
    return res.status(400).json({ message: 'Email address already exists' });
  }
  const encrypt = await HashPassword(password);

  const user = await CreateCustomer(name, email, encrypt, "customer");

  if (user?.affectedRows > 0) {
    res.status(200).json({ message: 'Account created successfully' });
  } else {
    if (user.error?.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email address already exists' });
    }

    res.status(400).json({ message: 'An error occurred' });
  }
});

const SendResetLink = asyncHandler(async (req, res) => {
  const { email } = req.params;

  if (!email) return res.status(400).json({ message: 'Email address is required' });

  try {
    const isEmail = await User.isEmail(email);
    console.log(isEmail);

    if (isEmail) {
      const userResponse = await User.getUserByEmail(email);
      const id = userResponse[0].id;

      const resetToken = GenerateResetToken(email);

      // save token in db
      const tokenResponse = await Customer.SaveToken(resetToken, id);
      console.log(tokenResponse);

      if (tokenResponse.affectedRows === 0) return res.status(400).json({ message: 'Unable to send email.' });

      const message = `Click the following link to reset your password.<br/>
            <a href=${CUSTOMER_SESSION_URL}/reset-password/${resetToken}/${id}>Click here.</a>
            <br/>
            Thank you!
            `;

      const subject = 'Password reset Link'
      const mailResponse = await sendMail(email, subject, message);

      const status = mailResponse.Messages[0].Status;
      console.log(status);

      if (status === "success") {
        res.status(200).json({ message: 'Password reset link sent to your email.' });
      } else {
        res.status(400).json({ error: 'Unable to send email.' });
      }
      return null;

    }
    res.status(400).json({ message: 'Email address not found' });
  }
  catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Unable to send email.' });
  }
})

const PasswdReset = asyncHandler(async (req, res) => {
  const { token, id } = req.params;
  const { password, confirmPassword } = req.body;

  if (!id || !token || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Password do not match' });
  }

  const userResponse = await User.getUserById(id);

  if (userResponse.length === 0) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const user = userResponse[0];

  if (user.token !== token) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const encrypt = await HashPassword(password);

  const response = await User.updatePassword({ password: encrypt, id });

  if (response > 0) {
    res.status(200).json({ message: 'Password reset successful' });
  } else {
    res.status(400).json({ message: 'An error occurred' });
  }


});

const SendAccountActivatingLink = asyncHandler(async (req, res) => {
  const { email } = req.params;

  if (!email) return res.status(400).json({ message: 'Email address is required' });

  try {
    const isEmail = await User.isEmail(email);
    console.log(isEmail);

    if (isEmail) {
      const userResponse = await User.getUserByEmail(email);
      const id = userResponse[0].id;

      const resetToken = GenerateResetToken(email);

      // save token in db
      const tokenResponse = await Customer.SaveToken(resetToken, id);
      console.log(tokenResponse);

      if (tokenResponse.affectedRows === 0) return res.status(400).json({ message: 'Unable to send email.' });

      const message = `Click the following link to activate your account.<br/>
            <a href=${CUSTOMER_SESSION_URL}/acc-activate/${resetToken}/${id}>Click here.</a>
            <br/>
            Thank you!
            `;

      const subject = 'Account Activation Link'
      const mailResponse = await sendMail(email, subject, message);

      const status = mailResponse.Messages[0].Status;
      console.log(status);

      if (status === "success") {
        res.status(200).json({ message: 'Password reset link sent to your email.' });
      } else {
        res.status(400).json({ error: 'Unable to send email.' });
      }
      return null;

    }
    res.status(400).json({ message: 'Email address not found' });
  }
  catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Unable to send email.' });
  }
})

const ActivateAccount = asyncHandler(async (req, res) => {
  const { token, id } = req.params;

  if (!id || !token) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const userResponse = await User.getUserById(id);

  if (userResponse.length === 0) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const user = userResponse[0];

  if (user.token !== token) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const response = await User.changeStatus({ status: 'active', id });

  if (response > 0) {
    res.status(200).json({ message: 'Account activated successfully' });
  } else {
    res.status(400).json({ message: 'An error occurred' });
  }
});

const CheckActivation = asyncHandler(async (req, res) => {
  try {
    if (req.session.user) {
      const user = req.session.user[0];
      // get user
      const userResponse = await User.getUserByEmail(user.email);
      const status = userResponse[0].status;
      console.log(`${status}`);

      if (status === 'active') {
        res.status(200).json({ activated: true });
      } else {
        res.status(400).json({ activated: false });
      }

    }
  }
  catch (error) {
    console.log(error);
    res.status(400).json({ activated: false });
  }
})

// Old Venue GetVenues
// const GetVenues = asyncHandler(async (req, res) => {

//   const { venue_type, start_date, end_date, filter } = req.query

//   if (!venue_type || !start_date || !end_date) {
//     return res.status(400).json({ message: 'All fields are required', fields: ['venue_type', 'start_date', 'end_date'] });
//   }

//   try {
//     const response = await User.GetAllBookingRequest();
//     response.forEach((booking) => {
//       const bookingData = JSON.parse(booking.booking_data);
//       bookingData.forEach((data) => {
//         console.log("The date is :", data.date);
//         data.options.forEach((option, index) => {
//           console.log("The option against this date is :", option.venue_id);
//         })

//       })

//     })
//     const venues = await Customer.GetVenues(venue_type, start_date, end_date, filter);
//     console.log(venues.slice(0, 5));
//     res.status(200).json(venues);
//   }
//   catch (error) {
//     console.log(error);
//     res.status(400).json({ message: 'An error occurred' });
//   }
// })

// New Venue GetVenues
// const GetVenues = asyncHandler(async (req, res) => {
//   const { venue_type, start_date, end_date, filter } = req.query

//   if (!venue_type || !start_date || !end_date) {
//     return res.status(400).json({ message: 'All fields are required', fields: ['venue_type', 'start_date', 'end_date'] });
//   }

//   try {
//     // Get all booking requests
//     const bookingRequests = await User.GetAllBookingRequest();

//     // Extract booked venue ids for the requested date range
//     const bookedVenueIds = [];
//     bookingRequests.forEach((booking) => {
//       const bookingData = JSON.parse(booking.booking_data);
//       bookingData.forEach((data) => {
//         const bookingDate = new Date(data.date);
//         const startDate = new Date(start_date);
//         const endDate = new Date(end_date);
//         if (bookingDate >= startDate && bookingDate <= endDate) {
//           data.options.forEach((option) => {
//             console.log('Option:', option);
//             bookedVenueIds.push(option.venue_id);
//           });
//         }
//       });
//     });

//     // console.log('Booked venue ids:', bookedVenueIds);

//     // Get venues excluding the booked ones
//     const venues = await Customer.GetVenues(venue_type, start_date, end_date, filter);
//     const availableVenues = venues.filter((venue) => !bookedVenueIds.includes(venue.id));

//     res.status(200).json(availableVenues);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: 'An error occurred' });
//   }
// });

// Updated Venue Function
// const GetVenues = asyncHandler(async (req, res) => {
//   const { venue_type, start_date, end_date, filter } = req.query

//   if (!venue_type || !start_date || !end_date) {
//     return res.status(400).json({ message: 'All fields are required', fields: ['venue_type', 'start_date', 'end_date'] });
//   }

//   try {
//     // Get all booking requests
//     // const bookingRequests = await User.GetAllBookingRequest();

//     // // Initialize an object to store booked time slots for each venue
//     // const bookedTimeSlots = {};

//     // // Iterate through booking requests to collect booked time slots
//     // bookingRequests.forEach((booking) => {
//     //   const bookingData = JSON.parse(booking.booking_data);
//     //   bookingData.forEach((data) => {
//     //     const bookingDate = new Date(data.date);
//     //     const startDate = new Date(start_date);
//     //     const endDate = new Date(end_date);
//     //     if (bookingDate >= startDate && bookingDate <= endDate) {
//     //       data.options.forEach((option) => {
//     //         const venueId = option.venue_id;
//     //         if (!bookedTimeSlots[venueId]) {
//     //           bookedTimeSlots[venueId] = [];
//     //         }
//     //         bookedTimeSlots[venueId].push({
//     //           start: new Date(option.time.start),
//     //           end: new Date(option.time.end)
//     //         });
//     //       });
//     //     }
//     //   });
//     // });

//     // Get venues excluding the booked time slots
//     const venues = await Customer.GetVenues(venue_type, start_date, end_date, filter);

//     // const availableVenues = venues.map((venue) => {
//     //   const venueId = venue.id;
//     //   const blockedSlots = bookedTimeSlots[venueId] || [];
//     //   return {
//     //     ...venue,
//     //     blocked_slots: blockedSlots
//     //   };
//     // });

//     console.log(venues.slice(0, 5));

//     res.status(200).json(venues);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ message: 'An error occurred' });
//   }
// });

const GetVenues = asyncHandler(async (req, res) => {
  const { venue_type, start_date, end_date, filter } = req.query

  if (!venue_type || !start_date || !end_date) {
    return res.status(400).json({ message: 'All fields are required', fields: ['venue_type', 'start_date', 'end_date'] });
  }

  try {
    // Get all venues
    const venues = await Customer.GetVenues(venue_type, start_date, end_date, filter);

    // Calculate rates based on the provided dates
    const venuesWithRates = venues.map(venue => {
      const startDay = new Date(start_date).getDay();
      // 0 for Sunday, 1 for Monday, 2 for Tuesday, 3 for Wednesday, 4 for Thursday, 5 for Friday, 6 for Saturday
      const endDay = new Date(end_date).getDay();

      let min_const;
      // Case 1: Monday only (startDay and endDay are both 1)
      if (startDay === 1 && endDay === 1) {
        min_const = venue.rates.mon;
        // Case 2: Monday - Thursday or Monday - Tuesday or Monday - Wednesday
      } else if (startDay === 1 && (endDay <= 3 || endDay === startDay)) {
        min_const = Math.min(venue.rates.mon, venue.rates.tue_wed_thu);
        // Case 3: Tuesday - Thursday or Tuesday - Wednesday
      } else if (startDay >= 2 && startDay <= 4 && endDay >= 2 && endDay <= 4) {
        min_const = venue.rates.tue_wed_thu;
        // Case 4: Friday - Sunday or Friday - Saturday or Friday - Sunday
      } else if ((startDay >= 2 && startDay <= 4) && ((endDay >= 5 && endDay <= 6) || (endDay === 0))) {
        min_const = Math.min(venue.rates.tue_wed_thu, venue.rates.fri_sat_sun);
      }
      else if (startDay === 5 || startDay === 6 || startDay === 0 || endDay === 5 || endDay === 6 || endDay === 0) {
        min_const = venue.rates.fri_sat_sun;
      }
      else {
        min_const = Math.min(venue.rates.mon, venue.rates.tue_wed_thu, venue.rates.fri_sat_sun);
      }

      return { ...venue, min_const };
    });


    res.status(200).json(venuesWithRates);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'An error occurred' });
  }
});



// Old Venue GetVenueByID
// const GetVenueByID = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   if (!id) {
//     return res.status(400).json({ message: 'Venue ID is required' });
//   }

//   try {
//     const venue = await Venue.getVenueById(id);
//     res.status(200).json(venue);
//   }
//   catch (error) {
//     console.log(error);
//     res.status(400).json({ message: 'An error occurred' });
//   }
// })

// Updated Venue GetVenueByID
const GetVenueByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Venue ID is required' });
  }

  try {
    // Get booking requests for the specific venue
    const bookingRequests = await User.GetAllBookingRequest();

    // Initialize an array to store booked time slots
    const bookedTimeSlots = [];

    // Extract booked time slots from booking requests
    bookingRequests.forEach((booking) => {
      const bookingData = JSON.parse(booking.booking_data);
      bookingData.forEach((data) => {
        const dateKey = data.date; // Store the date as the key in the bookedTimeSlots object
        const blockedSlots = []; // Initialize an array to store the blocked slots for this date
        data.options.forEach((option) => {
          // Check if the option corresponds to the queried venue
          if (option.venue_id.toString() === id.toString()) {
            // const startTime = new Date(option.time.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            // const endTime = new Date(option.time.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const startTime = new Date(option.time.start);
            const endTime = new Date(option.time.end);
            // Push the start time and end time into the blocked slots array
            blockedSlots.push({ start: startTime, end: endTime });
          }
        });
        // Only push if there are blocked slots for the requested venue
        if (blockedSlots.length > 0) {
          // Push an object containing the date and blocked slots array into the bookedTimeSlots array
          bookedTimeSlots.push({ date: dateKey, blocked_slots: blockedSlots });
        }
      });
    });

    // Get the venue details
    const venue = await Venue.getVenueById(id);

    // Combine venue data with booked time slots
    const venueWithBlockedSlots = {
      ...venue,
      blocked_slots: bookedTimeSlots
    };

    res.status(200).json(venueWithBlockedSlots);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'An error occurred' });
  }
});




// const BookingRequest = asyncHandler(async (req, res) => {
//     const vat_copy = req.files['VAT_copy'][0];

//     if (!vat_copy) {
//         return res.status(400).json({ message: 'Image uploaded not complete' });
//     }

//     if (vat_copy.mimetype !== 'application/pdf' && vat_copy.mimetype !== 'image/jpeg' && vat_copy.mimetype !== 'image/png') {
//         return res.status(400).json({ message: 'Only image and pdf file allowed' });
//     }

//     if (vat_copy.size > 2000000) {
//         return res.status(400).json({ message: 'File size too large' });
//     }



//     const { name, refund_drawn, contact_person, video_wall, event_type, setup, meal_plan, public_performance_approval, chief_guest, number_of_guests, VAT_registration_no, venue_id, BOOKING_DATA } = req.body;



//     if (!name || !refund_drawn || !contact_person || !event_type || !setup || !meal_plan || !public_performance_approval || !chief_guest || !number_of_guests || !VAT_registration_no || !BOOKING_DATA || !video_wall || !venue_id) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     if (name.trim() === '' || refund_drawn.trim() === '' || contact_person.trim() === '' || event_type.trim() === '' || setup.trim() === '' || meal_plan.trim() === '' || public_performance_approval.trim() === '' || chief_guest.trim() === '' || number_of_guests.trim() === '' || VAT_registration_no.trim() === '' || BOOKING_DATA.trim() === '') {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     const uniqueRandomNumber = `BMICH-${uuidv4().slice(0, 5).toUpperCase()}`;


//     // add basic data
//     const data = [
//         name,
//         refund_drawn,
//         contact_person,
//         video_wall,
//         event_type,
//         setup,
//         meal_plan,
//         public_performance_approval === 'true' ? 1 : 0,
//         chief_guest,
//         number_of_guests,
//         VAT_registration_no,
//         vat_copy.filename,
//         parseInt(venue_id)
//     ]

//     try {
//         const response = await Customer.SaveBasicBookingData(data, uniqueRandomNumber)
//         console.log(response);

//         if (response.affectedRows > 0) {
//             const booking_id = uniqueRandomNumber;

//             const bookingData = JSON.parse(BOOKING_DATA);

//             bookingData.forEach(async (data) => {
//                 const date = new Date(data.date).toISOString().split('T')[0];
//                 data.options.forEach(async (option) => {


//                     // date, addons, time_range, booking_id,
//                     const option_data = [
//                         date,
//                         JSON.stringify(option.addons),
//                         `${option.time.start} - ${option.time.end}`,
//                         booking_id
//                     ]

//                     const option_response = await Customer.BookingOptionWithAddons(option_data);
//                     console.log(option_response);
//                 })

//             })

//             res.status(200).json({ message: 'Booking request successful' });

//         }


//     }
//     catch (error) {
//         console.log(error);
//         return res.status(400).json({ message: 'An error occurred' });
//     }

// })

const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};

const generateReservationID = (reservation_count) => {
  const year = new Date().getFullYear();
  const paddedIncrementalNumber = String(reservation_count).padStart(7, '0'); // Pad the incremental number with zeros
  return `EVN-${year}-${paddedIncrementalNumber}`;
};

const BookingRequest = asyncHandler(async (req, res) => {

  let vat_copy;
  if (req.files['VAT_copy']) {

    vat_copy = req.files['VAT_copy'][0];
  }

  // console.log("req.body = ", req.body);


  const { name, refund_drawn, contact_person, video_wall, event_type, setup, meal_plan, public_performance_approval, chief_guest, number_of_guests, VAT_registration_no, venue_id, BOOKING_DATA, reservation_count } = req.body;



  // const uniqueRandomNumber = `BMICH-${generateRandomString(4)}`;
  const uniqueRandomNumber = generateReservationID(reservation_count);
  console.log('Unique random number:', uniqueRandomNumber);
  if (uniqueRandomNumber === 'EVN-2024-0') {
    return res.status(400).json({ message: 'An error occurred' });
  }
  // EVN-[year]-0000951 (Incremental)

  const data = [
    name,
    refund_drawn,
    contact_person,
    video_wall.name_of_the_event ? video_wall : null, // Include video_wall if name_of_the_event is provided
    event_type,
    setup,
    meal_plan.length > 0 ? meal_plan : null, // Include meal_plan if it has elements
    public_performance_approval === 'true' ? 1 : 0,
    chief_guest,
    number_of_guests,
    VAT_registration_no ? VAT_registration_no : null,
    vat_copy && vat_copy.filename ? vat_copy.filename : null,
    parseInt(venue_id),
    BOOKING_DATA
  ];

  // Filter out null values from the data array
  // const filteredData = data.filter(value => value !== null);


  try {
    const response = await Customer.SaveBasicBookingData(data, uniqueRandomNumber)
    //   console.log(response);

    if (response.affectedRows > 0) {
      console.log('Booking request successful with booking Id = ', uniqueRandomNumber);
      const booking_id = uniqueRandomNumber;
      console.log('Booking is is eqal to :', booking_id);


      const bookingData = JSON.parse(BOOKING_DATA);

      console.log("This is the booking data that we got", bookingData);

      bookingData.forEach(async (data) => {
        const date = new Date(data.date).toISOString().split('T')[0];

        data.options.forEach(async (option) => {

          // return console.log(option);



          const start_time = new Date(option.time.start).toISOString().split('T')[1].split('.')[0];
          const end_time = new Date(option.time.end).toISOString().split('T')[1].split('.')[0];
          // return console.log(option);
          // const option_cost = option[option.active_date]

          // initial_cost, initial_hrs, start, end, price_prt_additional_hr
          const option_cost = cal_option_cost(option[option.active_date], option.initial_booking_hours, new Date(option.time.start), new Date(option.time.end), option.price_per_additional_hour);

          console.log('These are addons', option.addons);

          const option_data = [
            booking_id,
            option.option_id,
            option.title,
            JSON.stringify(option.addons),
            option_cost,
            start_time,
            end_time,
            date,
          ]

          // return console.log(option.title);
          console.log('option_data', option_data);

          const option_response = await Customer.BookingOptionWithAddons(option_data);
          console.log('ssss', option_response);
        })

      })

      res.status(200).json({ message: 'Booking request successful' });

    }


  }
  catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'An error occurred' });
  }

})

const cal_option_cost = (initial_cost, initial_hrs, _start, _end, price_prt_additional_hr) => {
  // const time_diff = end - start;
  // round upper bound

  let totalCost = 0;


  const start = new Date(_start).getTime();
  const end = new Date(_end).getTime();

  const timeDiff = end - start;
  const hours = timeDiff / (1000 * 60 * 60);

  // return console.log(hours);

  if (initial_hrs >= hours) {
    totalCost = totalCost + parseFloat(initial_cost);
  } else {
    const additional_hours = hours - initial_hrs;
    // console.log(additional_hours);
    totalCost = totalCost + (parseFloat(initial_cost) + (parseFloat(price_prt_additional_hr) * Math.ceil(additional_hours)));
  }

  return totalCost;

  //   // // 

  // const time_diff = Math.ceil((end - start) / 1000 / 60 / 60) * 60 * 60 * 1000;
  // const additional_hours = (time_diff - initial_hrs * 60 * 60 * 1000) / 60 / 60 / 1000;

  // if (additional_hours <= 0) {
  //   return initial_cost;
  // }


  // return initial_cost + (additional_hours * price_prt_additional_hr);
}



module.exports = { CustomerLogin, BookingRequest, GetVenueByID, GetVenues, CheckActivation, ActivateAccount, PasswdReset, SendAccountActivatingLink, customerCheckAuth, CreateCustomerAccount, Logout, SendResetLink }