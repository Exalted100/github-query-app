const { token } = process.env;

exports.handler = async (event, context) => {
  return token;
};