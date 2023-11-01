// let response;
// const Service = require("../service/history_device");
// const Logger = require("../util/logger");
// const { requestResponse } = require("../util");

// const HistoryCreate = async (req, res) => {
//   const data = req.body;
//   try {
//     const service = await Service.addhistory(data);
//     response = { ...service };
//   } catch (error) {
//     Logger.error(error);
//     response = { ...requestResponse.server_error };
//   }
//   res.status(response.code).json(response);
// };

// const GetAllHistory = async (req, res) => {
//   const data = req.body;
//   try {
//     const service = await Service.find_history(data);
//     response = { ...service };
//   } catch (error) {
//     Logger.error(error);
//     response = { ...requestResponse.server_error };
//   }
//   res.status(response.code).json(response);
// };

// // const updateHistory = async (req, res) => {
// //   const { guid } = req.params;
// //   const data = req.body;

// //   try {
// //     const history = await Service.updateHistory(guid, data);
// //     response = { ...history };
// //   } catch (error) {
// //     Logger.error(error);
// //     response = { ...requestResponse.server_error };
// //   }
// //   res.status(response.code).json(response);
// // };

// const updateHistoryController = async (req, res) => {
//   const { guid } = req.params;
//   const data = req.body;
//   try {
//     const service = await Service.updateHistory(guid, data);
//     response = { ...service };
//   } catch (error) {
//     Logger.error(error);
//     response = { ...requestResponse.server_error };
//   }
//   res.status(response.code).json(response);
// };


// module.exports = {
//   HistoryCreate,
//   GetAllHistory,
//   updateHistoryController
// };
