exports.handler = async (req, res) => {
  console.log('function ran');

  const data = { name: 'mario' };

  // return response to browser
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
