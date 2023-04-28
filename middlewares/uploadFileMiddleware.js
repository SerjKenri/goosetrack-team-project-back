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

  params: async (req, file) => {
    if (!file.mimetype.startsWith('image')) {
      throw new BadRequest('Only image is alowed to be downloaded!');
    }

    return {
      width: 350,
      height: 350,
      quality: 60,
      folder: 'avatars',
      format: 'jpg',
      public_id: uuid(),
    };
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
