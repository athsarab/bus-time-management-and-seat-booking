const express = require("express");

const router = express.Router();

const Employees = require("../models/employee");


//test
router.get("/test",(req,res)=>res.send("Employee routes working"));

router.post("/",(req,res) =>{

    Employees.create(req.body).then(()=>res.json({msg:"Employee added succesfully "})).catch(()=>res.status(400).json({msg: "Employee adding failed"}));

});

router.get("/", (req,res) => {

    Employees.find().then((employees) => res.json(employees)).catch((err) => res.status(400).json({msg: "No employees found"}));

});



router.get("/:id", (req,res) => {

    Employees.findById(req.params.id).then((employees) => res.json(employees)).catch(() => res.status(400).json({msg: "cannot find this employee"}));

});


router.put("/:id", (req,res) => {

     Employees.findByIdAndUpdate(req.params.id,req.body).then(() => res.json({msg: "Update Successfully"}));

});


router.delete("/:id", (req,res) => {

     Employees>Employees.findByIdAndDelete(req.params.id).then(() => res.json({msg: "Delete Successfully"}));

});

router.get("/report", (req, res) => {
    Employees.find()
      .then((employees) => {
        // Create report content
        const reportContent = employees.map(employee => (
          `Name: ${employee.name}, Employee ID: ${employee.employeeID}, Mobile: ${employee.mobile}, Employee Type: ${employee.employeeType}`
        )).join('\n');
        
        // Set response headers for downloading the file
        res.setHeader('Content-disposition', 'attachment; filename=employee_report.txt');
        res.set('Content-Type', 'text/plain');
        res.send(reportContent);
      })
      .catch((err) => res.status(400).json({ msg: "No employees found" }));
  });

module.exports = router;