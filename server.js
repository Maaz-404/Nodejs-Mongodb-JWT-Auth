const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

var corsOptions = {
  origin: ["http://localhost:8081", "http://localhost:8085", "http://localhost:8080"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Do-Nation api." });
});

app.use(express.static("."));
app.use(express.json());

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  //receive username here just like you receive items object & store it in database in webhook post request
  
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.post('/posting-data', (req, res) => {
    
    event = req.body;
    
    
    console.log(event);
    
    switch (event.type) {

    case 'payment_intent.succeeded':

      const paymentIntent = event.data.object;

      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      
      

      // Then define and call a method to handle the successful payment intent.

      // handlePaymentIntentSucceeded(paymentIntent);

      break;

    case 'payment_method.attached':

      const paymentMethod = event.data.object;

      // Then define and call a method to handle the successful attachment of a PaymentMethod.

      // handlePaymentMethodAttached(paymentMethod);

      break;

    default:

      // Unexpected event type

      console.log(`Unhandled event type ${event.type}.`);

  }

  // Return a 200 response to acknowledge receipt of the event

  res.send();
    
    
    
})

app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {

  const event = request.body;
  // Handle the event

  switch (event.type) {

    case 'payment_intent.succeeded':

      const paymentIntent = event.data.object;

      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      
      

      // Then define and call a method to handle the successful payment intent.

      // handlePaymentIntentSucceeded(paymentIntent);

      break;

    case 'payment_method.attached':

      const paymentMethod = event.data.object;

      // Then define and call a method to handle the successful attachment of a PaymentMethod.

      // handlePaymentMethodAttached(paymentMethod);

      break;

    default:

      // Unexpected event type

      console.log(`Unhandled event type ${event.type}.`);

  }

  // Return a 200 response to acknowledge receipt of the event

  response.send();

});



// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/transaction.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
