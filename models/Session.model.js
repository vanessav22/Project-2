const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const sessionSchema = new Schema(
  {
    sentence: {
      type: String,
      required: true,
      unique: true,
    },
    answer: [
      {
        user: userId,
        answer: String,
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    chat: [
      {
        user: userId,
        text: String,
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Session = model("Session", sessionSchema);

module.exports = Session;