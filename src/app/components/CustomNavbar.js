'use client';
import React, { useContext } from "react";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  Input,
  Button,
  InputGroup,
  InputGroupText,
  Form,
  FormGroup,
  Container,
  Nav,
  NavItem
} from "reactstrap";
import Link from "next/link";
import { CartContext } from "./CartContext";

export default function CustomNavbar(props) {
  const { categories, searchQuery, setSearchQuery, setSelectedCategory, setPriceSort } = props;
  const { cartList } = useContext(CartContext);

  return (
    <Navbar color="dark" dark expand="lg" fixed="top" className="px-4">
      <NavbarBrand href="/" className="font-bold text-white">
        MySite
      </NavbarBrand>
      {/* Category Combobox */}
      <InputGroup className="w-50">
        <Input
          type="select"
          id="cbCategory"
          required
          style={{ width: 80, fontSize: 14, marginRight: 0 }}
          onChange={(e) => {setSelectedCategory(e.target.value); setSearchQuery('');}}
        >
          {/* Add options dynamically */}
          <option key={0} value="All">All</option>
          {categories.map((item, index) => {
            return (<option key={index + 1} value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>)
          })};
        </Input>
        {/* Search bar */}
        <Input
          type="search"
          id="searchItem"
          placeholder="Search"
          className="w-50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Button
          outline
          color="light"
          style={{ backgroundColor: "burlywood" }}
        >
          <Image
            src="search.svg"
            alt="Search Icon"
            width="20"
            height="20"
          />
        </Button>
      </InputGroup>

      {/* Sort Dropdown */}

      <Input
        type="select"
        id="priceSort"
        style={{ width: 200, marginLeft: 0, fontSize: 14 }}
        onChange={(e) => setPriceSort(e.target.value)}
      >
        <option value="none">None</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </Input>

      {/* Cart icon */}
      <Button
        id="cartButton"
        color="link"
        href="/pages/cart"
        className="position-relative"
      >
        <img
          src="cart2.svg"
          alt="Menu Icon"
          width="40"
          height="40"
        />
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          id="cartCount"
        >
          {cartList.length}
        </span>
      </Button>
    </Navbar>
  );
}
