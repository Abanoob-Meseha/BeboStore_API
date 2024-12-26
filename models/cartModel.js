const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userID:{

    },
    products:{
        type: Array,
    },

});

const cartModel = mongoose.model("Cart" , cartSchema);

module.exports = {
    cartModel
}
