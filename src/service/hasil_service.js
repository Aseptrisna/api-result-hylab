const models = require("../model/hasil_model");
const { requestResponse, getRndInteger } = require("../util");

const getData = async (data) => {
  try {
    const datahasil = await models.find().sort({_id: -1 })
    return (response = { ...requestResponse.success, datahasil });
  } catch (error) {
    console.log(error);
    return (response = { ...requestResponse.failed });
  }
};

module.exports = {
  getData,
};
