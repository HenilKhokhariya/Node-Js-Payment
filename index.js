const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fixedAmount = "1.00";
app.get("/", (req, res) => {
  const payeeVPA = "SBIPMOPAD.02SOB0000021160-YM542163@sbipay";
  const payeeName = "henil";
  const currency = "INR";
  const deepLink = `phonepe://pay?pa=${payeeVPA}&pn=${payeeName}&am=${fixedAmount}&cu=${currency}`;
  const gLink = `tez://upi/pay?pa=${payeeVPA}&pn=${payeeName}&am=${fixedAmount}&cu=${currency}`;
  res.send(`<html>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <body class="text-center">
      <a class="btn btn-success w-25 m-5"  href="${deepLink}">Phone Pay</a>
      <a class="btn btn-danger w-25" href="${gLink}">Gpay</a>
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
