const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    star: {
      type: Number,
      default: 0,
      Range: [0, 5],
    },
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model('Product', ProductSchema);
