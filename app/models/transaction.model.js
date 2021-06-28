const mongoose = require("mongoose");

const Transaction = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    current_balance: Double,
    total_received: Double
  })
);

module.exports = Transaction;
