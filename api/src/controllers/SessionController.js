const userService = require('../services/user');

class SessionController {
    async store(req, res) {
        const { username, password } = req.body;

        const response = await userService.loginUser({ username, password});

        return res.json(response);
    }
}

module.exports = new SessionController();