import mongoose from "mongoose";

  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const validateEmail = (email) => {
    return emailRegex.test(email);
  }



const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        minlength: [1, "Please enter your name"]
    },
    first_name: {
        type: String,
        minlength: [1, "Please enter your first name"],
        required: [true, "Please enter your first name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        lowercase: true,
        unique: true,
        validate: [validateEmail, "Please enter a valid email"]
    },
})

const Student = mongoose.model('Student', StudentSchema);
export default Student;