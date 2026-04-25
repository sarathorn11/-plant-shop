const express = require("express");
const router = express.Router();
// const User = require("../models/associations").User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const vertifyToken = require("./auth");
const fs = require("fs");
const {
  User,
} = require("../models");

const multer = require("multer");
let newFile = "";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(".");
    const newName =
      fileName[0] + " - SAM QUIZ - " + Date.now() + "." + fileName[1];
    newFile = newName;
    cb(null, newName);
  },
});

const upload = multer({ storage: storage }).single("profile");

// create user
router.post("/", async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(400).send("Something went wrong!");
    }
    req.body.profile = "avatar.png";
    await User.create(req.body);
    res.send("data posted");
  });
});

// update user-role
router.patch("/:id", async (req, res) => {
  await User.update(
    {
      role: req.body.role,
    },
    {
      where: { id: req.params.id },
    }
  );
  res.send("data updated");
});
// update user profile
router.patch("/userprofile/:id", async (req, res) => {
  await User.update(
    {
      bgreward: req.body.bgreward,
      titlereward: req.body.titlereward,
    },
    {
      where: { id: req.params.id },
    }
  );
  res.send("data updated");
});

// update user-profile image
router.patch("/profile/:id", async (req, res) => {
  // get user to get old profile name to delete from uploads folder
  const user = await User.findAll({
    where: {
      id: req.params.id,
    },
  });
  const fileName = user[0].profile;
  const directoryPath = "uploads/";

  // check to delete file if != avatar.png (default avatar)
  if (fileName != "avatar.png" && fileName != null) {
    fs.unlinkSync(directoryPath + fileName);
  }

  // move image file into uploads and update user table
  upload(req, res, async (err) => {
    if (err) {
      res.status(400).send("Something went wrong!");
    }
    req.body.profile = newFile;
    await User.update(
      {
        profile: req.body.profile,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.send("data updatedo");
  });
});

// get users
// router.get("/", vertifyToken, async (req, res) => {
router.get("/", async (req, res) => {
  const alldata = await User.findAll({
    attributes: {
      exclude: ["password"],
    },
  });
  res.json(alldata);
});

// get user
router.get("/:id", async (req, res) => {
  const user = await User.findAll({
    attributes: {
      exclude: ["password"],
    },
    where: {
      id: req.params.id,
    },
  });
  res.json(user[0]);
});
// login with email password
router.post("/login", async (req, res) => {
  // check if user exists by email
  const user = await User.findAll({
    where: {
      email: req.body.email,
    },
  });
  if (user.length > 0) {
    if (await verifyPassword(req.body.password, user)) {
      const token = jwt.sign(
        {
          data: "foobar",
        },
        "secret",
        { expiresIn: "3h" }
      );

      const loginView = {
        user,
        token,
      };
      res.send(loginView);
    } else {
      res.send("error", 401);
    }
  } else {
    res.send("error", 401);
  }
});

async function verifyPassword(password, user) {
  if (user.length > 0) {
    return await bcrypt.compare(password, user[0].dataValues.password);
  }
}

// delete user
router.delete("/:id", vertifyToken, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.send("deleted");
});

module.exports = router;
