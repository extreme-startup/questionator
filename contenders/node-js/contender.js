const http = require("http");
const { port } = require("./contender.json");
const url = require("url");
const getAnswer = require("./answer");

const server = http.createServer(function(req, res) {
  let requestInfo = url.parse(req.url, true);
  console.log(`Got the question: \n ${requestInfo.query.question}`);

  const answer = getAnswer(requestInfo.query.question);

  res.writeHead(200, { "Content-type": "text/plain" });
  res.end(answer);
  console.log(`Answered with: \n ${answer}`);
});

server.listen(port, "localhost", function() {
  console.log(`Server is listening on http://localhost:${port}`);
});
