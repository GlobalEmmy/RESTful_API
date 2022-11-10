const express = require("express");
const bodyParser =require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost:27017/skillDB');

const skillSchema = {
    language: String,
    level: String
}
const Skill = mongoose.model('Skill', skillSchema);

const skill_1 = new Skill({ 
    language: 'Nodejs',
    level: "Intermediate" 
});
// skill_1.save()

app.get ("/skill", (req, res) => {
    Skill.find((err, foundSkill) => {
        if (!err){
        // console.log(foundSkill)
        res.send(foundSkill)
        }else {
            res.send(err)
        }
       
    })
});

app.post ("/skill", (req,res) => {

    const newSkill = new Skill({ 
        language: req.body.language,
        level: req.body.level 
    });
    newSkill.save((err) => {
        if (!err) {
            res.send("Saved successfully")
        } else {
            res.send (err)
        }
    });

    app.delete ("/skill", (req, res) => {
        Skill.deleteMany ((err) => {
            if (!err) {
                res.send("Deleted successfully")
            } else {
                res.send (err)
            }
        })
    });


    // console.log(req.body.language)
    // console.log(req.body.level)
})
 const PORT = process.env.PORT || 3000;
app.listen (PORT, () => {
    console.log(`Server running successfully on port: ${PORT}`)
})