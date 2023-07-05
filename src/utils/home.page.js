const pid = process.pid;

module.exports = (req, res) => {
  console.log({ user: req.user });
  return res.json({
    success: true,
    message: `Welcome to the IMS API server: processID ${pid}`,
  });
};
