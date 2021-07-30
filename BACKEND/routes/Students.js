const router = require("express").Router();
let Student = require("../models/Student");

router.route("/test").get((req,res) => {
    
        return res.json("Pass");
    
})

router.route("/add").post((req,res) => {
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const birthDay = req.body.birthDay;

    const newStudent = new Student({
        name,
        age,
        gender,
        birthDay
    })

    newStudent.save().then(()=>{
        res.json("Student Added")
    }).catch((err)=>{
        res.json(err.message);
    })

})

router.route("/").get((req,res) => {
    Student.find().then((Students)=>{
        res.json(Students)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async (req,res) =>{
    let userId = req.params.id;
    const {name,age,gender,birthDay} = req.body;

    const updateStudent = {
        name,
        age,
        gender,
        birthDay
    }

    const update = await Student.findByIdAndUpdate(userId, updateStudent)
    .then(() =>{
        res.status(200).send({status: "User updated" });
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error while updateing", error: err.message()});
    })
})

router.route("/delete/:id").delete(async (req,res) =>{
    let userId = req.params.id;

    await Student.findByIdAndDelete(userId)
    .then(() =>{
        res.status(200).send({status: "User deleted"});
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error while deleting", error: err.message()});
    })
})

router.route("/get/:id").get(async (req,res) =>{
    let id = req.params.id;
    const user = await Student.findById(id,function (err, Student){
        return res.json( Student )
    }).catch((err)=>{
        return res.json( err )
    })
})

module.exports = router;