const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageController = require('../controllers/imageController');

// Khởi tạo multer để upload ảnh.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route xử lý upload ảnh.
router.post('/upload', upload.single('image'), imageController.uploadImage);

// Route xóa 1 ảnh.
router.delete('/delete/:id', imageController.deleteImage);

// Route lấy danh sách tất cả ảnh.
router.get('/get-all', imageController.getAllImages);

module.exports = router;