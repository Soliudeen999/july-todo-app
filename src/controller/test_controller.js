const { default: axios } = require("axios");

const Paystack = require("@paystack/paystack-sdk");
const { cacheGet, cacheSet } = require("../util/cache");
const redis = require("./../util/redis");

const index = async (req, res) => {
  return res.json({ message: "Hello first controller" });
};

const getAllNGNBanks = async (req, res) => {
  const baseUrl = process.env.PAYSTACK_PAYMENT_URL;
  const secret = process.env.PAYSTACK_SECRET_KEY;

  const key = "all_banks";

  const data = await cacheGet(key);

  if (data) {
    return res.json({
      message: "Banks fetched successfully",
      data: data,
    });
  }

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

  await cacheSet(key, response);

  return res.json({
    message: "Banks fetched successfully",
    data: response,
  });
};

const getAllNGNBankWithRedis = async (req, res) => {
  const baseUrl = process.env.PAYSTACK_PAYMENT_URL;
  const secret = process.env.PAYSTACK_SECRET_KEY;

  const key = "all_banks_redis";

  const data = await redis.get(key);

  if (data) {
    return res.json({
      message: "Banks fetched successfully",
      data: JSON.parse(data),
    });
  }

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

  await redis.set(key, JSON.stringify(response));

  return res.json({
    message: "Banks fetched successfully",
    data: response,
  });
};

const payNow = async (req, res) => {
  const amount = parseInt(req.params.amount || 100) * 100;
  const paySt = new Paystack(process.env.PAYSTACK_SECRET_KEY);

  const response = await paySt.transaction.initialize({
    email: "bola@gmail.com",
    amount,
  });

  return res.json({
    message: "Go to pay now",
    data: response,
  });
};

module.exports = {
  index,
  getAllNGNBanks,
  payNow,
  getAllNGNBankWithRedis,
};
