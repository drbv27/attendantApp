const errorHandler = (code, returnData) => {
  const errorCodes = [
    {
      message: "User not found",
      returnData,
    },
    {
      message: "Incorrect user ID",
      returnData,
    },
    {
      message: "Wrong field, no changes made",
      returnData,
    },
    {
      message: "Wrong Token",
    },
    {
      message: "Incorrect password",
    },
    {
      message: "Suspended User",
      returnData,
    },
  ];
  return errorCodes[code];
};

module.exports = errorHandler;
