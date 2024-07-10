const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url);
  let stat = fs.statSync(filePath);

  if (req.url == "/") {
    let data = fs.readdirSync("./", "utf-8");
    // console.log(data);
    res.writeHead(200, { "Content-Type": "text/html" });

    createList(data);
  } else {
    if (stat.isFile()) {
      let fileData = fs.readFileSync(filePath, "utf-8");
      res.write(fileData);
    } else if (stat.isDirectory()) {
      //     let filePath = path.join(__dirname, req.url);
      // let stat = fs.statSync(filePath);
      // console.log(`${filePath}/${req.url}`);

      let data = fs.readdirSync(filePath, "utf-8");
      res.end(createList(data));
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }
  }

  res.end("home page");

  function createList(data) {
    data.forEach((file) => {
      res.write(`<a href="/${file}">${file}</a> <br>`);
    });
  }
});

server.listen(3000, () => {
  console.log("server is started");
});
