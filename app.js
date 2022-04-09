/** @format */

const express = require("express");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    const date = new Date();
    cb(null, date.getTime() + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "file/png" || "file/jpg" || "file/jpeg") {
      cb(null, true);
    } else {
      {
        req.filevalidationError = "this type file is not allow";
        cb(null, false);
      }
    }
  },
  limits: { fileSize: 30000 },
}).single("upload");

const app = express();
app.post("/", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.send(err.message);
    } else if (req.filevalidationError) {
      return res.send(req.filevalidationError);
    }

    // Everything went fine.
    res.send("everything is fine");
  });
});
app.listen(5000, () => {
  console.log("server working");
});
