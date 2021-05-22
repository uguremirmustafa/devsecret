exports.handler = async (event, context) => {
  const guides = [
    { title: 'title1', author: 'mario' },
    { title: 'title2', author: 'luigi' },
    { title: 'title3', author: 'chun-li' },
  ];

  if (context.clientContext.user) {
    return {
      statusCode: 200,
      body: JSON.stringify(guides),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'you must be logged in to see this' }),
    };
  }
};
