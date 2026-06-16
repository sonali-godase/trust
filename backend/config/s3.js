const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

// Configure S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Allowed file types mapping
const allowedMimeTypes = {
  "image/jpeg": "image",
  "image/jpg": "image",
  "image/png": "image",
  "image/webp": "image",
  "video/mp4": "video",
  "video/quicktime": "video", // mov
  "video/webm": "video",
};

// Multer file filter to validate file format before upload
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes[file.mimetype]) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPG, JPEG, PNG, WEBP images and MP4, MOV, WEBM videos are allowed.",
      ),
      false,
    );
  }
};

// Set up multer upload middleware streaming straight to S3
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: function (req, file, cb) {
      cb(null, process.env.AWS_BUCKET_NAME || "placeholder-bucket");
    },
    contentType: multerS3.AUTO_CONTENT_TYPE, // Set the correct mime-type metadata in S3
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const type = allowedMimeTypes[file.mimetype];
      const folder =
        type === "video" ? "ashram-gallery/videos/" : "ashram-gallery/images/";
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname).toLowerCase();
      // Clean original filename to prevent S3 key encoding issues
      const baseName = path
        .basename(file.originalname, ext)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-");
      cb(null, `${folder}${baseName}-${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: fileFilter,
  limits: {
    // 100MB is the absolute max limit (for videos).
    // Image-specific limits (10MB) are enforced in the controller.
    fileSize: 100 * 1024 * 1024,
  },
});

module.exports = { s3Client, upload, allowedMimeTypes };
