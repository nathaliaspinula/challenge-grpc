const userService = require('../services/user');

class UserController {
    async show(req, res) {
        const user = {};

        return user;
    }

    async store(req, res) {
        const { username, lastname, password } = req.body;

        const response = await userService.registerUser({
            user: { username, lastname, password }
        });

        console.log("response", response);

        return res.json(response);
    }
}

module.exports = new UserController();