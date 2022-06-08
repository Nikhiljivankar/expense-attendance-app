const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //    cb(null, './uploads/');
        
    // },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, 'congar' + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    cb(null, true);
};

let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload.single('employeePhoto')

  // cb(null, 'Employee' + '-' + fs.readFileSync(path.extname(file.originalname)));
        // let buff = fs.readFileSync(cb);
        // let base64data = cd.toString('base64');
        // console.log(base64data);

// let buff = fs.readFileSync('stack-abuse-logo.png');
// let base64data = buff.toString('base64');

// console.log('Image converted to base 64 is:\n\n' + base64data);

// function encode_base64(filename) {
//     fs.readFile(path.join(__dirname, '/public/', filename), function(error, data) {
//       if (error) {
//         throw error;
//       } else {
//         let buf = Buffer.from(data);
//         let base64 = buf.toString('base64');
//         // console.log('Base64 ' + filename + ': ' + base64);
//         return base64;
//       }
//     });
//   }
  
  // const fs = require('fs');
  // // static async processGcpAttachment(imageBase64){
  //     const pathDir = global.root_path +'/uploads';
  //     const imageName = 'signature_'+ new Date().getTime() + '.jpg';
  //     fs.writeFileSync(path.join(pathDir, imageName), imageBase64,{encoding:'base64'});
  //     console.log(imageName);
  
      // const downloadUrl = wait GcpBucket.uploadAttachmentFile({filePath:path.join(pathDir, imageName),fileName:image)
      // await fs.unlinkSync(path.join(pathDir, imageName));
      // return {
      //     url:downloadUrl,
      //     fileName: imageName
      // }