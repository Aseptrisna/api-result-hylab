const Data = require("../model/hasil_model");
const models = require("../model/hasil_model");
const { requestResponse } = require("../util");
const LogModel = require("../model/log_model");

const getData = async (page, limit, date) => {
  try {
    page = Number(page);
    limit = Number(limit);

    let startDate, endDate;

    if (date) {
      const [day, month, year] = date.split('-');
      const startDateString = `${year}-${month}-${day}T00:00:00`;
      const endDateString = `${year}-${month}-${day}T23:59:59`;

      startDate = new Date(startDateString);
      endDate = new Date(endDateString);
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      startDate = new Date(today);
      endDate = new Date(today);
      endDate.setDate(today.getDate() + 1);
    }

    const datahasil = await models.aggregate([
      {
        $addFields: {
          dateObj: {
            $dateFromString: {
              dateString: "$time",
              format: "%d-%m-%Y %H:%M:%S",
              timezone: "UTC"
            }
          }
        }
      },
      {
        $match: {
          dateObj: {
            $gte: startDate,
            $lt: endDate
          }
        }
      },
      {
        $sort: { dateObj: -1 } // Sort descending by dateObj (latest first)
      },
      {
        $group: {
          _id: "$name",
          latestDocument: { $first: "$$ROOT" } // Get the latest document for each name
        }
      },
      { $sort: { _id: 1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit }
    ]);

    const countResult = await models.aggregate([
      {
        $addFields: {
          dateObj: {
            $dateFromString: {
              dateString: "$time",
              format: "%d-%m-%Y %H:%M:%S",
              timezone: "UTC"
            }
          }
        }
      },
      {
        $match: {
          dateObj: {
            $gte: startDate,
            $lt: endDate
          }
        }
      },
      { $group: { _id: "$name" } },
      { $count: "total" }
    ]);

    const count = countResult[0] ? countResult[0].total : 0;

    return {
      ...requestResponse.success,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      datahasil: datahasil.map(item => item.latestDocument), // Get the latest document for each group
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      ...requestResponse.failed,
      message: "An error occurred while fetching data",
    };
  }
};

const getDataLog = async (page, limit, date) => {
  console.log(date)
  try {
    page = Number(page);
    limit = Number(limit);

    let startDate, endDate;

    if (date) {
      const [day, month, year] = date.split('-');
      startDate = new Date(year, month - 1, day, 0, 0, 0);
      endDate = new Date(year, month - 1, day, 23, 59, 59);
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      startDate = new Date(today);
      endDate = new Date(today);
      endDate.setHours(23, 59, 59, 999);
    }

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    const query = {
      createdAt: {
        $gte: startDate.getTime(),
        $lte: endDate.getTime()
      }
    };

    // console.log(query);
    const dataLogs = await LogModel.find(query)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const count = await LogModel.countDocuments(query);

    return {
      ...requestResponse.success,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      dataLogs
    };
  } catch (error) {
    console.error("Error fetching data logs:", error);
    return {
      ...requestResponse.failed
    };
  }
}

const getDataByID = async (id) => {
  try {
    const data = await Data.findOne({ _id: id })
    return {
      ...requestResponse.success,
      data
    };
  } catch (error) {
    return {
      ...requestResponse.failed,
    };
  }
}



module.exports = {
  getData,
  getDataByID,
  getDataLog
};


// // const models = require("../model/hasil_model");
// // const { requestResponse, getRndInteger } = require("../util");

// // const getData = async (page,limit) => {
// //   try {
// //     const condition = {
// //       limit: limit,
// //       page: page,
// //     };
// //     const datahasil = await models
// //       .find()
// //       .sort({ _id: -1 })
// //       .limit(limit * 1)
// //       .skip((page - 1) * limit)
// //       .exec();
// //     const count = await models.find().countDocuments();
// //     return (response = {
// //       ...requestResponse.success,
// //       totalPages: Math.ceil(count / limit),
// //       currentPage: page,
// //       datahasil,
// //     });
// //   } catch (error) {
// //     console.log(error);
// //     return (response = { ...requestResponse.failed });
// //   }
// // };

// // module.exports = {
// //   getData,
// // };

// const models = require("../model/hasil_model");
// const { requestResponse } = require("../util");

// const getData = async (page, limit, date) => {
//   try {
//     page = Number(page);
//     limit = Number(limit);

//     let startDate, endDate;

//     if (date) {
//       // Parse the input date
//       const [day, month, year] = date.split('-');
//       const startDateString = `${year}-${month}-${day}T00:00:00`;
//       const endDateString = `${year}-${month}-${day}T23:59:59`;

//       startDate = new Date(startDateString);
//       endDate = new Date(endDateString);
//     } else {
//       // Default to today's date
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       startDate = new Date(today);
//       endDate = new Date(today);
//       endDate.setDate(today.getDate() + 1);
//     }

//     const datahasil = await models.aggregate([
//       {
//         $addFields: {
//           dateObj: {
//             $dateFromString: {
//               dateString: "$time",
//               format: "%d-%m-%Y %H:%M:%S",
//               timezone: "UTC"
//             }
//           }
//         }
//       },
//       {
//         $match: {
//           dateObj: {
//             $gte: startDate,
//             $lt: endDate
//           }
//         }
//       },
//       {
//         $group: {
//           _id: "$name",
//           document: { $first: "$$ROOT" } // Get the first document for each name
//         }
//       },
//       { $sort: { _id: 1 } },
//       { $skip: (page - 1) * limit },
//       { $limit: limit }
//     ]);

//     const countResult = await models.aggregate([
//       {
//         $addFields: {
//           dateObj: {
//             $dateFromString: {
//               dateString: "$time",
//               format: "%d-%m-%Y %H:%M:%S",
//               timezone: "UTC"
//             }
//           }
//         }
//       },
//       {
//         $match: {
//           dateObj: {
//             $gte: startDate,
//             $lt: endDate
//           }
//         }
//       },
//       { $group: { _id: "$name" } },
//       { $count: "total" }
//     ]);

//     const count = countResult[0] ? countResult[0].total : 0;

//     return {
//       ...requestResponse.success,
//       totalPages: Math.ceil(count / limit),
//       currentPage: page,
//       datahasil: datahasil.map(item => item.document), // Flatten the result to get the documents directly
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       ...requestResponse.failed,
//       message: "An error occurred while fetching data",
//     };
//   }
// };

