const server = require("./source/server");
const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log("Listening on " + port);
});