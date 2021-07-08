const User = require('./models/User');

module.exports = {
    async getUserById(call, callback) {
        const { id } = call.request;

        const user = await User.findById(id)

        if (!user) {
            return callback({ error: 'User not found'});
        }

        return callback(null, { user });
    },
    
    async registerUser(call, callback) {
        const { username, lastname, password } = call.request.user;

        try {
            const user = await User.create({
                username,
                lastname,
                password
            })
            
            return callback(null, { user });
        } catch (error) {
            console.log(error);
            
            return callback({ error: 'an error ocurred' })
        }
        
    },
    
    async loginUser(call, callback) {
        const { username, password } = call.request;

        const user = await User.findOne({
            username,
        })

        if (!user) {
            return callback({ error: 'User not found'});
        }

        if (!await user.compareHash(password)) {
            return callback({ error: 'Invalid login'});
        }

        return callback(null, { token: user.generateToken(user)  });;
    }
}