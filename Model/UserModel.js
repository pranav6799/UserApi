const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const emailValidator = {
  validator: (value) => {
    return validator.isEmail(value);
  },
  message: "Invalid email format. Please provide a valid email address.",
};

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: "String",
    required: true,
    validate: emailValidator,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (userPassword,candidatePassword) {
    return await bcrypt.compare(userPassword,candidatePassword)
};

const User = mongoose.model("User", userSchema);

module.exports = User;
