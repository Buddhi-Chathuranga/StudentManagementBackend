const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lecturerSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    birthDay : {
        type : String,
        required : true
    },
    qualification: {
        type : String,
        required : true
    },
    phone: {
        type : String,
        required : true
    }
})

const Lecturer = mongoose.model("Lecturer",lecturerSchema);

module.exports = Lecturer;