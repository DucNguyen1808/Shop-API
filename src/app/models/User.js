const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    address: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(this.password, salt);
    this.password = hash;
  } catch (error) {
    next(error);
  }
});
userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
