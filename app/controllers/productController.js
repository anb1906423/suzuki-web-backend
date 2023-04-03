const Product = require('../model/Product')
const Image = require('../model/Image.model')
const { BadRequestError } = require('../api-error')
const handlePromise = require('../helpers/promise.helper')
const mongoose = require('mongoose')

const getProduct = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'Product name required' });
    const product = await Product.findOne({ id: req.params.id }).exec();
    if (!product) {
        return res.status(204).json({ 'message': `User ID ${req.params.name} not found` });
    }
    const images = await Image.find({ productId: product._id }).exec();
    res.json({ ...product.toJSON(), images });
    // res.json(product);
}

const getAllProducts = async (req, res) => {
    const products = await Product.find();
    if (!products) return res.status(204).json({ 'message': 'No product found' });
    res.json(products);
}

const deleteProducts = async (req, res) => {
    if (req?.body?.isDeleteAll == true) {
        const [error, data] = await handlePromise(
            Product.deleteMany({})
        )
        if (error) {
            return next(new BadRequestError(500,
                'Đã xảy ra lỗi khi xóa tất cả xe!'))
        }

        return res.send({
            message: `Đã xóa thành công tất cả(${data.deletedCount}) xe!`,
        })
    }
    if (!req?.body?.id) return res.status(400).json({ "message": 'Product id required' });
    const product = await Product.findOne({ _id: req.body.id }).exec();
    if (!product) {
        return res.status(400).json({ 'message': `Product ID ${req.body.id} not found` });
    }
    const result = await product.deleteOne({ _id: req.body.id });
    res.json(result);
}

const updateProduct = async (req, res, next) => {
    // if (Object.keys(req.body).length === 0) {
    //     return next(new BadRequestError(400,
    //         'Dữ liệu không được để trống!'))
    // }

    const { id } = req.params
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    }

    const [error, document] = await handlePromise(
        Product.findOneAndUpdate(condition, req.body, {
            new: true,
        })
    )

    if (error) {
        return next(new BadRequestError(500,
            `Đã xảy ra lỗi khi cập nhật thông tin xe id=${req.params.id}`))
    }

    if (!document) {
        return next(new NotFoundError(404,
            'Không tìm thấy xe'))
    }

    return res.send({ message: 'Cập nhật thông tin xe thành công!', })
}

const onState = async (req, res) => {
    const { product_id } = req.body

    try {
        const product = await Product.findById(product_id);

        if (!product) {
            res.status(404).send({ message: 'Product not found' });
            return;
        }

        product.state = true;
        await product.save();
        res.status(201).send({ message: `Product ${product.name} state has been turned on` })


    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

const offState = async (req, res) => {
    const { product_id } = req.body
    try {
        const product = await Product.findById(product_id);

        if (!product) {
            res.status(404).send({ message: 'Product not found' });
            return;
        }

        product.state = false;
        await product.save();
        res.status(201).send({ message: `Product ${product.name} state has been turned off` })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const onOutStanding = async (req, res) => {
    const { product_id } = req.body

    try {
        const product = await Product.findById(product_id);

        if (!product) {
            res.status(404).send({ message: 'Product not found' });
            return;
        }

        product.outStanding = true;
        await product.save();
        res.status(201).send({ message: `Product ${product.name} is out standing` })


    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}

const offOutStanding = async (req, res) => {
    const { product_id } = req.body
    try {
        const product = await Product.findById(product_id);

        if (!product) {
            res.status(404).send({ message: 'Product not found' });
            return;
        }

        product.outStanding = false;
        await product.save();
        res.status(201).send({ message: `Product ${product.name} isn't out standing` })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { getProduct, getAllProducts, deleteProducts, updateProduct, onState, offState, onOutStanding, offOutStanding };