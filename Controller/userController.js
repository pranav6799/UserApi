const User = require("../Model/UserModel");
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



const signToken = id => {
  return jwt.sign({
    id
  }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN
  })
};

const createSendToken = (user, statusCode, resp) => {
  const token = signToken(user._id)

  resp.cookie('jwt', token)


  user.password = undefined

  resp.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
      message: 'Successful'
    }
  })
}


exports.createUser = catchAsync(async (req, resp, next) => {

  const {
    name,
    email,
    password,
    phone
  } = req.body

  const existingUser = await User.findOne({
    email: email
  })

  if (existingUser) {
    return next(new AppError('User Already exist Kindly Login', 400))
  }

  const user = await User.create(req.body);
  const tok = jwt.sign({
    id: user._id
  }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN
  })

  createSendToken(user, 200, resp)

});

exports.login = catchAsync(async (req, resp, next) => {
  const {
    email,
    password
  } = req.body

  if (!email || !password) {
    return next(new AppError('Email and Passoword is required', 400))
  }

  const user = await User.findOne({
    email: email
  })

  if (!user || !(await (bcrypt.compare(password, user.password)))) {
    return next(new AppError('User does not exist kindly singUp', 400))
  }

  const token = jwt.sign({
    id: user._id
  }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN
  })

  

  createSendToken(user, 200, resp)
  next()
})




exports.getUser = catchAsync(async (req, resp, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new AppError('No user Found', 400))
  }

  resp.status(200).json({
    user
  })
});

exports.updateUser = catchAsync(async (req, resp, next) => {

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true
  })


  createSendToken(user, 200, resp)
  next()

});


exports.deleteUser = catchAsync(async (req, resp, next) => {
  const user = await User.findByIdAndDelete(req.params.id)

  if (!user) {
    return next(new AppError('No user found', 400))
  }

  resp.status(200).json({
    data: null
  })

})