const express = require("express");
const router = express.Router();
const Event = require("../models/eventModel");

const eventCntrl = {
  postevent: async (req, res) => {
    try {
      
      const {
        title,
        time,
        category,
        pic,
        duedate,
        price,
        breifDescription,
        fullDescription,
        currentBooking,
        finaldate,
      } = req.body;
      if (
        !title ||
        !time ||
        !category ||
        !duedate ||
        !price ||
        !breifDescription ||
        !fullDescription ||
        !pic ||
        !finaldate
      ) {
        return res.status(400).json({ error: "fill all fields" });
      }
      const event = new Event({
        title,
        time,
        category,
        price,
        duedate,
        finaldate,
        breifDescription,
        fullDescription,
        currentBooking,
        photo: pic,
      });
      await event.save();
      console.log(req.body.pic);
      console.log(
        title,
        time,
        category,
        price,
        duedate,
        finaldate,
        currentBooking,
        breifDescription,
        fullDescription
      );
     return  res.status(200).json({ msg: "Event Posted Successfully" });
    } catch (error) {
      console.log(error);
      console.log(error);
      return res.status(400).json({ error });
    }
  },

  getallevent: async (req, res) => {
    try {
      const events = await Event.find();
      res.send(events);
      console.log(events);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },

singleEvent : async(req,res)=>{
  try {
    const postId =  req.params.id ; 
  const post  = await Event.findById(postId)
  res.send(post);
  } catch (error) {
    res.status(400).json({ error: "error" });
  
  }
} ,


editevent: async (req, res) => {
  try {
    const updateevents = await Event.findByIdAndUpdate(
      
      {
      _id:req.body._id 
      },
      {
      title:req.body.title,
      time:req.body.time,
      category:req.body.category,
      price:req.body.price,
      duedate : req.body.duedate,
      breifDescription:req.body.breifDescription,
      fullDescription:req.body.fullDescription,
      photo:req.body.pic 
    },
    {
      new:true
    });
    res.send(updateevents);
    console.log(updateevents);
  } catch (error) {
    res.status(400).json({ error });
  }
},

  deletevent: async (req, res) => {
  try {
    const deleteevents = await Event.findByIdAndDelete({_id:req.body._id  },
  );
    res.send(deleteevents); 
  } catch (error) {
    res.status(400).json({ msg: "deleted " });
  }
},
};



module.exports = eventCntrl;
