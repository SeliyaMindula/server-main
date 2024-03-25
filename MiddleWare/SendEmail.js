const dotenv = require('dotenv').config();
const MailJet = require('node-mailjet')
const mailjet = MailJet.apiConnect(
    "8c0c6d4a3ec9f0d6ff4a60256a50d833", "c658b4fb17cf3552b9f1453dce94d8f3"
)


const sendMail = async (recipient,subject,message) => {
    console.log('fn triggered')
  try {
    const result = await mailjet
    
      .post("send", { 'version': 'v3.1' })
      .request({
        "Messages": [
          {
            "From": {
              "Email": "bmich-reservation@visionarydv.com",
              "Name": "BMICH | Reservation"
            },
            "To": [
              {
                "Email": recipient,
                
              }
            ],
            "Subject": subject,
            "HTMLPart": message
            
          }
        ]
      });

    //console.log("Email body:",result.body);
    return result.body;
  } catch (err) {
    console.log("Email Error",err);
    return err;
  }
};

module.exports = sendMail
