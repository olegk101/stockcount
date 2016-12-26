const express = require('express');
const Category = require('../models/Category');
const Item = require('../models/Item');

const router = express.Router();



/**
 * Load all items
 */
router.get('/allitems', (req, res) => {
  Item.find((err, data) => {
    if (err) throw err;
    res.status(200).send(data);
  });
});

/**
 * Add new item
 */
router.post('/additem', (req, res) => {
  const { name, buyPrice, sellPrice, category } = req.body;
  const item = new Item({
    name,
    buyPrice,
    sellPrice,
    category,
  });

  item.save((err) => {
    if (err) throw err;
    res.status(200).send('item added');
  });
});

/**
 * Edit item
 */
router.post('/edititem', (req, res) => {
  const { _id, name, buyPrice, sellPrice, category } = req.body;
  Item.update(
    { _id },
    {
      $set: { name, buyPrice, sellPrice, category },
    },
    (err) => {
      if (err) throw err;
      res.status(200).send('item edited');
    });
});

/**
 * Delete item
 */
router.post('/removeitem', (req, res) => {
  const id = req.body["_id"]
  Item.findByIdAndRemove(id, (err) => {
    if (err) throw err;
    res.status(200).send('item deleted');
  });
});

/**
 * Load all categories
 */
router.get('/allcategories', (req, res) => {
  Category.find((err, data) => {
    if (err) throw err;
    res.status(200).send(data);
  });
});

/**
 * Add new category
 */
router.post('/addcategory', (req, res) => {
  const category = new Category(req.body);

  category.save((err) => {
    if (err) throw err;
    res.status(200).send('category added');
  });
});

/**
 * Edit category
 */
router.post('/editcategory', (req, res) => {
  const { id, name } = req.body;

  Category.update(
    { _id: id },
    {
      $set: { name },
    },
    (err) => {
      if (err) throw err;
      res.status(200).send('category updated');
    });
});

/**
 * Delete category
 */
router.post('/removecategory', (req, res) => {
  const { id, name } = req.body;
  console.log(id, name)
  Category.findByIdAndRemove(id, (err) => {
    if (err) throw err;

    Item.find((error, items) => {
      if (error) throw err;

      items.forEach((item) => {
        if (item.category === name) item.category = '';
        item.save((saveError) => {
          if (saveError) throw err;
        });
      });
    });

    res.status(200).send('category deleted');
  });
});


module.exports = router;
