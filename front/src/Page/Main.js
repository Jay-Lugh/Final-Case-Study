import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Component/Header";
import Filter from "../Component/Filter";
import ProductCard from "../Component/ProductCard";

export default function Main() {
  // Product data
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Loading and error screens
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Categories for the filter
  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products");
        setProducts(response.data.data);
        setFilteredProducts(response.data.data); 
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Show loading and error screens
  if (loading) {
    return <div className="loadingScreen">Loading...</div>;
  }

  if (error) {
    return <div className="errorScreen">{error}</div>;
  }

  // Handle search and filtering
  const handleSearch = (searchTerm, selectedCategories, minPrice, maxPrice) => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

   
    if (minPrice !== '') {
      const minPriceNum = parseFloat(minPrice); 
      filtered = filtered.filter((product) => product.price >= minPriceNum);
    }

    if (maxPrice !== '') {
      const maxPriceNum = parseFloat(maxPrice); 
      filtered = filtered.filter((product) => product.price <= maxPriceNum);
    }

    setFilteredProducts(filtered); 
  };

  return (
    <div>
      <Header user = "user"/>
      <div className="main">
        <aside className="searchFilter">
        
          <Filter onSearch={handleSearch} categories={uniqueCategories} />
        </aside>

        <div className="container">
          
          <div className="product-list">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <h1>No product Found</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
