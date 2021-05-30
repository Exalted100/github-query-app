const { token } = process.env;

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: token,
  };
};