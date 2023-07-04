async function generateOTP(otpLength = 4) {
  const otpChars = '0123456789';
  let otp = '';

  for (let i = 0; i < otpLength; i++) {
    const randomIndex = Math.floor(Math.random() * otpChars.length);
    otp += otpChars.charAt(randomIndex);
  }

  return otp;
}

module.exports = generateOTP;
