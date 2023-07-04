const { StatusCodes } = require("http-status-codes");
//const requestIp = require("request-ip");
const {Organisation} = require('../models')

exports.verify_apikey = async (req, res, next) => {
  //get apikey from header
  const apikey = req.headers.apikey;

  //get ip address
  const client_ip = req.headers['x-real-ip'] || req.socket.remoteAddress;
  //const clientIp = requestIp.getClientIp(req);
  
  try {
    const organisation = await Organisation.findOne({apikey});

    if (!organisation) return res.status(StatusCodes.OK).json({
      code: StatusCodes.UNAUTHORIZED,
      message: 'Invlaid apikey',
      status: false
    })

    //Validate ip address
    if (client_ip !== organisation.application_server_ip) return res.status(StatusCodes.OK).json({code: StatusCodes.BAD_GATEWAY, message: 'IP address is not whitelisted. Please onboard if not already or update your organisation ip address', status: false});


    //Proceed if ip is white listed
    return next();
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.OK).json({
      success: false,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      error: `Error testing : ${error.message}`,
    });
  }
};
