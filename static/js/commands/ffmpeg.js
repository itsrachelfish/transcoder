commands.ffmpeg = function(form)
{
    var output = ['ffmpeg'];

    if(form.file.in)
    {
        output.push('-i ' + form.file.in);
    }

    if(parseInt(form.audio.enabled))
    {
        if(form.audio.bitrate)
        {
            output.push('-ab ' + form.audio.bitrate);
        }

        if(form.audio.codec)
        {
            output.push('-acodec ' + form.audio.codec);
        }

        if(form.audio.language)
        {
            output.push('-map 0:m:language:' + form.audio.language);
        }

        if(form.audio.channels)
        {
            output.push('-ac ' + form.audio.channels);
        }
    }

    if(parseInt(form.video.enabled))
    {
        if(form.video.bitrate)
        {
            output.push('-b ' + form.video.bitrate);
        }

        if(form.video.codec)
        {
            output.push('-vcodec ' + form.video.codec);
        }

        if(form.video.width && form.video.height)
        {
            output.push('-s ' + form.video.width + "x" + form.video.height);
        }
    }

    if(parseInt(form.subtitles.enabled))
    {
        if(form.subtitles.language)
        {
            output.push('-metadata:s:s:0 language=' + form.subtitles.language);
        }
    }

    if(parseInt(form.misc.deinterlace))
    {
        output.push('-deinterlace');
    }

    if(form.misc.fps)
    {
        output.push('-r ' + form.misc.fps);
    }
    
    if(form.file.out)
    {
        output.push(form.file.out);
    }

    return output;
}
