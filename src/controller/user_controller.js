let response;
const UserService = require("../service/user_service");
const Logger = require("../util/logger");
const { requestResponse } = require("../util");

const UserCreate = async (req, res) => {
  const data = req.body;
  try {
    const usercreate = await UserService.UserRegister(data);
    response = { ...usercreate };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const UserLogin = async (req, res) => {
  const data = req.body;
  try {
    const userlogin = await UserService.UserLogin(data);
    response = { ...userlogin };
  } catch (error) {
    Logger.error(error);
    console.log(error)
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const UserGetAll = async (req, res) => {
  const data = req.body;
  try {
    const user = await UserService.UserFind(data);
    response = { ...user };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const UserGetById = async (req, res) => {
  const data = req.body;
  try {
    const user = await UserService.UserByGuid(data);
    response = { ...user };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const UserVerification = async (req, res) => {
  const data = req.body;
  try {
    const userverification = await UserService.UserVerification(data);
    response = { ...userverification };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const UserProfile = async (req, res) => {
  const data = req.body;
  try {
    const user = await UserService.UserProfile(data);
    response = { ...user };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const UserUpdate = async (req, res) => {
  const data = req.body;
  try {
    const user = await UserService.UserUpdate(data);
    response = { ...user };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const UserDelete = async (req, res) => {
  const guid = req.params.guid;
  try {
    const user = await UserService.UserDelete(guid);
    response = { ...user };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};
module.exports = {
  UserCreate,
  UserLogin,
  UserGetAll,
  UserVerification,
  UserProfile,
  UserUpdate,
  UserDelete,
  UserGetById
};
