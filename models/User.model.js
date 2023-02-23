const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    progress: Number, 
    
    nativeLanguage: {
      type: String,
    },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    image: {
      type:String,
      default:"https://res.cloudinary.com/dmm8iusle/image/upload/v1677086060/istockphoto-1125089587-170667a_gh0zbo.jpg",
    }
  
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
