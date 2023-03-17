const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// const handleLogin = async (req, res) => {
//     const { email, pwd } = req.body;
//     if (!email || !pwd) return res.status(400).json({ "message": "Email and password are required" })
//     const foundUser = await User.findOne({ email: email }).exec()
//     if (!foundUser) {
//         res.status(401).send({ message: 'Thông tin tài khoản hoặc mật khẩu không chính xác!' }) //Incorrect username or password!
//         return
//     }
//     const match = await bcrypt.compare(pwd, foundUser.password);
//     if (!match) {
//         res.status(401).send({ message: 'Thông tin tài khoản hoặc mật khẩu không chính xác!' }) //Incorrect username or password!
//         return
//     }
//     if (match) {
//         const roles = foundUser.roles
//         // create JWTs
//         const accessToken = jwt.sign(
//             {
//                 "UserInfo": {
//                     "email": foundUser.email,
//                     "roles": roles
//                 },
//                 "refreshToken": foundUser.refreshToken // lưu thông tin refreshToken trong token
//             },
//             process.env.ACCESS_TOKEN_SECRET || 'access-token-secret',
//             { expiresIn: '10s' }
//         );

//         // Send authorization roles and access token to user
//         res.json({ accessToken, email, roles });

//     } else {
//         res.sendStatus(401);
//     }
// }

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email }).exec();

    if (!user) {
        return res.status(401).json({ message: 'Incorrect email or password!' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(401).json({ message: 'Incorrect email or password!' });
    }

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "email": user.email,
                "roles": 1
            }
        },
        process.env.ACCESS_TOKEN_SECRET || 'access-token-secret',
        { expiresIn: '10s' }
    );

    res.json({ accessToken, email: user.email, roles: 1 });
};

module.exports = { handleLogin };
