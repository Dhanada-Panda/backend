const nodemailer = require("nodemailer");
var express = require('express');
var app = express();
const connectDB = require('./db/connection');
var bodyParser = require('body-parser');
const products = require("./routes/products");
const Product = require('./models/product');

// Import the product list directly from products.json
const productlist = require('./products.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route handlers
app.get('/', function (req, res) {
   res.send("hello world");
});

app.use("/api/products", products);

const start = async () => {
   try {
      // Connect to the database
      await connectDB();
      console.log('MongoDB connected successfully');

      // Insert the product list into the database
      await Product.deleteMany();
      await Product.create(productlist);
      console.log('Products successfully added to the database!');
      
   } catch (error) {
      console.error(error);
   }
};

// Start the application
start();

var server = app.listen(5000, function () {
   console.log("Express App running at http://127.0.0.1:5000/");
});