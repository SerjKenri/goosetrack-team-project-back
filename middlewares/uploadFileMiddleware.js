const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const uuid = require('uuid').v4;
const { BadRequest } = require('http-errors');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  // params: {
  //   folder: 'avatars',
  //   format: async (req, file) => ['jpg', 'png'],
  //   filename: (req, file, cb) => {
  //     console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
  //     console.log('req!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', file);
  //     cb(null, file.originalname);
  //   },
  //   //
  // },
  params: async (req, file) => {
    if (!file.mimetype.startsWith('image')) {
      throw new BadRequest('Only image is alowed to be downloaded!');
    }

    return {
      folder: 'avatars',
      format: 'jpg',
      public_id: uuid(),
    };
    //
  },

  // cloudinary: cloudinary,
  // folder: 'avatars',
  // allowedFormats: ['jpg', 'png'],
  // fileName: (req, file, cb) => {
  //   console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
  //   console.log('req!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', file);
  //   cb(null, file.originalname);
  // },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
