const express = require("express");
const PatientCheckin = require("../../models/PatientCheckin");

const router = express.Router();

//save appointment
router.post("/pcheck/save", (req, res) => {
  let newPost = new PatientCheckin(req.body);

  newPost.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    return res.status(200).json({
      success: "Details saved Successfully",
    });
  });
});

//get appointments
router.get("/pcheck", (req, res) => {
  PatientCheckin.find().exec((err, posts) => {
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
router.get("/pcheck/:id", (req, res) => {
  let postId = req.params.id;

  PatientCheckin.findById(postId, (err, post) => {
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
router.put("/pcheck/update/:id", (req, res) => {
  PatientCheckin.findByIdAndUpdate(
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
router.delete("/pcheck/delete/:id", (req, res) => {
  PatientCheckin.findByIdAndRemove(req.params.id).exec((err, deletedpost) => {
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
