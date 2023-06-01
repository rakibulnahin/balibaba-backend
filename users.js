const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
router.use(express.urlencoded({ extended: true }))

// define the user schema
const userSchema = new mongoose.Schema({
  UserID: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  purchaseHistory: { type: [String] }
});

// create the User model
const User = mongoose.model('User', userSchema);


router.post("/adduser", async (req, res) => {
  let userID = "user" + (await User.countDocuments({}) + 1)
  let name = req.body.name;
  let username = req.body.username;
  let password = req.body.password;
  let purchaseHistory = []

  console.log(
    name +
    username +
    password
  );

  try {
    let adduser = await User.create({
      UserID: userID,
      name: name,
      username: username,
      password: password,
      purchaseHistory: purchaseHistory
    })

    res.send(JSON.stringify({
      UserID: userID,
      name: name,
      username: username,
      password: password,
      purchaseHistory: purchaseHistory
    }))
  } catch (error) {
    res.send("Error in adding user BE" + error.message)
  }


})

router.get("/getAllUsers", async (req, res) => {
  try {
    let users = await User.find({})
    res.send(JSON.stringify(users))
  } catch (error) {
    res.send("Error in getting all users details " + error.message)
  }

})

router.post("/updateUser", async (req, res) => {
  try {
    let userID = { 'UserID': req.body.UserID }
    let updatedUserame = { $set: { "username": req.body.username } };
    console.log(req.body.UserID + req.body.username);

    let result = await User.updateOne(userID, updatedUserame)
    console.log(result)
    res.send("updated username")
  } catch (error) {
    res.send("Error in updating username")
  }
})

router.post("/getUserByID", async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;

    console.log(username + password);

    const user = await User.findOne({ "username": username, "password": password });
    if (user) {
      console.log(`Found user: ${user}`);
      res.send(user)
    } else {
      console.log(`User not fount`);
      res.send(false)
    }
  } catch (err) {
    console.error("Error while getting user " + err.message);
  }

})


module.exports = router