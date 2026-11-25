const express = require("express");
const fs = require("node:fs/promises");
const path = require("path");
const usersPath = path.join(__dirname, "db", "users.json");
const userPagePath = path.join(__dirname, "ui", "user.html");

async function getUsers() {
  try {
    const users = await fs.readFile(usersPath, { encoding: "utf-8" });
    return JSON.parse(users);
  } catch (err) {
    console.log(err);
  }
}

async function getUserById(id) {
  try {
    const users = await fs.readFile(usersPath, { encoding: "utf-8" });
    const allUsers = JSON.parse(users);
    return allUsers.find((u) => u.id == id);
  } catch (err) {
    console.log(err);
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

function isValidQuery(age) {
  return !isNaN(age);
}

app.get("/api/users", async (req, res) => {
  let { minAge, maxAge } = req.query;

  minAge = parseInt(minAge);
  maxAge = parseInt(maxAge);

  let users = await getUsers();
  let isValidRequest = true;
  let text = "";

  if (minAge && maxAge) {
    if (isValidQuery(minAge) && isValidQuery(maxAge))
      users = users.filter((u) => u.age >= minAge && u.age <= maxAge);
    else {
      isValidRequest = false;
      text = "Min and Max";
    }
  } else if (minAge && !maxAge) {
    if (isValidQuery(minAge)) users = users.filter((u) => u.age >= minAge);
    else {
      isValidRequest = false;
      text = "Min";
    }
  } else if (!minAge && maxAge) {
    if (isValidQuery(maxAge)) users = users.filter((u) => u.age <= maxAge);
    else {
      isValidRequest = false;
      text = "Max";
    }
  }

  if (!isValidRequest) {
    res.status(404);
    res.json({ message: `${text} age must be a number` });
    return;
  }
  res.json(users);
});

app.get("/api/users/filter", async (req, res) => {
  let { minAge, maxAge } = req.query;

  minAge = parseInt(minAge);
  maxAge = parseInt(maxAge);

  let users = await getUsers();
  let isValidRequest = true;
  let text = "";

  if (minAge && maxAge) {
    if (isValidQuery(minAge) && isValidQuery(maxAge))
      users = users.filter((u) => u.age >= minAge && u.age <= maxAge);
    else {
      isValidRequest = false;
      text = "Min and Max";
    }
  } else if (minAge && !maxAge) {
    if (isValidQuery(minAge)) users = users.filter((u) => u.age >= minAge);
    else {
      isValidRequest = false;
      text = "Min";
    }
  } else if (!minAge && maxAge) {
    if (isValidQuery(maxAge)) users = users.filter((u) => u.age <= maxAge);
    else {
      isValidRequest = false;
      text = "Max";
    }
  }

  if (!isValidRequest) {
    res.status(404);
    res.json({ message: `${text} age must be a number` });
    return;
  }
  res.json(users);
});

app.get("/api/users/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  if (isNaN(id)) {
    res.status(404);
    res.json({ message: "ID must be a number" });
    return;
  }
  const user = await getUserById(id);
  let userPageHtml = await fs.readFile(userPagePath, { encoding: "utf-8" });
  userPageHtml = userPageHtml
    .replace("{{ID}}", user.id)
    .replace("{{NAME}}", user.name)
    .replace("{{EMAIL}}", user.email)
    .replace("{{AGE}}", user.age);
  res.send(userPageHtml);
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
