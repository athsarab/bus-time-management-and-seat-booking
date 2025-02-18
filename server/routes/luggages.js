const express = require("express");

const router = express.Router();

const Luggages = require("../models/luggage");

//test
router.get("/test", (req, res) => res.send("Luggages routes working .."));

router.post("/", (req, res) => {
    Luggages.create(req.body)
    .then(() => res.json({msg: "Luggage added successfully"}))
    .catch(() => res.status(400).json({msg: "Luggage adding failed"}));
});

router.get("/", (req, res) => {
    Luggages.find()
    .then((luggages) => res.json(luggages))
    .catch(() => res.status(400).json({msg: "Luggage not found"})); 
});

router.get("/:id", (req, res) => {
    Luggages
    .findById(req.params.id)
    .then((luggages) => res.json(luggages))
    .catch(() => res.status(400).json({msg: "Can not find this luggage"}));
});

router.put("/:id", (req, res) => {
    Luggages
    .findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(() => res.json({msg: "Update successfull.."}))
    .catch(() => res.status(400).json({msg: "Update failed"}));
});

router.delete("/:id", (req, res) => {
    Luggages
    .findByIdAndDelete(req.params.id)
    .then(() => res.json({msg: "Delete successfull.."}))
    .catch(() => res.status(400).json({msg: "Delete failed"}));
})



module.exports = router;
