const db = require("../models");
const Transaction = db.transaction;
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

exports.view = function (req, res) {
    user.findOne(req.body.channelID, function (err, User) {
        if (err)
            res.send(err);
        res.json({
            message: 'transaction details loading..',
            data: user_id
        });
    });
}; 

exports.stripe = async (req, res) => {
    //   const { items } = req.body;
        const amount  = req.body.amount;
        const channelID = req.body.channelID;
        
        //receive username here just like you receive items object & store it in database in webhook post request
        
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            description: channelID,                                                       
            currency: "usd"
        });
        
        res.send({
            clientSecret: paymentIntent.client_secret
        });
    };

exports.transactions = (req, res) => {
  const transaction = new Transaction({
    channelID: req.body.description,
    paymentIntent: req.body.id,
    amount: req.body.amount,
    status: req.body.status
  });

  transaction.save((err, transaction) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

        transaction.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "Transaction registered successfully!", data: transaction });
        });
      });
//     }
  };
  
exports.new = function (req, res) {
    var transaction = new Transaction();
    transaction.description = req.body.description;
//     transaction.paymentIntent = req.body.paymentIntent;
    transaction.amount = req.body.amount;
    transaction.status = req.body.status;
// save the product and check for errors
    transaction.save(function (err) {
        // Check for validation error
        if (err)
            res.json(err);
        else
            res.json({
                message: 'New Transaction created!',
                data: transaction
            });
    });
};


