const product = require("../models/product");

const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const productdata = await product.find({});

    // Send the response with product data
    res.status(200).json({ productdata });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching products", error: error.message });
  }
};

const getAllProductsTesting = async (req, res) => {
  try {
    // Fetch all products from the database with optional search query
    const queryObject = {};

    // Check if the query has a 'name' parameter
    const { name } = req.query;
    if (name) {
      queryObject.name = { $regex: name, $options: "i" }; // Case-insensitive search
    }

    // Handle pagination
    let page = Number(req.query.page) || 1; // Default page is 1
    let limit = Number(req.query.limit) || 2; // Default limit is 2
    let skip = (page - 1) * limit; // Calculate how many products to skip

    // Fetch filtered and paginated products, sorted by price in descending order
    const productdatatest = await product.find(queryObject)
      .sort('-price') // Sort by price in descending order
      .skip(skip) // Skip products for pagination
      .limit(limit); // Limit the number of products returned

    // Get the total number of products (for pagination info)
    const totalProducts = await product.countDocuments(queryObject);

    console.log("Received Query:", req.query);
    console.log("Filtered Products:", productdatatest);

    // Send paginated response with product data and pagination details
    res.status(200).json({
      totalProducts,
      page,
      totalPages: Math.ceil(totalProducts / limit), // Total number of pages
      productdatatest
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching products", error: error.message });
  }
};

module.exports = { getAllProducts, getAllProductsTesting };
