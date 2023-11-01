let response;
const Service = require("../service/hasil_service");
const Logger = require("../util/logger");

const getData = async (req, res) => {
  const {page,limit}=req.params;
  try {
    const service = await Service.getData(page,limit);
    response = { ...service };
  } catch (error) {
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

module.exports = {
  getData,
};
