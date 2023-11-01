let response;
const Service = require("../service/schedule_service");
const Logger = require("../util/logger");
const { requestResponse } = require("../util");

const add_schedule =async (req, res) => {
  const data = req.body;
  try {
    const service = await Service.add_schedule(data);
    response = { ...service };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const get_schedule =async (req, res) => {
  const {guid} = req.params;
  try {
    const service = await Service.get_schedule(guid);
    response = { ...service };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const get_schedules =async (req, res) => {
  const {guid} = req.body;
  try {
    const service = await Service.get_schedule(guid);
    response = { ...service };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};


const get_scheduleDetail =async (req, res) => {
  const {guid} = req.params;
  try {
    const service = await Service.get_scheduleDetail(guid);
    response = { ...service };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const get_scheduleDetails =async (req, res) => {
  const {guid} = req.body;
  try {
    const service = await Service.get_scheduleDetail(guid);
    response = { ...service };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};
module.exports = { add_schedule,get_schedule,get_scheduleDetail,get_schedules,get_scheduleDetails };
