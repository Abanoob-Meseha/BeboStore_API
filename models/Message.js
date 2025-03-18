const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    userID: mongoose.Schema.Types.ObjectId,
    user_img: String,
    username: String,
    content: String,
  },
  { timestamps: true }
);

const Message = mongoose.model("Message" , messageSchema);

module.export = {Message} ;