const Image = require('../model/Image.model')
const Product = require('../model/Product')

const uploadImage = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        if (!product) {
            return res.status(400).json({ message: 'Product not found' });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const image = {
            imageName: req.file.originalname,
            imageUrl: req.file.path
        }
        product.images.push(image);
        await product.save();
        res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllImages = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        if (!product) {
            return res.status(400).json({ message: 'Product not found' });
        }
        res.status(200).json({ images: product.images });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteImage = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        if (!product) {
            return res.status(400).json({ message: 'Product not found' });
        }
        const image = product.images.find((image) => image._id.toString() === req.params.imageId.toString());
        if (!image) {
            return res.status(400).json({ message: 'Image not found' });
        }
        fs.unlinkSync(image.imageUrl);
        product.images.pull({ _id: image._id });
        await product.save();
        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    uploadImage,
    getAllImages,
    deleteImage,
}