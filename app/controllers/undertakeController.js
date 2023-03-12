const Undertake = require('../model/Undertake')

const createUndertakea = async (req, res) => {
    const count = await Undertake.countDocuments()
    if (count >= 1) return res.status(400).json({ "message": "Nếu đã từng tạo mới, vui lòng ấn Hoàn thành!!!" })

    try {
        const { heading, title, description } = req.body
        const newUndertake = new Undertake({ heading, title, description })
        const result = await newUndertake.save()
        res.json(result.toJSON())
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: 'Failed to create new Undertake' })
    }
}

const createUndertake = async (req, res) => {
    const count = await Undertake.countDocuments()
    if (count >= 1) return res.status(400).json({ "message": "Nếu đã từng tạo mới, vui lòng ấn Hoàn thành!!!" })

    try {
        const { heading, titleList, descriptionList } = req.body
        const newTitleList = titleList.map(title => title.title)
        const newDescriptionList = descriptionList.map(description => description.description)
        const newUndertake = new Undertake({ heading, title: newTitleList, description: newDescriptionList })
        const result = await newUndertake.save()
        res.json(result.toJSON())
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: 'Failed to create new Undertake' })
    }
}

const updateUndertake = async (req, res, next) => {
    try {
        const { heading, titleList, descriptionList } = req.body
        const newTitleList = titleList.map(title => title.title)
        const newDescriptionList = descriptionList.map(description => description.description)

        const count = await Undertake.countDocuments()
        if (count == 0) {
            return res.status(404).json({ message: 'Chưa từng tồn tại thông tin cam kết, vui lòng ấn Tạo mới!!!' });
        }

        const updateResult = await Undertake.updateMany(
            {},
            { heading, title: newTitleList, description: newDescriptionList },
            { new: true }
        );

        return res.status(200).json({ undertake: updateResult });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUndertake = async (req, res) => {
    const undertakes = await Undertake.find();
    if (!undertakes) return res.status(204).json({ 'message': 'No undertake found' });
    res.json(undertakes);
}

module.exports = {
    createUndertake,
    updateUndertake,
    getAllUndertake
}