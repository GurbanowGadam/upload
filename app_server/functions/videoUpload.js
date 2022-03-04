const path = require('path')
const fs = require('fs')

const ffmpeg = require('fluent-ffmpeg')

const videoUpload = (video, folder) => {
    return new Promise( (resolve)=> {

        if (!fs.existsSync(path.normalize(__dirname + './../../upload_video/' + folder))){
            fs.mkdirSync(path.normalize(__dirname+'./../../upload_video/' + folder))
        }
        const timePath = Date.now()
        const video_path = path.normalize(__dirname + './../../upload_video/' + folder + '/' + timePath )
        video.mv(video_path + '.mp4', (err)=>{
                const v_p = video_path + '.mp4';
                ffmpeg(v_p)
                .videoCodec('libx264')
                .audioCodec('libmp3lame')
                .videoBitrate(720)
                .size('320x?')
                .on('error', function(err) {
                    console.log('An error occurred: ' + err.message);
                })
                .on('end', function() {
                    console.log('Processing finished !');
                })
                .save(path.normalize(video_path + '_output_(720).avi'))
                
                ffmpeg(v_p)
                .videoCodec('libx264')
                .audioCodec('libmp3lame')
                .videoBitrate(480)
                .size('320x240')
                .on('error', function(err) {
                    console.log('An error occurred: ' + err.message);
                })
                .on('end', function() {
                    console.log('Processing finished !');
                })
                .save(path.normalize(video_path + '_output_(480).mp4'))

            if (err) {
                console.log('file upload err')
            } else {
                console.log('file upload successfull')
                resolve('upload_video/' + folder + '/' + timePath + '.mp4')
            }
        })
        
    })
}



module.exports = {
    videoUpload

}