module.exports = function (config) {
    var karmaSettings = require('./karma.make')({});
    config.set(karmaSettings);
};
