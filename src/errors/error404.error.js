module.exports = (req, res) => {
  return res.status(404).json({
    status: "failed",
    message: "Can't find " + req.originalUrl + " on this server",
  });
};