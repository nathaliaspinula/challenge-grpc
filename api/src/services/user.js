const load = require('../pb/loader');

const userClient = load({
  serviceName: 'UserService',
  address: 'localhost:3334',
  fileName: 'user',
});

module.exports = userClient;