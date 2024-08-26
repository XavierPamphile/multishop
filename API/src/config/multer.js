import multer from "multer";
import path from "path";
import fs from "fs";

// Multer configuration for file storage.
// Defines the location and name of the uploaded files.
// Storage configuration and filtering options.

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const newDirectory = path.join(
                process.cwd(),
                "public/images"
            );
            fs.mkdirSync(newDirectory, { recursive: true });
            cb(null, newDirectory);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    }),
    limits: {
        fileSize: 1024 * 1024 * 5,
    },

// File validation filter to accept only images in webp format.

    fileFilter: function (req, file, cb) {
        const filetypes = /webp/;
        const isMimetypeValid = filetypes.test(file.mimetype);
        if (isMimetypeValid) {
            cb(null, true);
        } else {
            cb("Webp format images only", false);
        }
    },
}).single("picture"); 

export default upload;

