const http = require("http");
const localtunnel = require("localtunnel");
const { name, port } = require("./contender.json");
const getAnswer = require("./answer");

const server = http.createServer(function(req, res) {
  const answer = getAnswer("2 + 2?");
  console.log(req.method, req.url);
  res.writeHead(200, { "Content-type": "text/plain" });
  res.end(answer);
});

server.listen(port, "localhost", function() {
  console.log(`Server is listening on http://localhost:${port}`);
});

const tunnel = localtunnel(
  port,
  { subdomain: name },
  function(err, tunnel) {
    if (err) {
      console.error(`Local tunnel throws ERROR: ${err}`);
    }
    console.log(`Local tunnel opened on ${tunnel.url}`);
  }
);
