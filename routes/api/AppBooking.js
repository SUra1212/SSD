const express = require("express");
const AppBooking = require("../../models/AppBooking");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Save appointment
router.post(
  "/appbooking/save",
  [
    //validation
    body("title").notEmpty().trim().isLength({ max: 255 }),
    body("pname").notEmpty().trim().isLength({ max: 255 }),
    body("mobile").notEmpty().trim().isMobilePhone(),
    body("date").isISO8601(),
    body("email").notEmpty().trim().isEmail(),
    body("nicpass")
      .notEmpty()
      .trim()
      .isLength({ min: 12, max: 12 })
      .isNumeric(),
    body("area").notEmpty().trim().isLength({ max: 255 }),
  ],
  validate,
  (req, res) => {
    const newPost = new AppBooking(req.body);

    newPost.save((err) => {
      if (err) {
        return res.status(500).json({
          error: "Internal Server Error. Failed to save appointment.",
        });
      }

      return res.status(200).json({
        success: "Appointment booked successfully.",
      });
    });
  }
);

// Get appointments
router.get("/appbooking", (req, res) => {
  AppBooking.find().exec((err, posts) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error. Failed to fetch appointments.",
      });
    }
    return res.status(200).json({
      success: true,
      existingPosts: posts,
    });
  });
});

// Get a specific appointment
router.get("/appbooking/:id", (req, res) => {
  const postId = req.params.id;

  AppBooking.findById(postId, (err, post) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error. Failed to fetch appointment.",
      });
    }

    if (!post) {
      return res.status(404).json({
        error: "Appointment not found.",
      });
    }

    return res.status(200).json({
      success: true,
      post,
    });
  });
});

// Update appointment
router.put(
  "/appbooking/update/:id",
  [
    //validation
    body("title").notEmpty().trim().isLength({ max: 255 }),
    body("pname").notEmpty().trim().isLength({ max: 255 }),
    body("mobile").notEmpty().trim().isMobilePhone(),
    body("date").isISO8601(),
    body("email").notEmpty().trim().isEmail(),
    body("nicpass")
      .notEmpty()
      .trim()
      .isLength({ min: 12, max: 12 })
      .isNumeric(),
    body("area").notEmpty().trim().isLength({ max: 255 }),
  ],
  validate,
  (req, res) => {
    AppBooking.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (err, post) => {
        if (err) {
          return res.status(500).json({
            error: "Internal Server Error. Failed to update appointment.",
          });
        }

        if (!post) {
          return res.status(404).json({
            error: "Appointment not found.",
          });
        }

        return res.status(200).json({
          success: "Appointment updated successfully.",
        });
      }
    );
  }
);

// Delete appointment
router.delete("/appbooking/delete/:id", (req, res) => {
  AppBooking.findByIdAndRemove(req.params.id, (err, deletedpost) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error. Failed to delete appointment.",
      });
    }

    if (!deletedpost) {
      return res.status(404).json({
        error: "Appointment not found.",
      });
    }

    return res.status(200).json({
      success: "Appointment deleted successfully.",
      deletedpost,
    });
  });
});

module.exports = router;
