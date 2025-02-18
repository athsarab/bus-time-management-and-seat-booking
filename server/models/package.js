const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
    packageID:{
        type:String,
        required: true,
    },
    name:{
        type:String,

    },
    price:{
        type:String,
    },
    description:{
        type:String,
    },
});

module.exports = Package = mongoose.model("package",PackageSchema);