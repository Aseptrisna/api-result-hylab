const models = require("../model/hasil_model");
const { requestResponse, getRndInteger } = require("../util");

const getData = async (page,limit) => {
  try {
    const condition = {
      limit: limit,
      page: page,
    };
    const datahasil = await models
      .find()
      .sort({ _id: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await models.find().countDocuments();
    return (response = {
      ...requestResponse.success,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      datahasil,
    });
  } catch (error) {
    console.log(error);
    return (response = { ...requestResponse.failed });
  }
};

module.exports = {
  getData,
};
