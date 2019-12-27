var braintree = require("./node_modules/braintree");
var express = require("./node_modules/express");
var cors = require("./node_modules/cors/lib");
var bodyParser = require("./node_modules/body-parser");

var app = express();

app.use(cors());
app.use(bodyParser.json());

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "ghdpqzz8yrjq72d8",
    publicKey: "yzknst4762ctr9c5",
    privateKey: "1f5aec9ca149f3e68b87bc5e18ddee98"
});

app.get("/", function (req, res) {
    res.send("Aplicação rodando!");
})

app.get("/client_token", function (req, res) {
    gateway.clientToken.generate({}, function (err, response) {
        res.send(response.clientToken);
    });
});

app.post("/checkout", function (req, res) {
    var nonceFromTheClient = req.body.nonce;

    gateway.transaction.sale({
        amount: "10.00",
        merchantAccountId: "individual",
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          console.log(result);
      });
});

app.listen(3000, () => { console.log("Applicação rodando na porta 3000") });