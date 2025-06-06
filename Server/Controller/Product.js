  const Product = require("../Model/Product");
  const Category = require("../Model/Category");

  exports.createProduct = async (req, res) => {
    try {
      const { title, description, imageUrl, price, categoryName } = req.body;

      const category = await Category.findOne({ name: categoryName });
      if (!category) return res.status(404).json({ message: "Category not found" });

      
      const existing = await Product.findOne({ category: category._id });
      if (existing) return res.status(400).json({ message: "Product already exists" });

      const product = await Product.create({
        title,
        description,
        imageUrl,
        price,
        category: category._id,
        categoryName: category.name,
          
      });

      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find().populate("category", "name");
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const Product = await Product.findByIdAndDelete(id);
    if (!Product) return res.status(404).json({ message: "Section not found" });

    res.status(200).json({ message: "Section deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};