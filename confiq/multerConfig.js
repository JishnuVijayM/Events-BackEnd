const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folderName = 'uploads/';
        if (req.path.includes('createUser')) {
            folderName += 'userProfile/';
        } else if (req.path.includes('createChild')) {
            folderName += 'childBanner/';
        }
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName, { recursive: true });
        }
        
        cb(null, folderName);
    },
    filename: (req, file, cb) => {
        // Add file extension handling
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, uniqueName + extension);
    }
});

const fileFilter = (req, file, cb) => {
    // Add mimetype checking in addition to extension
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedMimes.includes(file.mimetype)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB max-limit
    },
    fileFilter: fileFilter
});

module.exports = {
    single: (fieldName) => upload.single(fieldName),
    array: (fieldName, maxCount) => upload.array(fieldName, maxCount),
};