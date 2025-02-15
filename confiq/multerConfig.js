const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Create base uploads directories if they don't exist
const createUploadDirectories = () => {
    const directories = [
        'uploads', 
        'uploads/userProfile', 
        'uploads/companyLogo', 
        'uploads/eventBanner', 
        'uploads/misc', 
        'uploads/eventResume'
    ];

    directories.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
};

// Create directories on startup
createUploadDirectories();

// Configure storage dynamically
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = 'uploads/';

        // Check the field name first for resume uploads
        if (file.fieldname === 'resume') {
            uploadPath += 'eventResume';
        }
        // Then check routes for other file types
        else if (req.originalUrl.includes('/createUser') || req.originalUrl.includes('/updateUser')) {
            uploadPath += 'userProfile';
        } else if (req.originalUrl.includes('/createCompany') || req.originalUrl.includes('/updateCompany')) {
            uploadPath += 'companyLogo';
        } else if (req.originalUrl.includes('/createEvent') || req.originalUrl.includes('/updateEvent')) {
            uploadPath += 'eventBanner';
        } else {
            uploadPath += 'misc'; // Default directory
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

// Configure file filter (Allow both images & PDFs)
const fileFilter = (req, file, cb) => {
    const allowedMimes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif', // Images
        'application/pdf' // PDF
    ];

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, JPG, PNG, GIF, and PDF files are allowed.'), false);
    }
};

// Create multer instance
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit for PDFs & images
    }
});

// Export different upload configurations
module.exports = {
    single: (fieldName) => upload.single(fieldName),
    array: (fieldName, maxCount) => upload.array(fieldName, maxCount),
    fields: (fields) => upload.fields(fields),
    upload: upload
};