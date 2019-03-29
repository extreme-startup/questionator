const http = require("http");
const localtunnel = require("localtunnel");
const { name, port } = require("./contender.json");
const url = require('url');
const getAnswer = require("./answer");

const server = http.createServer(function(req, res) {
  let requestInfo = url.parse(req.url,true);
  console.log(req.method, requestInfo.query.question);

  const answer = getAnswer(requestInfo.query.question);

  res.writeHead(200, { "Content-type": "text/plain" });
  res.end(answer);
});

server.listen(port, "localhost", function() {
  console.log(`Server is listening on http://localhost:${port}`);
});
