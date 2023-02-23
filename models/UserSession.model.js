const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSessionSchema = new Schema(
  {
    sentence: {
      type: String,
      required: true,
    },
    answer: [String],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    language: [
      {
        type: Schema.Types.ObjectId,
        ref: "Language",
      },
    ],
    chat: [String],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const UserSession = model("UserSession", userSessionSchema);

module.exports = UserSession;
