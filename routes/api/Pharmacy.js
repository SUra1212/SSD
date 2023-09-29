const express = require("express");
const Pharmacy = require("../../models/Pharmacy");

const router = express.Router();

//save appointment
router.post("/pharmacy/save", (req, res) => {
  let newPost = new Pharmacy(req.body);

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
router.get("/pharmacy", (req, res) => {
  Pharmacy.find().exec((err, posts) => {
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
router.get("/pharmacy/:id", (req, res) => {
  let postId = req.params.id;

  Pharmacy.findById(postId, (err, post) => {
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
router.put("/pharmacy/update/:id", (req, res) => {
  Pharmacy.findByIdAndUpdate(
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
router.delete("/pharmacy/delete/:id", (req, res) => {
  Pharmacy.findByIdAndRemove(req.params.id).exec((err, deletedpost) => {
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
