const express = require("express");
const router = express.Router();
const Event = require("../models/eventModel");
const EventBooking = require("../models/eventBooking");

const eventBookingCntrl = {
  eventbooking: async (req, res) => {
    const {
      userid,
      category,
      title,
      eventid,
      duedate,
      finaldate,
      breifDescription,
      price,
      photo,
    } = req.body;

    try {
      const neweventbooking = new EventBooking({
        category,
        title,
        eventid,
        userid,
        duedate,
        finaldate,
        breifDescription,
        price,
        photo,
        paymentId: "123123",
      });

      const booking = await neweventbooking.save({
        category,
        title,
        eventid,
        userid,
        duedate,
        finaldate,
        price,
        photo,
        breifDescription,
        paymentId: "123",
      });

      return res.send(booking);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  eventbookingBtId: async (req, res) => {
    const userid = req.body.userid;
    try {
      const bookings = await EventBooking.find({ userid: userid });
      console.log(bookings);
      res.send(bookings);
    } catch (error) {
      res.status(400).json({ error: "error" });
    }
  },

  cancelBooking: async (req, res) => {
    const userid = req.body.userid;
    try {
      const bookings = await EventBooking.find({ userid: userid });
      console.log(bookings);
      res.send(bookings);
    } catch (error) {
      res.status(400).json({ error: "error" });
    }
  },
};

module.exports = eventBookingCntrl;
