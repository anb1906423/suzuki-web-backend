const Contact = require('../model/Contact')
const { BadRequestError } = require('../api-error')
const handlePromise = require('../helpers/promise.helper')
const mongoose = require('mongoose')

const handleCreateContact = async (req, res) => {
    const { address, email, phoneNumber, linkToFace, zalo, linkToMessenger, instagram, youtube, tiktok, website } = req.body

    const count = await Contact.countDocuments();
    if (count >= 1) return res.status(400).json({ "message": "Nếu đã từng tạo mới, vui lòng ấn Hoàn thành!!! " })

    try {
        const result = await Contact.create({
            "address": address,
            "email": email,
            "phoneNumber": phoneNumber,
            "linkToFace": linkToFace,
            "zalo": zalo,
            "linkToMessenger": linkToMessenger,
            "instagram": instagram,
            "youtube": youtube,
            "tiktok": tiktok,
            "website": website
        })
        console.log(result);
        res.status(201).send({ message: `New contact ${address} created successfully!` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

const updateContact = async (req, res, next) => {
    const { address, email, phoneNumber, linkToFace, zalo, linkToMessenger, instagram, youtube, tiktok, website } = req.body;
    const count = await Contact.countDocuments();

    try {
        const contact = await Contact.updateMany(
            {},
            { address, email, phoneNumber, linkToFace, zalo, linkToMessenger, instagram, youtube, tiktok, website },
            { new: true }
        );

        if (count == 0) {
            return res.status(404).json({ message: 'Chưa từng tồn tại thông tin liên hệ, vui lòng ấn Tạo mới!!!' });
        }

        return res.status(200).json({ contact: contact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllContact = async (req, res) => {
    const contacts = await Contact.find();
    if (!contacts) return res.status(204).json({ 'message': 'No contact found' });
    res.json(contacts);
}

module.exports = {
    handleCreateContact,
    updateContact,
    getAllContact
}