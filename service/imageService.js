// const multer = require('multer');
// const uuid = require('uuid').v4;
// const path = require('path');
// // const fsPromises = require('fs/promises');
// const fsExt = require('fs-extra');
// const Jimp = require('jimp');

// class ImageService {
//   static upload(name) {
//     const multerStorage = multer.memoryStorage();

//     const multerFilter = (req, file, cbk) => {
//       if (file.mimetype.startsWith('image')) {
//         cbk(null, true);
//       } else {
//         cbk(new Error('Only image is alowed to download!'), false);
//       }
//     };
//     return multer({
//       storage: multerStorage,
//       fileFilter: multerFilter,
//     }).single(name);
//   }

//   static async save(file, width, height, ...pathParts) {
//     const fileName = `${uuid()}.jpg`;

//     const filePath = path.join(process.cwd(), 'TempTestAvatar', ...pathParts);

//     await fsExt.ensureDir(filePath);

//     const imgWidth = width || 300;
//     const imgHeight = height || 300;

//     await Jimp.read(file.buffer)
//       .then(img => {
//         return img
//           .resize(imgWidth, imgHeight)
//           .quality(60)
//           .write(path.join(filePath, fileName));
//       })
//       .catch(err => {
//         console.error(err);
//       });

//     return path.join(...pathParts, fileName);
//   }
// }

// module.exports = { ImageService };
