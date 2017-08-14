const express = require("express");

const fileRoutes = express.Router();
const cloudinary = require('cloudinary');
const config = require('../configure/config');


cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret
});

const multer  = require('multer');
const autoReap  = require('multer-autoreap');
const upload = multer({ dest: 'uploads/' });

autoReap.options.reapOnError = false;
fileRoutes.use(autoReap);

// var multerCloudinary = require('multer-cloudinary');
// var cloudinaryStorage = multerCloudinary({cloudinary: Cloudinary});

//======================EDIT SECTIONS==============================

fileRoutes.post("/", upload.single('file'), (req, res) => {

 cloudinary.uploader.upload(req.file.path, (error, result) => {
   console.log(result);
   if(error) res.json(error);

   res.on('autoreap', (reapedFile) => {
     console.log("reap", reapedFile);
     res.json(result);
   });
 });

});



module.exports = fileRoutes;
