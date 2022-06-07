const mongoose = require("mongoose");

const studentschema = new mongoose.Schema(
  {
    studentname: {
      type: String,
      required: true,
    },
    mobileno: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmpassword: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "no photo",
    },

    linkedin: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    appliedcandiates: {
      type: [],
    },
  },
  {
    timestamps: true,
  }
);

const studentModel = new mongoose.model("Student", studentschema);
module.exports = studentModel;
