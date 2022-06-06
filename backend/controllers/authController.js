const User = require('../models/user')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

// register a user => /api/v1/register
exports.registerUser = catchAsyncErrors ( async(req, res, next) => {

    const { name, email, password } = req.body

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatar/jdfhgjkef',
            url: 'https://scontent.ftun15-1.fna.fbcdn.net/v/t1.18169-9/13062505_537035953136166_3461174297813594061_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=174925&_nc_ohc=JCnpwjxXiaIAX9D6FAw&tn=d3hwOS7URAdjdK49&_nc_ht=scontent.ftun15-1.fna&oh=00_AT-dBkkbntmgLVv2h0D5ltrBUI8PL2siaWaW3Moz2Ixa2g&oe=62C4F428'
        }
    })

    res.status(201).json({
        success: true,
        user
    })
} )