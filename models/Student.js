import mongoose from "mongoose";

  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const validateEmail = (email) => {
    return emailRegex.test(email);
  }

  const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        //minlength: [1, "The name cannot be empty"] not necessary since required takes care of empty strings. 
    },
    first_name: {
        type: String, 
        required: [true, "Please enter your first name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        trim: true, //trim removes the empty spaces.
        lowercase: true,
        unique: true,
        validate: [validateEmail, "Please enter a valid email"]
           // validate: {
        //     validator: email => emailRegex.test(email),
        //     message: props => `${props.value} is not a valid email`
        // },
        //match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please insert a valid email']
    },
})

const Student = mongoose.model('Student', StudentSchema);
export default Student;