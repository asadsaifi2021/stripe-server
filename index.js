import express from "express";

const app = express();
const port = 3001; //add your port here
const PUBLISHABLE_KEY = "ADD_PUBLISHABLE KEY HERE";
const SECRET_KEY =
  "sk_test_51MtGfBA69yGbPLDVWP6xTbIR5nqNLUwZIRNUFQwZklbE7QOpmyRRXrSxeNv2YeelbnFxh8vMwgCywMYjzqLrEfDy00DuKxqYTw";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.listen(port, () => {
  console.log(`Stripe server listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "cad",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});
