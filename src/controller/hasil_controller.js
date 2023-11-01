let response;
const Service = require("../service/hasil_service");
const Logger = require("../util/logger");

const getData = async (req, res) => {
    console.log("test")
  try {
    const service = await Service.getData();
    response = { ...service };
  } catch (error) {
    console.log(error)
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

module.exports = {
  getData,
};
