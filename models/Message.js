const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    userID: {type: mongoose.Schema.Types.ObjectId , ref: 'User'},
    user_img: String,
    username: String,
    content: String,
  },
  { timestamps: true }
);

const Message = mongoose.model("Message" , messageSchema);

module.export = Message ;