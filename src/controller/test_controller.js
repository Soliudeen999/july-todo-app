const { default: axios } = require("axios");

const Paystack = require("@paystack/paystack-sdk");

const index = async (req, res) => {
  return res.json({ message: "Hello first controller" });
};

const getAllNGNBanks = async (req, res) => {
  const baseUrl = process.env.PAYSTACK_PAYMENT_URL;
  const secret = process.env.PAYSTACK_SECRET_KEY;

  const request = await axios.get(`${baseUrl}/bank`, {
    headers: {
      Authorization: `Bearer ${secret}`,
    },
    params: {
      country: "nigeria",
    },
  });

  if (request.status != 200) {
    return res.json({
      message: "Paystack unavailable",
    });
  }
  const response = request.data;

  return res.json({
    message: "Banks fetched successfully",
    data: response,
  });
};

const payNow = async (req, res) => {
  const amount = parseInt(req.params.amount || 100) * 100;
  const paySt = new Paystack(process.env.PAYSTACK_SECRET_KEY);

  const response = await paySt.transaction.initialize({
    email: "isiah@gmail.com",
    amount,
  });

  console.log(response);
  return res.json({
    message: "Go to pay now",
    data: response,
  });
};

module.exports = {
  index,
  getAllNGNBanks,
  payNow,
};
