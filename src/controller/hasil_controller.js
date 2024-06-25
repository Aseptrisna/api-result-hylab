let response;
const Service = require("../service/hasil_service");
const Logger = require("../util/logger");
const { requestResponse } = require("../util");

const getData = async (req, res) => {
  const { page, limit } = req.params;
  const { date } = req.query;
  try {
    const service = await Service.getData(page, limit, date);
    response = { ...service };
  } catch (error) {
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const getDataByID = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.getDataByID(id);
    response = { ...service };
  } catch (error) {
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const getDataLog = async (req, res) => {
  const { page, limit } = req.params;
  const { date } = req.query;
  try {
    const service = await Service.getDataLog(page, limit, date);
    response = { ...service };
  } catch (error) {
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

module.exports = {
  getData,
  getDataByID,
  getDataLog
};
