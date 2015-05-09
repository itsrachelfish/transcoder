var commands =
{
    ffmpeg: 'ffmpeg',
    gstreamer: 'gst-launch',
    vlc: 'cvlc'
};

// Default options included with each command
var defaults =
{
    ffmpeg: '',
    gstreamer: '',
    vlc: '-I dummy'
};

function generateCommand()
{
    // Internal state
    var form = $('form').serializeObject();
    var output = [];

    // References to form elements
    var $output = $('.output');

    if(form.command)
    {
        var command = form.command;
        
        // Define actual command names
        output.push(commands[command]);

        // Include the filename
        output.push(form.file.in);

        // Additional options
        output.push(defaults[command]);

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
