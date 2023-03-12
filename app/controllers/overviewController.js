const Overview = require('../model/Overview')
const { BadRequestError } = require('../api-error')
const handlePromise = require('../helpers/promise.helper')
const mongoose = require('mongoose')

const handleCreateOverview = async (req, res) => {
    const { heading, staff, carsSold, yearOfOperation, customerSatisfied } = req.body

    const count = await Overview.countDocuments();
    if (count >= 1) return res.status(400).json({ "message": "Nếu đã từng tạo mới, vui lòng ấn Hoàn thành!!!" })

    try {
        const result = await Overview.create({
            "heading": heading,
            "staff": staff,
            "carsSold": carsSold,
            "yearOfOperation": yearOfOperation,
            "customerSatisfied": customerSatisfied,
        })
        console.log(result);
        res.status(201).send({ message: `New contact ${heading} created successfully!` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

const updateOverview = async (req, res, next) => {
    try {
        const { heading, staff, yearOfOperation, carsSold, customerSatisfied } = req.body;
        const count = await Overview.countDocuments();

        const updateResult = await Overview.updateMany(
            {},
            { heading, staff, yearOfOperation, carsSold, customerSatisfied },
            { new: true }
        );

        if (count == 0) {
            return res.status(404).json({ message: 'Chưa từng tồn tại thông tin tổng quan, vui lòng ấn Tạo mới!!!' });
        }

        return res.status(200).json({ overview: updateResult });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllOverview = async (req, res) => {
    const overviews = await Overview.find();
    if (!overviews) return res.status(204).json({ 'message': 'No overview found' });
    res.json(overviews);
}

module.exports = {
    handleCreateOverview,
    updateOverview,
    getAllOverview
}