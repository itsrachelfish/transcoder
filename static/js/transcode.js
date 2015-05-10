var commands = {};

function generateCommand()
{
    // Internal state
    var form = $('form').serializeObject();
    var output;

    // References to form elements
    var $output = $('.output');

    if(form.command)
    {
        var command = form.command;
        var options;

        if(typeof commands[command] == "function")
        {
            output = commands[command](form);
        }
        
        // Display output
        $output.val(output.join(' '));
    }
    else
    {
        $output.val('');
    }
}

$(document).ready(function()
{
    $('body').on('change keydown keyup', 'select, input', function()
    {
        generateCommand();
    });

    $('body').on('change', '.enable-row', function()
    {
        var row = $(this).parents('.options-row');
        var enabled = parseInt($(this).val()) ? true : false;
        
        row.find('input').not('.enable-row').prop('disabled', !enabled);
    });
});
