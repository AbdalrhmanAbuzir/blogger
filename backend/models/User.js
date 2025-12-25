
const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: {
    type:String,
    required:true,
    trim:true,
    minLength:2,
    maxLength:50,
  },
  email: {
    type:String,
    required:true,
    trim:true,
    minLength:2,
    maxLength:50,
    unique:true
  },
  password: {
    type:String,
    required:true,
    trim:true,
    minLength:8,
  },
  profilePhoto: {
    type:Object,
    default:{
        url:"https://pixabay.com/vectors/profile-user-internet-man-42914/",
        publicId:null
    }
  },bio: {
        type: String,
    },
    isAdmin: {
        type:Boolean,
        default: false,
    },
    isAccountVerified: {
        type:Boolean,
        default: false,
    },
},{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


// Populate Posts That Belongs To This User When he/she Get his/her Profile
UserSchema.virtual("posts", {
    ref: "Post",
    foreignField: "user",
    localField: "_id",
});


// Generate token
UserSchema.methods.generateAuthToken = function() {
    return jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET);
}

const User= mongoose.model("User", UserSchema);


function validateRegisterUser(obj){
const Schema = Joi.object({
    username: Joi.string().trim().min(2).max(50).required(), 
    email: Joi.string().trim().min(2).max(50).required().email(),
    password: Joi.string().trim().min(8).required(),
});

return Schema.validate(obj)
}


function validateLoginUser(obj){

const Schema = Joi.object({ 
    email: Joi.string().trim().min(2).max(50).required().email(),
    password: Joi.string().trim().min(8).required(),
});

return Schema.validate(obj)
}

function validateUpdateUser(obj){

const Schema = Joi.object({ 
    username: Joi.string().trim().min(2).max(50),
    password: Joi.string().trim().min(8),
    bio:Joi.string().trim()
});

return Schema.validate(obj)
}


module.exports={
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser
}


