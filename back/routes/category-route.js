const express = require("express");
const router = express.Router();
const {
  Category,
} = require("../models");

router.get("/", async (req, res) => {
  try {
    const { type } = req.query
    const data = await Category.findAll({ where: {
      ...(type && {
        type,
      }),
    }})
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Cannot retrieve data", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findOne({
      where: { id }
    })
    res.json(data);
  } catch (err) {
    res.status(400).json({ msg: "Cannot retrieve data", error: err.message });
  }
});

module.exports = router;
