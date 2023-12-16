const Users = require("../models/userModel");
const dotenv = require("dotenv");

// dotenv.config({ path: "./../.env" });

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB Atlas");
});

const deleteUsers = async () => {
  try {
    await Users.deleteMany({});
    console.log("Users are deleted");
  } catch (error) {
    console.log(error);
  }
};

deleteUsers().then(() => {
  console.log("Users are deleted");
});
// call the users api

const addAdmin = async () => {
  const response = await fetch("http://localhost:8000/api/v1/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "admin",
      email: "admin@avesair.com",
      phone: "9876543210",
      password: "test123",
    }),
  });

  const data = await response.json();
};

addAdmin().then(() => {
  console.log("Admin added");
});
