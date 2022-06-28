const express = require("express");
const router = express.Router();
const Blog = require("../models/BlogModel");

const blogCntrl = {
  createblog: async (req, res) => {
        try {
      const { title, message, category } = req.body;

      const blog = new Blog({
        title,
        message,
        category,
        photo: "https://reactjs.org/logo-og.png",
      });
      console.log(blog);
      await blog.save();
      return res.status(200).json(blog);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },

  allblogs: async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.send(blogs);
      console.log(blogs);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },

  oneblog: async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Blog.findById(postId);
      res.send(post);
    } catch (error) {
      res.status(400).json({ error: "error" });
    }
  },

  editblog: async (req, res) => {
    try {
      const updateblog = await Blog.findByIdAndUpdate(
        
        {
        _id:req.body._id 
        },
        {
          title:req.body.title,
        message:req.body.message,
        category:req.body.category
      },
      {
        new:true
      });
      res.send(updateblog);
      console.log(updateblog);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  deleteblog: async (req, res) => {
    try {
      const deleteblogs = await Blog.findByIdAndDelete({_id:req.body._id  },
    );
      res.send(deleteblogs); 
    } catch (error) {
      res.status(400).json({ msg: "deleted " });
    }
  },
};

module.exports = blogCntrl;
