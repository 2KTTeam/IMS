const { StatusCodes } = require("http-status-codes");
//const requestIp = require("request-ip");
const {Project} = require('../models')

const verifyApikey = async (req, res, next) => {
  //get apikey from header
  const apiKey = req.headers.apikey;

  //get ip address
  const client_ip = req.headers['x-real-ip'] || req.socket.remoteAddress;
  //const clientIp = requestIp.getClientIp(req);
  
  try {
    const project = await Project.findOne({apikey:apiKey});

    if (!project) return res.status(StatusCodes.UNAUTHORIZED).json({
      status: false,
      message: 'Invlaid apikey',
    })

    //Validate ip address
    if (client_ip !== project.applicationServerIP) return res.status(StatusCodes.OK).json({code: StatusCodes.BAD_GATEWAY, message: 'IP address is not whitelisted. Please onboard if not already or update your project ip address', status: false});


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


module.exports = {
  verifyApikey
}
