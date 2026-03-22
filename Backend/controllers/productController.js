import {sql} from "../config/db.js";

export const getAllProducts = async (req, res) => {
   try {
      const products = await sql `
      SELECT * FROM products
      ORDER BY created_at DESC
      `;

      console.log("Fetched products:", products);
      res.status(200).json({success: true, data: products});

   } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({success: false, message: "Failed to fetch products"});
   }
};

export const createProduct = async (req, res) => {
   const { name, image, price } = req.body;

   if (!name || !image || !price) {
      return res.status(400).json({success: false, message: "Name, image, and price are required"});
   }

   try {
      const newProduct = await sql `
         INSERT INTO products (name, image, price)
         VALUES (${name}, ${image}, ${price})
         RETURNING *
      `;
      console.log("Created product:", newProduct[0]);
      res.status(201).json({success: true, data: newProduct[0]});
   } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({success: false, message: "Failed to create product"});
   }
};

export const getProduct= async (req, res) => {
   const { id } = req.params;

   try {
      const product = await sql `
         SELECT * FROM products
         WHERE id = ${id}
      `;
      console.log("Fetched product:", product[0]);
      res.status(200).json({success: true, data: product[0]});
   } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({success: false, message: "Failed to fetch product"});
   }

};

export const updateProduct = async (req, res) => {
   const { id } = req.params;
   const { name, image, price } = req.body;

   try {
      const updatedProduct = await sql `
         UPDATE products
         SET name = ${name}, image = ${image}, price = ${price}
         WHERE id = ${id}
         RETURNING *
      `;
      if (updatedProduct.length === 0) {
         return res.status(404).json({success: false, message: "Product not found"});
      } 

      console.log("Updated product:", updatedProduct[0]);
      res.status(200).json({success: true, data: updatedProduct[0]});
   } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({success: false, message: "Failed to update product"});
   }
};

export const deleteProduct = async (req, res) => {
   const { id } = req.params;

   try {
      await sql `
         DELETE FROM products
         WHERE id = ${id}
      `;
      if(deleteProduct.length === 0) {
         return res.status(404).json({success: false, message: "Product not found"});
      }

      console.log("Deleted product with id:", id);
      res.status(200).json({success: true, message: "Product deleted successfully"});
   } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({success: false, message: "Failed to delete product"});
   }
};
