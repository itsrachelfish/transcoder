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

function vlcOptions(form)
{
    var options = [];
    var sout = [];

    if(parseInt(form.audio.enabled))
    {
        if(form.audio.bitrate)
        {
            sout.push('ab=' + form.audio.bitrate);
        }

        if(form.audio.codec)
        {
            sout.push('acodec=' + form.audio.codec);
        }

        if(form.audio.language)
        {
            options.push('--audio-language=' + form.audio.language);
        }

        if(form.audio.channels)
        {
            options.push('--sout-transcode-channels=' + form.audio.channels);
        }
    }

    if(parseInt(form.video.enabled))
    {
        if(form.video.bitrate)
        {
            sout.push('vb=' + form.video.bitrate);
        }

        if(form.video.codec)
        {
            sout.push('vcodec=' + form.video.codec);
        }

        if(form.video.width)
        {
            options.push('--sout-transcode-maxwidth=' + form.video.width);
        }

        if(form.video.height)
        {
            options.push('--sout-transcode-maxheight=' + form.video.height);
        }
    }

    if(parseInt(form.subtitles.enabled))
    {
        sout.push('soverlay');
        
        if(form.subtitles.language)
        {
            options.push('--sub-language=' + form.subtitles.language);
        }
    }

    if(parseInt(form.misc.priority))
    {
        options.push('--sout-transcode-high-priority');
    }

    if(parseInt(form.misc.deinterlace))
    {
        sout.push('deinterlace');
    }

    if(form.misc.fps)
    {
        sout.push('fps=' + form.misc.fps);
    }

    var outfile;
    
    if(form.file.out)
    {
        outfile = ':std{access=file,mux=ts,dst="' + form.file.out + '"}';
    }

    sout = sout.join(',');
    options.push(":sout='#transcode{" + sout + "} " + outfile + "'");

    return options;
}

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

        // Prepend additional options
        output.push(extra[command].prepend);

        if(command == "vlc")
        {
            var options = vlcOptions(form);
            output = output.concat(options);
        }

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
        console.log("generate!");
        generateCommand();
    });

    $('body').on('change', '.enable-row', function()
    {
        var row = $(this).parents('.options-row');
        var enabled = parseInt($(this).val()) ? true : false;
        
        row.find('input').not('.enable-row').prop('disabled', !enabled);
    });
});
