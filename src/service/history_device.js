const models = require("../model/history_model");
const camera = require("../model/camera_model");
const { requestResponse, getRndInteger } = require("../util");
const uuid = require("uuid");

const addhistory = async (data, file) => {
  try {
    data.guid = uuid.v4();
    const existingHistory = await FindUserByGuidDevice(data.guid_device);

    if (!existingHistory) {
      await models.create(data);
      return { ...requestResponse.success_addHistory};
    } else {
      const newHistory = new models(data);
      await newHistory.save();
      return { ...requestResponse.success_addHistory };
    }
  } catch (error) {
    return { ...requestResponse.failed };
  }
};


const find_history = async (data) => {
  const { limit, page } = data;
  const condition = {
    limit: limit,
    page: page,
  };
  try {
    const history = await models
      .find(condition)
      .sort({create_at: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await models.find(condition).countDocuments();
    if (history) {
      return (response = {
        ...requestResponse.success,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        history,
      });
    } else {
      return (response = { ...requestResponse.failed, history });
    }
  } catch (error) {
    console.log(error);
    return (response = { ...requestResponse.failed });
  }
};

const updateHistory = async (guid, data) => {
  try {
    const history = await findGuid(guid);
    if (history == null) {
      return (response = { ...requestResponse.failed });
    } else {
      await models.findOneAndUpdate({ guid: guid }, { $set: data });
      return (response = { ...requestResponse.success_updateHistory });
    }
  } catch (error) {
    return (response = { ...requestResponse.failed });
  }
};

const FindUserByGuidDevice = async (guid_device) => {
  return await models.findOne({guid_device: guid_device})
}

const FindHistoryByGuid = async (guid) => {
  return models.findOne({ guid: guid });
};

const findAll =async ()=> {
  return await models.find();
}

const findGuid = async (guid) => {
  return await models.findOne({ guid: guid });
};


const find_historyCamera = async (page, limit) => {
  // const { limit, page } = data;
  const condition = {
    limit: limit,
    page: page,
  };
  try {
    const history = await camera
      .find(condition)
      .sort({create_at: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await camera.find(condition).countDocuments();
    if (history) {
      return (response = {
        ...requestResponse.success,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        history,
      });
    } else {
      return (response = { ...requestResponse.failed, history });
    }
  } catch (error) {
    console.log(error);
    return (response = { ...requestResponse.failed });
  }
};

const find_historyCameraByGuid = async (page, limit,guid_device) => {
  const condition = {
    limit: limit,
    page: page,
    guid_device:guid_device
  };
  try {
    const history = await camera
      .find(condition)
      .sort({create_at: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await camera.find(condition).countDocuments();
    if (history) {
      return (response = {
        ...requestResponse.success,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        history,
      });
    } else {
      return (response = { ...requestResponse.failed, history });
    }
  } catch (error) {
    console.log(error);
    return (response = { ...requestResponse.failed });
  }
};


module.exports = {
  addhistory,
  findAll,
  find_history,
  updateHistory,
  find_historyCamera,
  find_historyCameraByGuid
};
