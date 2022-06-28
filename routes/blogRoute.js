const express = require("express");
const router = express.Router();
const blogCntrl = require("../controllers/blogController");

//post events
router.post("/createblog", blogCntrl.createblog);
//get all ecents
router.get("/allblogs", blogCntrl.allblogs);
//get one post
router.get("/oneblog/:id", blogCntrl.oneblog);
// // /edit events
router.put("/editblog/:id", blogCntrl.editblog);
// // /deleteevents
router.delete("/deleteblog/:id", blogCntrl.deleteblog);

module.exports = router;
