const multer = require('multer');
const path = require('path');


const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'application/pdf': 'pdf',
  'application/msword': 'msword',
};

const storage = multer.diskStorage({

  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../media'));
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({ storage: storage }).fields([
  { name: 'images', maxCount: 10 },
  { name: 'videos', maxCount: 5 },
  { name: 'pdfs', maxCount: 5 },
  { name: 'others', maxCount: 5 },
]);