const router = require("express").Router();
let Lecturer = require("../models/Lecturer");

router.route("/test").get((req,res) => {
    
    return res.json("Pass");

})

router.route("/add").post((req,res) => {
    const name = req.body.name;
    const birthDay = req.body.birthDay;
    const qualification = req.body.qualification;
    const phone = req.body.phone;

    const newLecturer = new Lecturer({
        name,
        birthDay,
        qualification,
        phone
    })

    newLecturer.save().then(()=>{
        res.json("Lecturer Added")
    }).catch((err)=>{
        res.json(err.message);
    })

})

router.route("/").get((req,res) => {
    Lecturer.find().then((Lecturers)=>{
        res.json(Lecturers)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async (req,res) =>{
    let userId = req.params.id;
    const {name,birthDay,qualification,phone} = req.body;

    const updateLecturer = {
        name,
        birthDay,
        qualification,
        phone 
    }

    const update = await Lecturer.findByIdAndUpdate(userId, updateLecturer)
    .then(() =>{
        res.status(200).send({status: "User updated" });
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error while updateing", error: err.message()});
    })
})

router.route("/delete/:id").delete(async (req,res) =>{
    let userId = req.params.id;

    await Lecturer.findByIdAndDelete(userId)
    .then(() =>{
        res.status(200).send({status: "User deleted"});
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error while deleting", error: err.message()});
    })
})

router.route("/get/:id").get(async (req,res) =>{
    let id = req.params.id;
    const user = await Lecturer.findById(id,function (err, Lecturer){
        return res.json( Lecturer )
    }).catch((err)=>{
        return res.json( err )
    })
})

module.exports = router;