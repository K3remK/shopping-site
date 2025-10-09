'use client'

import Catalog from "./components/Catalog";
import { useContext, useEffect, useState } from "react";
import { CartContext, CartProvider } from "@/app/components/CartContext";
import CustomNavbar from "./components/CustomNavbar";
import CampaignSlide from "./components/CampaignSlide";
import Link from "next/link";
import { Button } from "reactstrap";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { cartList, addToCartHandler, increaseAmountHandler, decreaseAmountHandler, inCart, removeFromCartHandler } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceSort, setPriceSort] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`http://localhost:5000/products`);
      const data = await response.json();
      const uniqueCategories = [...new Set(data.map(item => item.category))];
      setCategories(uniqueCategories);
    }

    const fetchProducts = async () => {
      // JSON-server filtering
      const url = `http://localhost:5000/products`;
      const params = new URLSearchParams();
      if (searchQuery) {
        params.append('q', searchQuery);
      }
      if (selectedCategory && selectedCategory !== "All") {
        params.append('category', selectedCategory);
      }

      const response = await fetch(`${url}?${params.toString()}`);
      let data = await response.json();

      if (priceSort === 'asc') {
        data.sort((a, b) => a.price - b.price);
      } else if (priceSort === 'desc') {
        data.sort((a, b) => b.price - a.price);
      }
      setProducts(data);
    };
    fetchCategories();
    fetchProducts();
  }, [searchQuery, selectedCategory, priceSort]);

  return (
    <div>
      <main>
        <CustomNavbar
          categories={categories}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceSort={priceSort}
          setPriceSort={setPriceSort}
        />
        <CampaignSlide></CampaignSlide>
        <Catalog
          products={products}
          inCart={inCart}
          addToCartHandler={addToCartHandler}
          increaseAmountHandler={increaseAmountHandler}
          decreaseAmountHandler={decreaseAmountHandler}
          removeFromCartHandler={removeFromCartHandler}/>
      </main>
    </div>
  )
}
