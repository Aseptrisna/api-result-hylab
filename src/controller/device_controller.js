let response;
const Service = require("../service/device_service");
const Logger = require("../util/logger");
const { requestResponse } = require("../util");

const DeviceCreate = async (req, res) => {
  const data = req.body;
  try {
    const service = await Service.add(data);
    response = { ...service };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const DeviceUser = async (req, res) => {
  const data = req.body;
  try {
    const service = await Service.find_device_user(data);
    response = { ...service };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const GetAllDevice = async (req, res) => {
  const data = req.body;
  try {
    const service = await Service.find_device(data);
    response = { ...service };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const delete_device = async (req, res) => {
  const guid = req.params.guid;
  try {
    const service = await Service.delete_device(guid);
    response = { ...service };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const GetDeviceUser = async (req, res) => {
  const data = req.body;
  try {
    const service = await Service.find_device(data);
    response = { ...service };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};


const get_history = async (req, res) => {
  const {page,limit,guid} = req.params;
  try {
    const service = await Service.get_history(page,limit,guid);
    response = { ...service };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const control_device = async (req, res) => {
  const data = req.body;
  try {
    const service = await Service.control_device(data);
    response = { ...service };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const updateDeviceController = async (req, res) => {
  const { guid } = req.params;
  const data = req.body;
  try {
    const service = await Service.updateDevice(guid, data);
    response = { ...service };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

module.exports = {
  DeviceCreate,
  DeviceUser,
  delete_device,
  get_history,
  control_device,
  GetAllDevice,
  updateDeviceController,
  GetDeviceUser
};
