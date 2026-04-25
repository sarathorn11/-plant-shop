const express = require("express");
const router = express.Router();
const { sequelize } = require('../models');
const {
  Product,
  Care,
  Light,
  Size,
  ProductSize,
  Image,
  Category,
  ProductCategory,
} = require("../models");
const { Op } = require("sequelize");
// const verifyToken = require("./auth");

// Helper function to find entities by name
const findEntityByName = async (Model, name, key) => {
  const entity = await Model.findOne({ where: { name } });
  return { [key]: entity ? entity.id : null };
};

// Helper function to map and find entity IDs
const mapEntities = async (items, Model, key) => {
  return Promise.all(
    items.map(async ({ name }) => findEntityByName(Model, name, key))
  );
};

const findIDByName = async (Model, name) => {
  const entity = await Model.findOne({ where: { name } });
  return entity ? entity.id : null
};

router.post("/", async (req, res) => {
  try {
    const { items } = req.body;
    const payload = await Promise.all(
      items.map(
        async ({
          name,
          code,
          description,
          imageUrl,
          Categories,
          productCares,
          productLights,
          ProductImages,
          ProductSizes,
        }) => {
          return {
            name,
            code,
            description,
            image_url: imageUrl,
            care_id: await findIDByName(Care, productCares),
            light_id: await findIDByName(Light, productLights),
            ProductCategories: await mapEntities(
              Categories,
              Category,
              "category_id"
            ),
            ProductImages,
            ProductSizes: await Promise.all(
              ProductSizes.map(async ({ name, price }) => {
                const { size_id } = await findEntityByName(
                  Size,
                  name,
                  "size_id"
                );
                return { size_id, price };
              })
            ),
          };
        }
      )
    );

    const data = await Product.bulkCreate(payload, {
      include: [
        "ProductSizes",
        "ProductCategories",
        "ProductImages",
      ],
    });
    res.send(data);
  } catch (err) {
    res.status(404).json({ msg: "Cannot create data", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { productName, code, size, care, light, category, isSortByAZ } = req.query
    const data = await Product.findAll({
      attributes: [
        "id",
        "name",
        "code",
        "description",
        "care_id",
        ["image_url", "imageUrl"],
      ],
      include: [
        {
          model: ProductSize,
          as: "ProductSizes",
          attributes: ["price"],
          include: [
            {
              model: Size,
              as: "size",
              attributes: ["name"],
            },
          ],
        },
        {
          model: Care,
          attributes: ['name'],
        },
        {
          model: Light,
          attributes: ['name'],
        },
        {
          model: ProductCategory,
          as: "ProductCategories",
          attributes: ['id'],
          include: [
            {
              model: Category,
              attributes: ["name"],
            },
          ],
        },
        {
          model: Image,
          as: "ProductImages",
          attributes: ["name"],
        },
      ],
      where: {
        ...(productName && {
          name: generateLikeClause(productName),
        }),
        ...(code && {
          code: generateLikeClause(code),
        }),
        ...(care && {
          '$Care.name$': care,
        }),
        ...(light && {
          '$Light.name$': light,
        }),
        ...(size && {
          '$ProductSizes->size.name$': size,
        }),
        ...(category && {
          '$ProductCategories->Category.name$': category,
        }),
      },
      // order: [
      //   (isSortByAZ && ['name', 'DESC']),
      // ]
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Cannot retrieve data", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findOne({
      where: { id },
      attributes: [
        "id",
        "name",
        "code",
        "description",
        "care_id",
        ["image_url", "imageUrl"],
      ],
      include: [
        {
          model: ProductSize,
          as: "ProductSizes",
          attributes: ["price"],
          include: [
            {
              model: Size,
              as: "size",
              attributes: ["name"],
            },
          ],
        },
        {
          model: Care,
          attributes: ['name'],
        },
        {
          model: Light,
          attributes: ['name'],
        },
        {
          model: ProductCategory,
          as: "ProductCategories",
          attributes: ['id'],
          include: [
            {
              model: Category,
              attributes: ["name"],
            },
          ],
        },
        {
          model: Image,
          as: "ProductImages",
          attributes: ["name"],
        },
      ],
    });
    res.json(data);
  } catch (err) {
    res.status(400).json({ msg: "Cannot retrieve data", error: err.message });
  }
});

// ================
// INTERNAL HELPER
// ================

/**
 * To generate LIKE clause
 * @param {any} fieldValue
 * @return {object}
 */
function generateLikeClause(fieldValue) {
  return { [Op.like]: `%${fieldValue}%` }
}


// ================
module.exports = router;
