const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const { amount } = 1;
  const payeeVPA = "sanketbholabhainarol.65004758@hdfcbank";
  const deepLink = `phonepe://pay?pa=${payeeVPA}&amount=${amount}&cu=IND&callbackUrl=https://node-js-payment.onrender.com/payment-response`;
  res.send(`<html>
    <body>
      <a href="${deepLink}">Pay Now</a>
    </body>
  </html>`);
});

app.post("/payment-response", (req, res) => {
  const { status, transactionId } = req.body;
  // Process the payment response
  console.log(`Payment Status: ${status}, Transaction ID: ${transactionId}`);
  res.send(`Payment ${status ? "Successful" : "Failed"}!`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});