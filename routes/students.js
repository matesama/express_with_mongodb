import express from "express";
import Student from "../models/Student.js";

const studentsRouter = express.Router();

//handleErrors:
const handleErrors = (err) => {
    let errors = { name: '', first_name: '', email: '' };

    //unique email error handling: duplicate error code
    if(err.code === 11000) {
        errors.email = "That email is already registered"
        return errors;
    }

    //validate errors
    if(err.message.includes('Student validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}
//Read all
studentsRouter.get("/", async (req, res) => {
    try{
        const response = await Student.find();
        res.json(response);
    } catch(err) {
        res.status(500).json(err);
    }
})
//Read a particular student
studentsRouter.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const response = await Student.findById(id);
        if(!response) {
            res.status(404).json({error: "not found"});
        }
        res.json(response);
    } catch(err) {
        res.status(500).json(err);
    }
})
//Create a student
studentsRouter.post("/", async (req, res) => {
    try {
        const {name, first_name, email} = req.body;
        const response = await Student.create({name, first_name, email});
        res.status(201).json(response);
    } catch(err) {
        const errors = handleErrors(err);
        if(errors.name.length > 0 || errors.first_name.length > 0 || errors.email.length >0) {
            res.status(400).json({errors});
        } else {
            res.status(500).json(err);
        }
        
        
    }
})
//Update a particular student
studentsRouter.put("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {name, first_name, email} = req.body;
        const response = await Student.findByIdAndUpdate(id, {name, first_name, email});
        if(!response) {
            res.status(404).json({error: "not found"});
        }
        res.json(response);
    } catch(err) {
        if(errors.name.length > 0 || errors.first_name.length > 0 || errors.email.length >0) {
            res.status(400).json({errors});
        } else {
            res.status(500).json(err);
        }
    }
})
//Update name John to Bob
studentsRouter.put("/", async (req, res) => {
    try {
        const response = await Student.updateMany({ name: "John" }, 
            {$set: { name: "Bob"}});
        if(response.modifiedCount > 0) {
            const updatedNames = await Student.find({name: "Bob"});
            res.json(updatedNames);
        }else{
            res.json("No value got updated");
        }
    } catch(err) {
            res.status(500).json(err);
    }
})
//Delete a particular student
studentsRouter.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const response = await Student.findOneAndDelete(id);
        if(!response) {
            res.status(404).json({error: "not found"});
        }
        res.json(response);
    } catch(err) {
        res.status(500).json(err);
    }
})
//Delete all documents in the collection
studentsRouter.delete("/", async (req, res) => {
    try {
        const response = await Student.deleteMany({});
        res.json(response);
    } catch(err) {
        res.status(500).json(err);
    }
})

export default studentsRouter;