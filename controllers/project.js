const db = require('../config/db')
const sendResponse = require('../helpers/handlerResponse')
const config = require('../config/index')
const userController = require('./user')
const axios = require('axios')

exports.findProjectsByUserId = (userid) => {
    return new Promise(resolve => {
        resolve(db('projects').where({ user_id: userid }).orderBy('id', 'desc'));
    })
}

exports.createProject = async (req, res) => {
    try {
        const payload = req.body

        if (!payload) {
            return sendResponse(res, 'ERROR_OCCURRED', 404)
        }

        const userid = req.params.userid;

        if (!userid) {
            return sendResponse(res, 'ERROR_OCCURRED', 404)
        }

        const user = userController.findUserById(userid);

        if (!user || user.length === 0) {
            return sendResponse(res, 'USER_NOT_FOUND', 404)
        }

        const response = await axios.post(config.SNODE_ENDPOINT, payload)

        const {
            project_id = null, api_key = null
        } = response?.data?.result || {};
        
        db('projects').insert({
            project_id,
            api_key,
            user_id: userid,
            project_created_date: new Date(),
        }).then(ids => {
            return sendResponse(res, 'PROJECT_CREATED', 200, {
                data: response?.data?.result,
            })
        }).catch(error => {
            return sendResponse(res, 'ERROR_OCCURRED', 500)
        })
    } catch (error) {
        return sendResponse(res, 'ERROR_OCCURRED', 500);
    }
}

exports.getProjects = async (req, res) => {
    try {

        const userid = req.params.userid;

        if (!userid) {
            return sendResponse(res, 'ERROR_OCCURRED', 404)
        }

        const user = await userController.findUserById(userid);

        if (!user || user.length === 0) {
            return sendResponse(res, 'USER_NOT_FOUND', 404)
        }

        const projects = await this.findProjectsByUserId(userid)

        return sendResponse(res, 'GET_PROJECTS', 200, {
            data: projects,
        })
    } catch (error) {
        return sendResponse(res, 'ERROR_OCCURRED', 500);
    }
}