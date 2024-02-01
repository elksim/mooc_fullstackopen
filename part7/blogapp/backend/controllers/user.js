const User = require("../models/user");
const Blog = require("../models/blog");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response) => {
  let users = await User.find({});
  response.json(users);
});

userRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    let user = await User.findOne({ _id: id }).populate("blogs").exec();
    response.json(user);
  } catch (error) {
    response.status(400).json({ error: "that user does not exist." });
  }
});

userRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  if (password.length < 3) {
    response
      .status(400)
      .json({ error: "password must be at least 3 characters long" });
  }
  let saltRounds = 10;
  let passwordHash = await bcrypt.hash(password, saltRounds);

  const user = User({
    username,
    passwordHash,
  });
  const savedUser = await user.save();
  response.set(201).json(savedUser);
});

module.exports = userRouter;
