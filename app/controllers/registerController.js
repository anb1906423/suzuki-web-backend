const User = require('../model/User')
const bcrypt = require('bcrypt')

const handleRegister = async (req, res) => {
    let roles = 0

    // Tìm số lượng người dùng hiện có trong hệ thống
    const countUser = await User.countDocuments()

    // Nếu số lượng người dùng <= 1, gán role = 1
    if (countUser <= 1) {
        roles = 1;
    }

    const { fullName, phoneNumber, email, password, modelInterest, isCash, province } = req.body

    // Kiểm tra các trường bắt buộc
    if (!fullName || !phoneNumber) {
        return res.status(400).json({ message: 'Họ và tên, số điện thoại không được để trống!' })
    }

    // Kiểm tra định dạng email hợp lệ
    // const validEmail = /\S+@\S+\.\S+/
    // if (!validEmail.test(email)) {
    //     return res.status(400).json({ message: 'Địa chỉ email không hợp lệ!' })
    // }

    // Kiểm tra mật khẩu độ dài tối thiểu
    // if (password.length < 8) {
    //     return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 8 ký tự!' })
    // }

    // Kiểm tra email đã tồn tại trong hệ thống chưa
    // const foundEmail = await User.findOne({ email: email }).exec()
    // if (foundEmail) {
    //     return res.status(400).json({ message: 'Địa chỉ email đã được sử dụng!' })
    // }

    // Kiểm tra số điện thoại đã tồn tại trong hệ thống chưa
    const foundPhoneNumber = await User.findOne({ phoneNumber: phoneNumber }).exec()
    if (foundPhoneNumber) {
        return res.status(400).json({ message: 'Số điện thoại đã được sử dụng!' })
    }

    try {
        // Mã hóa mật khẩu trước khi lưu vào database
        const hashedPassword = await bcrypt.hash(password, 10)

        // Tạo mới user
        const newUser = await User.create({
            fullName,
            phoneNumber,
            email,
            password: hashedPassword,
            modelInterest,
            isCash,
            province,
            roles
        })

        console.log(newUser)

        res.status(201).json({ message: `Tạo tài khoản thành công cho ${fullName}!` })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { handleRegister }
