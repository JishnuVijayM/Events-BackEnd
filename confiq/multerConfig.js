const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Create base uploads directory if it doesn't exist
const createUploadDirectories = () => {
    const directories = ['uploads', 'uploads/userProfile', 'uploads/childBanner'];
    directories.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
};

// Create directories on startup
createUploadDirectories();

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = 'uploads/';

        // Determine the appropriate subdirectory based on the route
        if (req.originalUrl.includes('/createUser') || req.originalUrl.includes('/updateUser')) {
            uploadPath += 'userProfile';
        } else if (req.originalUrl.includes('/createChild')) {
            uploadPath += 'childBanner';
        } else {
            uploadPath += 'misc'; // Default directory for unspecified routes
        }

        // Ensure the directory exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
});

// Configure file filter
const fileFilter = (req, file, cb) => {
    // Define allowed mime types
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, JPG, PNG, and GIF files are allowed.'), false);
    }
};

// Create multer instance with configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Export different upload configurations
module.exports = {
    // Single file upload
    single: (fieldName) => upload.single(fieldName),

    // Multiple files upload
    array: (fieldName, maxCount) => upload.array(fieldName, maxCount),

    // Multiple fields upload
    fields: (fields) => upload.fields(fields),

    // Raw multer instance
    upload: upload
};