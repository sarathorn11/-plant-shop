const express = require("express");
const router = express.Router();
const {
  PlantGift,
} = require("../models/associations");

router.get("/", async (req, res) => {
  try {
    const data = await PlantGift.findAll()
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Cannot retrieve data", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await PlantGift.findOne({
      where: { id }
    })
    res.json(data);
  } catch (err) {
    res.status(400).json({ msg: "Cannot retrieve data", error: err.message });
  }
});

module.exports = router;
