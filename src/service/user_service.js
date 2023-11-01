const models = require("../model/user_model");
const { requestResponse, getRndInteger } = require("../util");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const otp = require("./notification_services");
const email = require("./mail_services");
const jwttoken = require("../jwt");

const UserRegister = async (data) => {
  try {
    data.guid = uuid.v4();
    data.password = bcrypt.hashSync(data.password, salt);
    data.otp = getRndInteger();
    const email_find = await FindUserByEmailRole(data.email, data.role);
    if (email_find == null) {
      await models.create(data);
      otp.Send_Otp(data.phone_number, data.otp);
      email.SendConfirmationEmail(data.name, data.email, data.otp);
      return (response = { ...requestResponse.success_register });
    } else {
      return (response = { ...requestResponse.email_register });
    }
  } catch (error) {
    return (response = { ...requestResponse.failed });
  }
};

const UserLogin = async (data) => {
  const User = await FindUserByEmail(data.email);
  if (User === null) {
    return requestResponse.unauthorized;
  } else {
    const token = await jwttoken.JwtSign(User);
    const matchPassword = await bcrypt.compareSync(
      data.password,
      User.password
    );
    if (!matchPassword) {
      return { ...requestResponse.unauthorized };
    } else if (User.is_active) {
      return { ...requestResponse.success, token};
    } else {
      return { ...requestResponse.info_account };
    }
  }
};
const UserFind = async (data) => {
  const { limit, page } = data;
  try {
    const user = await models
      .find()
      .sort({ create_at: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await models.find().countDocuments();
    if (user) {
      return (response = {
        ...requestResponse.success,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        user,
      });
    } else {
      return (response = { ...requestResponse.failed, user });
    }
  } catch (error) {
    console.log(error);
    return (response = { ...requestResponse.failed });
  }
};

const UserVerification = async (data) => {
  try {
    const find_user = await FindUserByEmailOtp(data);
    if (find_user == null) {
      return (response = { ...requestResponse.invalid_emailotp });
    } else {
      await models.findOneAndUpdate(
        { guid: find_user.guid },
        { is_active: true, otp: getRndInteger() }
      );
      return (response = { ...requestResponse.success });
    }
  } catch (error) {
    console.log(error);
    return (response = { ...requestResponse.failed, error });
  }
};

const UserProfile = async (data) => {
  try {
    const User = await FindUserByGuid(data.guid);
    if (User === null) {
      return requestResponse.unauthorized;
    } else {
      return { ...requestResponse.success, User };
    }
  } catch (error) {
    console.log(error);
    return (response = { ...requestResponse.failed, error });
  }
};

const UserByGuid = async (data) => {
  try {
    const User = await FindUserByGuid(data.guid);
    if (User === null) {
      return requestResponse.unauthorized;
    } else {
      return { ...requestResponse.success, User };
    }
  } catch (error) {
    console.log(error);
    return (response = { ...requestResponse.failed, error });
  }
};

const UserUpdate = async (data) => {
  const { guid_user } = data;
  if (data.password === undefined) {
    try {
      const user = await FindUserByGuid(guid_user);
      if (user == null) {
        return (response = { ...requestResponse.failed });
      } else {
        await models.findOneAndUpdate({ guid: guid_user }, { $set: data });
        return (response = { ...requestResponse.success });
      }
    } catch (error) {
      console.log(error);
      return (response = { ...requestResponse.failed });
    }
  } else {
    data.password = bcrypt.hashSync(data.password, salt);
    try {
      const user = await FindUserByGuid(guid_user);
      if (user == null) {
        return (response = { ...requestResponse.failed });
      } else {
        await models.findOneAndUpdate({ guid: guid_user }, { $set: data });
        return (response = { ...requestResponse.success });
      }
    } catch (error) {
      console.log(error);
      return (response = { ...requestResponse.failed });
    }
  }
};
const UserDelete = async (guid) => {
  try {
    const user = await FindUserByGuid(guid);
    if (user == null) {
      return (response = { ...requestResponse.failed });
    } else {
      await models.findOneAndDelete({ guid: guid });
      return (response = { ...requestResponse.success });
    }
  } catch (error) {
    console.log(error);
    return (response = { ...requestResponse.failed });
  }
};

const UserUpdatePassword = async (data) => {};

const FindUserByEmail = async (email) => {
  return models.findOne({ email: email });
};
const FindUserByEmailOtp = async (data) => {
  return models.findOne({ email: data.email, otp: data.otp });
};
const FindUser = async () => {
  return models.findOne();
};
const FindUserByGuid = async (guid) => {
  return models.findOne({ guid: guid });
};
const FindUserByEmailRole = async (email, role) => {
  return models.findOne({ email: email, role: role });
};
module.exports = {
  UserRegister,
  UserLogin,
  UserFind,
  UserVerification,
  UserProfile,
  UserUpdate,
  UserUpdate,
  UserDelete,
  UserByGuid
};
