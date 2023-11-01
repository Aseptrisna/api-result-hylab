const http = require("https");
const app = require("./src");
const Configure = require("./src/config")
const server = http.createServer(Configure.credentials,app);
const Logger=require('./src/util/logger')

server.listen(process.env.PORT, () => {
   Logger.info(`Server Started On Port ${process.env.PORT} !!`)
});