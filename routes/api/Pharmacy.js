const express = require("express");
const Pharmacy = require("../../models/Pharmacy");

const router = express.Router();

// Save drug
router.post("/pharmacy/save", async (req, res) => {
  try {
    // Perform input validation/sanitization here
    if(!req.body.medicineName||typeof req.body.medicineName !== "string"||req.body.medicineName.trim().length ===0
    ||!req.body.type||typeof req.body.type !=="string"||req.body.type.trim().length ===0 
    ||!req.body.quantity||typeof req.body.quantity !=="string"||req.body.quantity.trim().length ===0
    ||!req.body.expirationDate||typeof req.body.expirationDate !=="string"||req.body.expirationDate.trim().length ===0
    ||!req.body.price||typeof req.body.price !=="string"||req.body.price.trim().length ===0){
      throw new Error("Invalid inputs")
    }

    // Create a new Pharmacy instance with validated data
    const newPharmacy = new Pharmacy(req.body);

    // Save the newPharmacy object to the database
    await newPharmacy.save();

    return res.status(200).json({
      success: "Appointment Booked Successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: "Failed to book appointment",
    });
  }
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
