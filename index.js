const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const fixedAmount = "1.00";
app.post("/", (req, res) => {
  const payeeVPA = "SBIPMOPAD.02SOB0000021160-YM542163@sbipay";
  const payeeName = "henil";
  const currency = "INR";
  const deepLink = `phonepe://pay?pa=${payeeVPA}&pn=${payeeName}&am=${fixedAmount}&cu=${currency}`;
  const gLink = `tez://upi/pay?pa=${payeeVPA}&pn=${payeeName}&am=${fixedAmount}&cu=${currency}`;
  res.send(`<html>
    <body>
      <a href="${deepLink}">Pay Now</a>
      <a href="${gLink}">Pay Now</a>
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
