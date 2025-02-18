const express = require("express");

const router = express.Router();

const Packages = require("../models/package");

//test
router.get("/test",(req,res)=>res.send("Package routes is working"));

router.post("/",(req,res)=>{
    Packages.create(req.body)
    .then(()=>res.json({msg:"Package added succesfully"}))
    .catch(()=>res.status(400).json({msg:"Package adding failed"}));
});

router.get("/",(req,res)=>{
    Packages.find()
    .then((packages)=>res.json(packages))
    .catch(()=>res.status(400).json({msg:"No packages found"}));
});

router.get("/:id",(req,res)=>{
    Packages
    .findById(req.params.id)
    .then((packages) => res.json(packages))
    .catch(()=>res.status(400).json({msg:"Cannot find this package"}));
});

router.put("/:id",(req,res)=>{
    Packages
    .findByIdAndUpdate(req.params.id, req.body)
    .then(()=>res.json({msg:"Update succesfully"}))
    .catch(()=>res.status(400).json({msg:"Update faild"}));
});

router.delete("/:id",(req,res)=>{
    Packages
    .findByIdAndDelete(req.params.id)
    .then(()=>res.json({msg:"Delete succesfully"}))
    .catch(()=>res.status(400).json({msg:"Cannot be delete"}));
});

module.exports = router;