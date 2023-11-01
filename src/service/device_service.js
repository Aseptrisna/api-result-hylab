const models = require("../model/device_model");
const history_model = require("../model/history_model");
const { requestResponse, getRndInteger } = require("../util");
const uuid = require("uuid");
const mqtt = require("mqtt");
let history = [];
const devices_model = require("../model/device_model");
const moment = require("moment");

const add = async (data) => {
  try {
    data.guid = uuid.v4();
    const guid_device = await FindUserByGuidDevice(data.guid_device, data.guid);
    if (guid_device == null) {
      await models.create(data);
      return (response = { ...requestResponse.success_register_device });
    } else {
      return (response = { ...requestResponse.device_register_failed });
    }
  } catch (error) {
    return (response = { ...requestResponse.failed });
  }
};

const find_device_user = async (data) => {
  const { limit, page, guid_user } = data;
  const condition = {
    limit: limit,
    page: page,
    guid_user: guid_user,
  };
  try {
    const device = await models
      .find(condition)
      .sort({ create_at: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await models.find(condition).countDocuments();
    if (device) {
      return (response = {
        ...requestResponse.success,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        device,
      });
    } else {
      return (response = { ...requestResponse.failed, device });
    }
  } catch (error) {
    console.log(error);
    return (response = { ...requestResponse.failed });
  }
};

const delete_device = async (guid) => {
  try {
    const data_device = await findGuid(guid);
    if (data_device == null) {
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

// const update_device = async (guid, data) => {
//   try {
//     const device = await findGuid(guid);
//     data.status = 1;
//     if (device == null) {
//       return (response = { ...requestResponse.failed });
//     } else {
//       await models.findOneAndUpdate({ guid: guid }, { $set: data });
//       return (response = { ...requestResponse.success });
//     }
//   } catch (error) {
//     return (response = { ...requestResponse.failed });
//   }
// };

const updateDevice = async (guid, data) => {
  try {
    const device = await findGuid(guid);
    if (device == null) {
      return (response = { ...requestResponse.failed });
    } else {
      await models.findOneAndUpdate({ guid: guid }, { $set: data });
      return (response = { ...requestResponse.success_updateDevice });
    }
  } catch (error) {
    return (response = { ...requestResponse.failed });
  }
};

const find_device = async (data) => {
  // const { limit, page } = data;
  // const condition = {
  //   limit: limit,
  //   page: page,
  // };
  try {
    const device = await models
      .find(data)
      .sort({ create_at: -1 })
      .limit(data.limit * 1)
      .skip((data.page - 1) * data.limit)
      .exec();
    const count = await models.find(data).countDocuments();
    if (device) {
      return (response = {
        ...requestResponse.success,
        totalPages: Math.ceil(count / data.limit),
        currentPage: data.page,
        device,
      });
    } else {
      return (response = { ...requestResponse.failed, device });
    }
  } catch (error) {
    console.log(error);
    return (response = { ...requestResponse.failed });
  }
};

const get_history = async (page, limit, guid_device) => {
  // const topic="website-"+data.guid_device
  const condition = {
    guid_device: guid_device,
  };
  // console.log(condition)
  try {
    //  await mqtt_service (topic);
    const history = await history_model
      .find(condition)
      .sort({ create_at:-1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await history_model.find(condition).countDocuments();

    return (response = {
      ...requestResponse.success,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      history,
    });
  } catch (error) {
    console.log(error);
    return (response = { ...requestResponse.failed });
  }
};

const FindUserByGuidDevice = async (guid_device) => {
  return await models.findOne({ guid_device: guid_device });
};

const control_device = async (data) => {
  const { guid_device, status } = data;
  const payload = guid_device + "#" + status;
  try {
    const devices = await devices_model.find();
    const client = mqtt.connect(process.env.MQTT_HOST, {
      username: process.env.MQTT_USER,
      password: process.env.MQTT_PASS,
      protocolId: "MQTT",
    });
    let Qty = parseInt(devices.length);
    for (let i = 0; i < Qty; i++) {
      client.on("connect", function () {
        client.publish("Aktuator", payload, {
          qos: 1,
          retain: true,
        });
        client.end();
      });
    }
    const update_status = await models.findOneAndUpdate(
      {
        guid_device: guid_device,
      },
      {
        status: status,
      }
    );
    if (update_status) {
      const device = await devices_model.findOne({ guid_device });
      const history = {
        guid: (guid = uuid.v4()),
        value: status,
        guid_device: guid_device,
        unit: device.unit,
        timestamp: Math.round(new Date().getTime() / 1000).toString(),
        datetime: moment().format("DD-MM-YYYY hh:mm:ss"),
      };
      await history_model.create(history);
      return (response = {
        ...requestResponse.success,
      });
    }
  } catch (error) {
    console.log(error);
    return (response = {
      ...requestResponse.failed,
    });
  }
};

const findAll = async () => {
  return await models.find();
};

const findGuid = async (guid) => {
  return await models.findOne({ guid: guid });
};

// const mqtt_service = async (topic)=>{
//   const client = mqtt.connect("mqtt://rmq2.pptik.id/mqtt", {
//     username: "/smarthome:smarthome",
//     password: "Ssm4rt2!",
//     protocolId: "MQTT",
//   });
//   client.on("connect", () => {
//     console.log("Connected");
//     client.subscribe([topic], () => {
//       console.log(`Subscribe to topic '${topic}'`);
//     });
//   });
//   client.on("message", (topic, payload) => {
//     let history=[];
//     console.log("Received Message:", topic, payload.toString());
//     history.push(payload.toString());
//     console.log(history);
//   });
// }

module.exports = {
  add,
  find_device_user,
  updateDevice,
  // update_device,
  delete_device,
  find_device,
  get_history,
  control_device,
  findAll,
};
