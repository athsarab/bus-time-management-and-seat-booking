const express = require("express");

const router = express.Router();

const booking = require("../models/booking");

//testing
router.get("/test",(req,res) => res.send("Routes working"));

router.post ("/", (req,res) =>{
    booking.create(req.body)
   .then(()=>res.json({msg:"Booking successfully "}))
   .catch(()=>res.status(400).json({msg:"Booking failed"}));
     
});

router.get("/",(req,res) =>{
    booking.find()
    .then((bookings)=>res.json(bookings))
    .catch(()=>res.status(400).json({msg:"No bookings found"})); 

});

router.get("/:id",(req,res) =>{
    booking.findById(req.params.id)
    .then((bookings)=>res.json(bookings))
    .catch(()=>res.status(400).json({msg:"Cannot find booking"})); 

});

router.put("/:id",(req,res)=>{
    booking.findByIdAndUpdate(req.params.id,req.body)
    .then(()=>res.json({msg:"Update successful"}))
    .catch(() => res.status(400).json({msg:"Update failed"}))
    
});

router.delete("/:id",(req,res) => {
    booking.findByIdAndDelete(req.params.id)
    .then(() => res.json({msg:"Deleted successfully"}))
    .catch(() => res.status(400).json({msg:"Cannot be Deleted"}))

});





module.exports = router;