const express = require('express');
const router = express.Router();

// GET
router.get("/", (req, res) => {
  try {
    const { products } = require('./server');
    res.json(products);
  } catch(err) {
    console.error(err.message)
  }
});

// GET product by id
router.get("/:id", (req, res) => {
  try {
    const { products } = require('./server');
    const product = products.find(({ id }) => id === req.params.id);
    if(product) res.status(200).send(product);
    else res.status(404).send("Product Was Not Found!");
  } catch(err) {
    console.error(err.message);
  }
});

// POST
router.post("/", (req, res) => {
  try {
    const { products } = require('./server');
    const { id, name, description, price, category, inStock } = req.body;
    const newProduct = { id, name, description, price, category, inStock };

    products.push(newProduct);
    res.status(200).send("Item added successfully");
  } catch(err) {
    console.error(err.message);
  }
});

// PUT
router.put("/:id", (req, res) => {
  try {
    const { products } = require('./server');
    const product = products.find(({ id }) => id === req.params.id);

    if(product) {
      const index = products.indexOf(product);
      const productUpdate = {...product, ...req.body};
  
      products[index] = productUpdate;
      console.log(products);
    }
    else res.status(404).send("Product Was Not Found!");
    
  } catch(err) {
    console.error(err.message);
  }
})

// DELETE
router.delete('/:id', (req, res) => {
  try{
    const { products } = require('./server');
    const product = products.find(({ id }) => id === req.params.id);
    if(product) {
      const index = products.indexOf(product);
  
      products.splice(index, 1);
      res.status(200).send("Product deleted");
    }
    else res.status(404).send("Product Was Not Found!");

  }catch(err) {
    console.error(err.message);
  }
})

module.exports = router;