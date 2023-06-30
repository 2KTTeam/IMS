module.exports = (err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err);

  // Check if the error has a custom status code and message
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Send the error response to the client
  res.status(statusCode).json({ error: message });
}