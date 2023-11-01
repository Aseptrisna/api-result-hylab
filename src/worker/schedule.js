// const schedule_service = require("../service/schedule_service");
// const device_service = require("../service/device_service");
const logger = require("../util/logger");
const moment = require("moment");
const mqtt = require("mqtt");
const devices_model = require("../model/device_model");
const scheduler = require("../model/detail_schedule_model");
const history_model = require("../model/history_model");
const uuid = require("uuid");

const Run_Schedule = async () => {
  const time = moment().format("HH:mm");
  try {
    const schedule = await scheduler.find({ time });
    const devices = await devices_model.find();
    if (schedule.length == 0) {
      logger.info(time);
      logger.info("No schedule yet...!");
    } else {
      logger.info(time);
      logger.info("Running schedule...");
      logger.info("Running schedule info...");
      for (let i = 0; i < schedule.length; ++i) {
        // logger.info("Schedule Name:" + schedule[i].name_schedule);
        logger.info("Schedule Device:" + schedule[i].guid_device);
        logger.info("Schedule Payload:" + schedule[i].payload);

        let Qty = parseInt(devices.length);
        for (let j = 0; j < Qty; j++) {
          Execution_Schedule(schedule[i]);
        }
      }
    }
  } catch (error) {
    console.log(error);
    logger.info("Running schedule Failed...");
  }
};

const Execution_Schedule = async (data) => {
  const { guid_device, status, payload } = data;
  logger.info("Execution schedule...");
  try {
    const client = mqtt.connect(process.env.MQTT_HOST, {
      username: process.env.MQTT_USER,
      password: process.env.MQTT_PASS,
      protocolId: "MQTT",
    });
    console.log("Publish:" + payload);
    client.on("connect", function () {
      client.publish("Aktuator", payload, {
        qos: 1,
        retain: true,
      });
      client.end();
    });
    const update = await devices_model.findOneAndUpdate(
      {
        guid_device: guid_device,
      },
      {
        status: status,
      }
    );
    if (update) {
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
    }
  } catch (error) {
    console.log(error);
    logger.info("Execution schedule Failed...");
  }
};

module.exports = { Run_Schedule };
