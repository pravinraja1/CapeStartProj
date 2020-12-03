
var multer = require('multer'); 
  
var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'server/uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.originalname + '-' + Date.now() +"." +file.mimetype.substring(file.mimetype.indexOf("/")+1,file.mimetype.length)); 
    },
    filetype: (req, file, cb) => { 
        cb(file.mimetype)
    }
}); 
  
module.exports.upload = multer({ storage: storage });