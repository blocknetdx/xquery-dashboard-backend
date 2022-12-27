const userConstants = require('./User');
const projectConstants = require('./Project');
const serverErrorRespMsg = {
  ERROR_OCCURRED: 'Something went wrong.',
};

const responseMessages = {
  ...serverErrorRespMsg,
  ...userConstants.responseMsg,
  ...projectConstants.responseMsg,
};

module.exports = {
  responseMessages,
};
