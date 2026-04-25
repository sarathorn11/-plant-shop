const express = require("express");
const router = express.Router();
const {
  Care,
} = require("../models");

router.get("/", async (req, res) => {
  try {
    const data = await Care.findAll()
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Cannot retrieve data", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Care.findOne({
      where: { id }
    })
    res.json(data);
  } catch (err) {
    res.status(400).json({ msg: "Cannot retrieve data", error: err.message });
  }
});

module.exports = router;
