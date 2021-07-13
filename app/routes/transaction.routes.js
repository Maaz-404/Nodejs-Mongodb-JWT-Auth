const controller = require("../controllers/transactions.controller");
// const transactions = require("../controllers/transactions.controller");

module.exports = function(app) {

    app.post(
    "/api/transactions/public",
    controller.transactions
  )
    
    app.post("/create-payment-intent", 
                controller.stripe
            )

};
