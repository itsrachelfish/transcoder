/*


gst-launch filesrc location=media_file typefind=true ! aiurdemux name=demux ! queue ! vpudec ! mfw_ipucsc ! 'video/x-raw-yuv, width=(int)720, height=(int)480' ! vpuenc codec=avc ! matroskamux name=mux ! filesink location=output_media_file.mk

*/
commands.gstreamer = function(form)
{
    var output = ['gst-launch'];

    if(parseInt(form.audio.enabled))
    {
        if(form.audio.bitrate)
        {
            output.push('-' + form.audio.bitrate);
        }

        if(form.audio.codec)
        {
            output.push('-' + form.audio.codec);
        }

        if(form.audio.language)
        {
            output.push('-' + form.audio.language);
        }

        if(form.audio.channels)
        {
            output.push('-' + form.audio.channels);
        }
    }

    if(parseInt(form.video.enabled))
    {
        if(form.video.bitrate)
        {
            output.push('-' + form.video.bitrate);
        }

        if(form.video.codec)
        {
            output.push('-' + form.video.codec);
        }

        if(form.video.width)
        {
            output.push('-' + form.video.width);
        }

        if(form.video.height)
        {
            output.push('-' + form.video.height);
        }
    }

    if(parseInt(form.subtitles.enabled))
    {
        if(form.subtitles.language)
        {
            output.push('-' + form.subtitles.language);
        }
    }

    if(parseInt(form.misc.priority))
    {
        output.push('-');
    }

    if(parseInt(form.misc.deinterlace))
    {
        
    }

    if(form.misc.fps)
    {
        
    }
    
    if(form.file.out)
    {

    }
    
    return output;
}
