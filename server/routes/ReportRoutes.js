const express = require("express");
const router = express.Router();
const Report = require("../models/report");

// Test route
router.get("/test", (req, res) => res.send("Report routes working"));

// Create a new report
router.post("/", (req, res) => {
    Report.create(req.body)
        .then(() => res.json({ msg: "Report added successfully" }))
        .catch(() => res.status(400).json({ msg: "Report adding failed" }));
});

// Get all reports
router.get("/", (req, res) => {
    Report.find()
        .then((reports) => res.json(reports))
        .catch(() => res.status(400).json({ msg: "No reports found" }));
});

// Get report by ID
router.get("/:id", (req, res) => {
    Report.findById(req.params.id)
        .then((report) => res.json(report))
        .catch(() => res.status(400).json({ msg: "Cannot find this report" }));
});

// Update report by ID
router.put("/:id", (req, res) => {
    Report.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({ msg: "Report updated successfully" }))
        .catch(() => res.status(400).json({ msg: "Update failed" }));
});

// Delete report by ID
router.delete("/:id", (req, res) => {
    Report.findByIdAndDelete(req.params.id)
        .then(() => res.json({ msg: "Report deleted successfully" }))
        .catch(() => res.status(400).json({ msg: "Cannot delete report" }));
});

module.exports = router;
