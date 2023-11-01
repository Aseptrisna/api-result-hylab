const url = require("url");
const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");
const { requestResponse } = require("../util");
const mqtt = require("mqtt");

const Send_Otp = async (number, otp) => {
  const queryParams = {
    number: number,
    content: ":" + otp,
    title: "Kopamas Bandung",
    name: "Kopamas Bandung",
  };
  const params = new url.URLSearchParams(queryParams);
  try {
    const options = {
      headers: { "x-access-token": process.env.TOKEN_NOTIFICATION },
    };
    const send = await axios.post(
      `${process.env.URL_NOTIFICATION}?${params}`,
      queryParams,
      options
    );
  } catch (error) {
  }
};

const send_notification = async (data) => {
  const Payload = {
    messaging_product: "whatsapp",
    to: data.number,
    type: "template",
    template: {
      name: "notifikasi_lskk",
      language: {
        code: "id",
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "text",
              text: data.title,
            },
          ],
        },
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: data.content,
            },
          ],
        },
      ],
    },
  };
  try {
    const send = await axios.post(process.env.ENDPOINT, Payload, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    });
    if (send.status == 200) {
      return (response = { ...requestResponse.success });
    } else {
      return { ...requestResponse.unprocessable_entity };
    }
  } catch (error) {
    return { ...requestResponse.unprocessable_entity };
  }
};

const push_notifications_mqtt = async (data) => {
  try {
    var client = mqtt.connect(process.env.RMQ_HOST, {
      username: process.env.RMQ_USER,
      password: process.env.RMQ_PASS,
      protocolId: "MQTT",
    });
    client.on("connect", function () {
      client.publish(
        data.guid,
        JSON.stringify({
          title: data.title,
          content: data.content,
        })
      );
      client.end();
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  Send_Otp,
  send_notification,
  push_notifications_mqtt,
};
