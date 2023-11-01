const models_schedule = require("../model/schedule_model");
const models_schedule_detail = require("../model/detail_schedule_model");
const { requestResponse, getRndInteger } = require("../util");
const detail_schedule_model = require("../model/detail_schedule_model");
const uuid = require("uuid");

const add_schedule = async (data) => {
  const intervalOn = parseInt(data.on);
  const intervalOff = parseInt(data.off);
  const totalMinutes = 24 * 60;
  const schedule = await generateSchedule(
    intervalOn,
    intervalOff,
    totalMinutes
  );
  data.guid = uuid.v4();
  const schedule_data = models_schedule.findOne({
    guid_device: data.guid_device,
  });
  if (schedule_data) {
    await models_schedule.findOneAndDelete({ guid_device: data.guid_device });
    await models_schedule_detail.deleteMany({ guid_device: data.guid_device });
  }
  const save = await models_schedule.create(data);
  if (save) {
    for (let i = 0; i < schedule.length; i++) {
      const payload = {
        guid_device: data.guid_device,
      };
      if (i % 2 === 0) {
        const payload = {
          guid_device: data.guid_device,
          time: schedule[i],
          payload: data.guid_device + "#" + 0,
          status: 0,
          information: "Jadwal ON",
        };
        await detail_schedule_model.create(payload);
      } else {
        const payload = {
          guid_device: data.guid_device,
          time: schedule[i],
          payload: data.guid_device + "#" + 1,
          status: 1,
          information: "Jadwal OFF",
        };
        await detail_schedule_model.create(payload);
      }
    }
    return (response = { ...requestResponse.success });
  } else {
    return (response = { ...requestResponse.failed });
  }
};

const get_schedule = async (guid_device) => {
  const schedule = await models_schedule.find({ guid_device });
  return (response = { ...requestResponse.success, schedule });
};

const get_scheduleDetail = async (guid_device) => {
  const detail = await models_schedule_detail.find({
    guid_device: guid_device,
  });
  return (response = { ...requestResponse.success, detail });
};
module.exports = { add_schedule, get_schedule, get_scheduleDetail };

const generateSchedule = async (intervalOn, intervalOff, totalMinutes) => {
  const schedule = [];
  const scheduleOff = [];
  let currentTime = 0;

  while (currentTime < totalMinutes) {
    if (currentTime + intervalOn <= totalMinutes) {
      // Tambahkan jam hidup
      schedule.push(
        formatTime(currentTime),
        formatTime(currentTime + intervalOn)
      );
      // console.log(formatTime(currentTime));
      // console.log(formatTime(formatTime(currentTime + intervalOn)));
    } else {
      // Tambahkan jam hidup hingga batas waktu total
      schedule.push(formatTime(currentTime), formatTime(totalMinutes));
    }

    currentTime += intervalOn + intervalOff;
  }
  // console.log(scheduleOn);
  // console.log(scheduleOff);
  return schedule;
};

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
}
