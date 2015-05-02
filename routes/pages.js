module.exports = function(required)
{
    var app = required.app;
    var config = required.config;
    var event = required.event;
    var model = required.model;

    app.get('/', function(req, res)
    {
        event.emit('render', req, res, {view: 'index'});
    });
}
