/*

ffmpeg
-i source_video.avi
input
-acodec aac
-ab 128kb
-vcodec mpeg4
-b 1200kb
-mbd 2
-flags +4mv+trell
-aic 2
-cmp 2
-subcmp 2
-s 320x180
-title X final_video.mp4

ffmpeg -i snatch_1.vob -f avi -c:v mpeg4 -b:v 800k -g 300 -bf 2 -c:a libmp3lame -b:a 128k snatch.avi


ffmpeg -i input.avi -s qcif -vcodec h263 -r 20 -b 180k -acodec libfaac -ab 64k -ac 2 -ar 22050 output.3gp
Converting video file (.flv, .avi etc.) to .3gp

ffmpeg

-i = input file name
-s = set frame size, qcif=176x144
-vcodec = force video codec
-r = frame-rate [default = 25]
-b = bit-rate [200 kb/s]
-acodec = force audio codec
-ab = audio bitrate in bits/s [64k]
-ac = no. of audio channels [1]
-ar = audio sampling frequency [44100 Hz]
optional:
-sameq = use same video quality as source (implies VBR)
-f = force format
-y = overwrite output files


*/
commands.ffmpeg = function(form)
{
    var output = ['ffmpeg'];
    return output;
}
