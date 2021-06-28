const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
//     transactions: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Transaction"
//         }
//     ]
  })
);

module.exports = User;
