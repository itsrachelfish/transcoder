var redis = require('redis');

var model =
{
    // Database connection variables
    redis: false,
    config: false,

    // Function to connect to our databases
    connect: function(config)
    {
        model.config = config;
        model.redis = redis.createClient(6335);
    }
}

module.exports = model;
