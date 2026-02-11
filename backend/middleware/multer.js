import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads/'); // Ensure 'uploads/' folder exists
    },
    filename: function(req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({ storage });
export default upload;