const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Add this route handler for downloading all reviews as PDF
router.get("/download-pdf", async (req, res) => {
    try {
      const reviews = await Review.find();
  
      // Create a new PDF document
      const doc = new PDFDocument();
      const filename = 'all_reviews.pdf';
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      doc.pipe(res);
  
      // Write reviews data to the PDF
      reviews.forEach((review, index) => {
        doc.text(`Review ${index + 1}:`);
        doc.text(`Title: ${review.title}`);
        doc.text(`Content: ${review.content}`);
        doc.text(`Rating: ${review.rating}`);
        doc.text(`Created At: ${review.createdAt}`);
        doc.moveDown();
      });
  
      // Finalize the PDF
      doc.end();
  
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

// Create a review
router.post("/", async (req, res) => {
    try {
        await Review.create(req.body);
        res.json({ msg: "Feedback added successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ msg: "Feedback adding failed" });
    }
});

// Get all reviews
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ msg: "No Feedback found" });
    }
});

// Get a review by ID
router.get("/:id", async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (review) {
            res.json(review);
        } else {
            res.status(400).json({ msg: "Cannot find this feedback" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ msg: "Cannot find this feedback" });
    }
});

// Update a review by ID
router.put("/:id", async (req, res) => {
    try {
        await Review.findByIdAndUpdate(req.params.id, req.body);
        res.json({ msg: "Update successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ msg: "Update Failed" });
    }
});

// Delete a review by ID
router.delete("/:id", async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ msg: "Delete successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ msg: "Cannot delete" });
    }
});


module.exports = router;
