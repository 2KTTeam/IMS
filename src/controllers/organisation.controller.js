const { Organisation } = require("../models");
const { StatusCodes } = require("http-status-codes");
const { uuidUtil, organisationwWelcomeEmail } = require("../utils");
const {sendMail} = require('../services');
const IP = require('ip');

const onboardOrgnisation = async (req, res) => {
  try {
    const {
      email,
      application_server_ip,
      institution_name,
      software_name,
      address,
    } = req.body;

    // const client_ip = req.headers['x-real-ip'] || req.socket.remoteAddress;

    const client_ip =  req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    console.log('IP ADDRESS',client_ip);

    //check if organisation exists
    const organiation = await Organisation.findOne({ email });

    if (organiation)
      return res
        .status(StatusCodes.OK)
        .json({
          code: StatusCodes.NO_CONTENT,
          message: "Oranisation with email already eists",
        });

    //Generate apikey
    const uniqueId = await uuidUtil.giveID();

    const apikey = uniqueId.toLowerCase();

    console.log(apikey);

    //create organisation
    await Organisation.create({
      email,
      application_server_ip,
      institution_name,
      apikey,
      address,
      software_name
    });



    //send email
    const emailType = 'admin';
    const message = organisationwWelcomeEmail(institution_name, apikey)
   
    await sendMail(emailType, email, 'IMS Apikey', message );

    //return response
    const data =  {
      email,
      institution_name,
      software_name,
      address,
    }


    return res.status(StatusCodes.OK).json({code: StatusCodes.CREATED, status: true, message:  data})
  } catch (error) {

    return res.status(StatusCodes.OK).json({
      success: false,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      error: `Error testing : ${error.message}`,
    });
  }
};

module.exports = {
  onboardOrgnisation,
};
