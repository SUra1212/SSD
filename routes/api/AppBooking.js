const express = require("express");
const AppBooking = require("../../models/AppBooking");

const router = express.Router();

//save appointment
router.post("/appbooking/save", (req, res) => {
  let newPost = new AppBooking(req.body);

  newPost.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    return res.status(200).json({
      success: "Appointment Booked Successfully",
    });
  });
});

//get appointments
router.get("/appbooking", (req, res) => {
  AppBooking.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingPosts: posts,
    });
  });
});

//get a specific appointment
router.get("/appbooking/:id", (req, res) => {
  let postId = req.params.id;

  AppBooking.findById(postId, (err, post) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({
      success: true,
      post,
    });
  });
});

//update appointment
router.put("/appbooking/update/:id", (req, res) => {
  AppBooking.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Updated Succesfully",
      });
    }
  );
});

//delete notes
router.delete("/appbooking/delete/:id", (req, res) => {
  AppBooking.findByIdAndRemove(req.params.id).exec((err, deletedpost) => {
    if (err)
      return res.status(400).json({
        message: "Delete Unsuccesfull",
        err,
      });
    return res.json({
      message: "Delete Successfull",
      deletedpost,
    });
  });
});

module.exports = router;
