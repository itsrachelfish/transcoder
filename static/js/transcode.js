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
    var command = $('#command').val();
    var output = [];

    // References to form elements
    var $output = $('#output');
    var $infile = $('#infile');
    var $outfile = $('#outfile');


    if(command)
    {
        // Define actual command names
        output.push(commands[command]);

        // Include the filename
        output.push($infile.val());

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
});
