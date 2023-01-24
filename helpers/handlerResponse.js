const responseMsg = require('../Constants').responseMessages;

const sendResponse = (res, msgKey, code, payload = {}) => {
    const data = payload.hasOwnProperty('data') ? payload.data : undefined;
    return res.status(code).json({
        success: code >= 200 && code < 300,
        msg: responseMsg[msgKey],
        data,
    });
}

module.exports = sendResponse;