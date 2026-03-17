const express = require("express");
const app = express();
const { products } = require("./data");
const logger = require("./logger"); 
const authorise = require('./authorise')

// req --> middleware --> res
app.use('/api',authorise, logger)

app.get('/just', (req,res) => {
 

  res.status(201).send('hi')
})




app.get('/query', (req,res) => {
  const {limit, search} =  req.query
  let copy = [...products]

  if(limit){
    copy = copy.slice(0, Number(limit))
  } 
  if (search){
    copy = copy.filter((pro) => {
      return pro.name.startsWith(search)
    })
  }

  res.status(201).send(copy)
})

// req.params
app.get("/api/products/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const product = products.find((pr) => pr.id === Number(id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

app.get("/",logger, (req, res) => {
  const newProducts = products
    .filter((product) => product.name.toLowerCase().startsWith("a"))
    .map((product) => {
      const { id, name, image } = product;
      return { id, name, image };
    });
  res.json(newProducts);
});

app.listen(4000, () => {
  console.log("server is listening on post 4000");
});

