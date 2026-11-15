const http = require("http");
const path = require("path");
const fs = require("fs");
const PORT = 5050;

const homePagePath = path.join(__dirname, "templates", "page.html");
const contactPagePath = path.join(__dirname, "templates", "contact.html");
const aboutPagePath = path.join(__dirname, "templates", "about.html");
const cssFilePath = path.join(__dirname, "styles", "styles.css");
const imagePath = path.join(__dirname, "images", "book.jpeg");

const homePageHtml = fs.readFileSync(homePagePath);
const contactPageHtml = fs.readFileSync(contactPagePath);
const aboutPageHtml = fs.readFileSync(aboutPagePath);
const pageCss = fs.readFileSync(cssFilePath);
const image = fs.readFileSync(imagePath);

const server = http.createServer((req, res) => {
  const { url } = req;

  if (url === "/" || url === "/home") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homePageHtml);
    res.end();
  } else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(aboutPageHtml);
    res.end();
  } else if (url === "/contact") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(contactPageHtml);
    res.end();
  } else if (url === "/styles/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(pageCss);
    res.end();
  } else if (url === "/images/book.jpeg") {
    res.writeHead(200, { "content-type": "image/jpeg" });
    res.write(image);
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1 styles='text-align:center;'>Page Not Found 404</h1>");
  }
});

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
