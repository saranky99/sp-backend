const mongoose = require("mongoose");
const blogschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
  },

  {
    timestamps: true,
  }
);

const blogModel = new mongoose.model("Blog", blogschema);
module.exports = blogModel;
