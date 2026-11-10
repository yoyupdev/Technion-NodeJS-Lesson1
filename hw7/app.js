// Yonatan Yuryev + Kirill Pushkin
const path = require("path");
const fs = require("fs");

const usersPath = path.join(__dirname, "/", "users.json");
const fileContent = fs.readFileSync(usersPath, "utf-8");
const parsedJson = JSON.parse(fileContent);

const usersCount = parsedJson.length + "";
let userNames = [];
for (let i = 0; i < parsedJson.length; i++) {
  userNames[i] = parsedJson[i].name;
}

fs.writeFileSync("users_count.txt", usersCount, "utf-8");
fs.writeFileSync("users_names.txt", userNames.join("\n"), "utf-8");
