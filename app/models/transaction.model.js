const mongoose = require("mongoose");

const Transaction = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    current_balance: Number,
    total_received: Number,
    channelID: String,
    paymentIntent: String,
    amount: Number,
    status: String
  })
);

module.exports = Transaction;
