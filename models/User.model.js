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
    nativeLanguage: {
      type: String,
    },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    image: {
<<<<<<< HEAD
      type:String,
      default:"https://res.cloudinary.com/dmm8iusle/image/upload/v1677086060/istockphoto-1125089587-170667a_gh0zbo.jpg",
    }
=======
      type: String,
      default:
        "https://as2.ftcdn.net/v2/jpg/03/03/62/45/1000_F_303624505_u0bFT1Rnoj8CMUSs8wMCwoKlnWlh5Jiq.jpg",
    },
>>>>>>> 0243775cfca9b2acc6d4d570373df555b80aeb97
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
