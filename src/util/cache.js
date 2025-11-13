const CacheStore = require("./../models/cache");

const cacheGet = async (key) => {
  return await CacheStore.findOne({ key }).exec();
};

const cacheSet = async (key, value) => {
  const exist = await CacheStore.findOne({ key }).exec();

  if (!exist) {
    await new CacheStore({ key, value }).save();
    return;
  }

  await CacheStore.findOneAndUpdate({ key }, { value }).exec();
};

module.exports = {
  cacheGet,
  cacheSet,
};
