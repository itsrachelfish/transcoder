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
