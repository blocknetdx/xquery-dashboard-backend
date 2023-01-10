const db = require('../config/db')
const sendResponse = require('../helpers/handlerResponse')
const projectController = require('./project')

exports.register = async (req, res) => {
    try {
        const payload = req.body

        if (!payload || !payload?.wallet_address || !payload?.user_created_date) {
            return sendResponse(res, "USER_INFO_REQUIRED", 404)
        }

        const user = await this.findUserByWallet(payload?.wallet_address)

        if (!user || user?.length === 0) {
            db('users').insert(payload).then(ids => {
                return sendResponse(res, "USER_CREATED", 200, { data: ids[0] })
            }).catch(error => {
                console.log('error create user : ', error);
            });
        } else {
            return sendResponse(res, "USER_FOUND", 200, { data: user[0]?.user_id })
        }
    } catch (error) {
        return sendResponse(res, 'ERROR_OCCURRED', 500);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userid = req.params.id;

        if (!userid) {
            return sendResponse(res, 'USER_NOT_FOUND', 404);
        }

        const user = await this.findUserById(userid);

        if (!user || user.length === 0) {
            return sendResponse(res, 'USER_NOT_FOUND', 404);
        }

        const deleteUserRes = await removeUser(userid);

        return sendResponse(res, 'USER_REMOVE', 200, { data: deleteUserRes })
    } catch (error) {
        return sendResponse(res, 'ERROR_OCCURRED', 500);
    }
}



exports.findUserByWallet = (wallet = null) => {
    if (!wallet) return null;
    return new Promise((resolve) => {
        resolve(db('users').where({ wallet_address: wallet}));
    })
}

exports.findUserById = (userid = null) => {
    if (!userid) return null;

    return new Promise((resolve) => {
        resolve(db('users').where({ user_id: userid}))
    })
}

const removeUser = (userid) => {
    if (!userid) return null;

    return new Promise((resolve) => {
        resolve(db('users').where('user_id', Number(userid)).del());
    })
}