const express = require("express");
const PatientCheckin = require("../../models/PatientCheckin");

const router = express.Router();

// Save Patient Checking Details
router.post("/pcheck/save", (req, res) => {
  const newPostData = req.body; // Assuming you have already validated and sanitized the input

  const newPost = new PatientCheckin(newPostData);

  newPost.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err.message, // Send the error message for better debugging
      });
    }

    return res.status(200).json({
      success: "Details saved Successfully",
    });
  });
});

// Get Patient Checking Details
router.get("/pcheck", (req, res) => {
  PatientCheckin.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err.message, // Send the error message for better debugging
      });
    }
    return res.status(200).json({
      success: true,
      existingPosts: posts,
    });
  });
});

// Get a Patient Checking Detail
router.get("/pcheck/:id", (req, res) => {
  const postId = req.params.id;

  PatientCheckin.findById(postId, (err, post) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    return res.status(200).json({
      success: true,
      post,
    });
  });
});

// Update Patient Checking Details
router.put("/pcheck/update/:id", (req, res) => {
  PatientCheckin.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }, // Return the updated document
    (err, post) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(200).json({
        success: "Updated Successfully",
        post,
      });
    }
  );
});

// Delete Patient Checking Details
router.delete("/pcheck/delete/:id", (req, res) => {
  PatientCheckin.findByIdAndRemove(req.params.id, (err, deletedpost) => {
    if (err) {
      return res.status(400).json({
        message: "Delete Unsuccessful",
        error: err.message,
      });
    }
    return res.json({
      message: "Delete Successful",
      deletedpost,
    });
  });
});

module.exports = router;