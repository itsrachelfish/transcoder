module.exports = function(required)
{
    var app = required.app;
    var config = required.config;
    var event = required.event;
    var model = required.model;

    // Middleware to ensure users are logged in
    app.use(function(req, res, next)
    {
        if(!req.session.user)
        {
            event.emit('message', req, res, {type: 'error', text: 'You must be logged in to use this tool!'});
            return;
        }

        next();
        return;

        // Only allow users based on the config file
        if(config.allowed.indexOf(req.session.user.user_name) < 0)
        {
            event.emit('message', req, res, {type: 'error', text: 'You are not authorized to use this tool!'});
            return;
        }

        next();
    });

    app.get('/', function(req, res)
    {
        event.emit('render', req, res, {view: 'index'});
    });
}
