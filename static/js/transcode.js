var commands =
{
    ffmpeg: 'ffmpeg',
    gstreamer: 'gst-launch',
    vlc: 'cvlc'
};

// Extra options included with each command
var extra =
{
    ffmpeg:
    {
        prepend: '',
        append: ''
    },
    
    gstreamer:
    {
        prepend: '',
        append: '',
    },
    
    vlc:
    {
        prepend: '-I dummy',
        append: 'vlc://quit'
    }
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
        var options;
        
        // Define actual command names
        output.push(commands[command]);

        // Include the filename
        output.push(form.file.in);

        // Prepend additional options
        output.push(extra[command].prepend);

        if(command == "ffmpeg")
        {
            options = ffmpegOptions(form);
        }
        else if(command == "gstreamer")
        {
            options = gstreamerOptions(form);
        }
        else if(command == "vlc")
        {
            options = vlcOptions(form);
        }

        output = output.concat(options);

        // Append additional options
        output.push(extra[command].append);

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
