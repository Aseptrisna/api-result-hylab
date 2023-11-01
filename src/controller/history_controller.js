let response;
const Service = require("../service/history_device");
const Logger = require("../util/logger");
const { requestResponse } = require("../util");
const History = require("../model/history_model")
const fs = require("fs");
const path = require("path");

const HistoryCreate = async (req, res) => {
  const { body, file } = req;

  try {
    let service = await Service.addhistory(body, file);

    // Simpan file ke direktori "images"
    if (file && file.originalname) {
      // const fileExtension = path.extname(file.originalname);
      const fileName = `${body.guid}${file.originalname}`;
      const filePath = path.join(__dirname, "../../images", fileName);

      fs.writeFileSync(filePath, file.buffer);

      service.file = fileName;

      // Simpan URL atau nama file ke dalam field 'image' di database
      // const imageURL = `https://pptik-local.pptik.id:5140/api.v1/images/${fileName}`;
      const imageURL = `https://pemadam.pptik.id/api/api.v1/images/${fileName}`;
      await History.findOneAndUpdate({ guid: body.guid }, { image: imageURL });
    }

    response = { ...service };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};


const GetAllHistory = async (req, res) => {
  const data = req.body;
  try {
    const service = await Service.find_history(data);
    response = { ...service };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

// const updateHistory = async (req, res) => {
//   const { guid } = req.params;
//   const data = req.body;

//   try {
//     const history = await Service.updateHistory(guid, data);
//     response = { ...history };
//   } catch (error) {
//     Logger.error(error);
//     response = { ...requestResponse.server_error };
//   }
//   res.status(response.code).json(response);
// };

const updateHistoryController = async (req, res) => {
  const { guid } = req.params;
  const data = req.body;
  try {
    const service = await Service.updateHistory(guid, data);
    response = { ...service };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const find_historyCamera = async (req, res) => {
  const { page,limit } = req.params;
  try {
    const service = await Service.find_historyCamera(page,limit );
    response = { ...service };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};

const find_historyCameraByGuid = async (req, res) => {
  const { page,limit,guid_device } = req.params;
  try {
    const service = await Service.find_historyCameraByGuid(page,limit,guid_device);
    response = { ...service };
  } catch (error) {
    Logger.error(error);
    response = { ...requestResponse.server_error };
  }
  res.status(response.code).json(response);
};
module.exports = {
  HistoryCreate,
  GetAllHistory,
  updateHistoryController,
  find_historyCamera,
  find_historyCameraByGuid
};
