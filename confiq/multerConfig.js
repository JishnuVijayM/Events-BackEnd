const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folderName = 'uploads/';
        if (req.path.includes('createUser')) {
            folderName += 'userProfile/';
        } else if (req.path.includes('createChild')) {
            folderName += 'childBanner/';
        }
        cb(null, folderName);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
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

// Export middleware with field name specified
module.exports = {
    single: (fieldName) => upload.single(fieldName),
    array: (fieldName, maxCount) => upload.array(fieldName, maxCount),
};