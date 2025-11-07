const express = require("express");
const bcrypt = require("bcrypt");
const Paystack = require("@paystack/paystack-sdk");

const UserModel = require("./../models/user");

const app = express.Router();

app.get("/api/paystack/callback", async (req, res) => {
  const query = req.query;

  if (!query.reference) {
    return res.status(400).json({
      message: "Request missing important parameters",
    });
  }

  const paySt = new Paystack(process.env.PAYSTACK_SECRET_KEY);

  const response = await paySt.transaction.verify(query);

  const data = response.data;

  if (data?.status != "success") {
    return res.render("payment_status.twig", { status: false, data: data });
  }

  // Check if Transaction has been handled before
  checkTransaction = await TransactionModel.findOne({
    tx_ref: reference,
  }).exec();

  if (data?.status != "success" || checkTransaction) {
    return res.render("payment_status.twig", { status: false, data: data });
  }

  const user = await UserModel.findOne({ email: data.customer.email });

  if (!user) {
    return res.render("payment_status.twig", { status: false, data: data });
  }

  txRecord = new TransactionModel();
  txRecord.tx_ref = data.reference;
  txRecord.amount = data.amount;
  txRecord.user = user;

  await txRecord.save();

  // if ref has been used before, dont update user benefit
  await UserModel.updateOne(
    { email: data.customer.email },
    { credit: user.credit + 10 }
  );

  return res.render("payment_status.twig", { status: true, data: data });
});

module.exports = app;
