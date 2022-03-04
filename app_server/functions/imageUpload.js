const path = require('path')
const fs = require('fs')
//const { resolve } = require('path/posix')

const Deletefile = (imagePath) =>{
    if(fs.existsSync(imagePath)) {
        fs.unlink(imagePath,(err)=>{
            if (err) {
                console.log('file delete error') }
            else {
                console.log('file delete seccessfull')
            }
        })
    }
    else {
        console.log('File doesnt exist')
    }
}

const Deletefolder = (folder) =>{
    if(fs.existsSync(folder)) {
        fs.rmdir(folder, { recursive: true }, (err)=>{
            if (err) {
                console.log('folder delete error') }
            else {
                console.log('folder delete seccessfull')
            }
        })
    }
    else {
        console.log('File doesnt exist')
    }
}
const oneImageUpload = (image, folder) => {
    return new Promise( (resolve)=> {

        if (!fs.existsSync(path.normalize(__dirname + './../../upload/' + folder))){
            fs.mkdirSync(path.normalize(__dirname+'./../../upload/' + folder))
        }
        const timePath = Date.now()
        const pathMV = path.normalize(__dirname + './../../upload/' + folder + '/') + timePath
        image.mv(pathMV + '.jpg', (err)=> {
            if (err) {
                console.log('file upload err')
            } else {
                console.log('file upload successfull')
                resolve('upload/' + folder + '/' + timePath + '.jpg')
            }
        })
    })
}



module.exports = {
    Deletefile,
    Deletefolder,
    oneImageUpload

}                                                                                                                                                                                                                                                                    