const Color = require('../model/color.model')

const createColor = async (req, res) => {
  const { name } = req.body
  
  try {
    const foundColor = await Color.findOne({ name })
    if (foundColor) {
      return res.status(422).send({ message: `Màu ${name} đã tồn tại!` })
    }
    
    const color = await Color.create({ name })
    res.status(201).json(color)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteColor = async (req, res) => {
  const { id } = req.params
  
  try {
    const deletedColor = await Color.findByIdAndDelete(id)
    
    if (!deletedColor) {
      return res.status(404).send({ message: 'Không tìm thấy màu' })
    }
    
    res.json({ message: 'Màu đã được xóa thành công' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getAllColors = async (req, res) => {
  try {
    const colors = await Color.find({})
    res.json(colors)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { createColor, deleteColor, getAllColors }