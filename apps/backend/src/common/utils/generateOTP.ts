/**
 * Generates random OTP
 * @function
 *
 * @returns {number} - Generated OTP random number
 */
export const generateOTP = () => {
  return 100000 + Math.floor(Math.random() * 900000);
};
