'use client'

import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "@/app/components/CartContext";
import ProductCard from "@/app/components/ProductCard";
import { CardTitle, Col, Container, Row, Button, Navbar, NavbarBrand, InputGroup, Input } from "reactstrap";
import Link from "next/link";
import CustomNavbar from "@/app/components/CustomNavbar";
import CartItem from "@/app/components/CartItem";
import { cart } from "@/app/components/data";

export default function Cart() {
  const { cartList, inCart, addToCartHandler, increaseAmountHandler, decreaseAmountHandler, removeFromCartHandler, clearCart } = useContext(CartContext);
  return <Container style={{ marginTop: "100px" }}>
    <Navbar color="dark" dark expand="lg" fixed="top" className="px-4">
      <NavbarBrand href="/" className="font-bold text-white">
        MySite
      </NavbarBrand>
      {/* Cart icon */}
      <Button
        id="cartButton"
        color="link"
        href="/pages/cart"
        className="position-relative"
      >
        <img
          src="/cart2.svg"
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
  <Row>
    {/* Left side: cart items */}
    <Col md={9}>
      <h2 style={{ fontWeight: "bold" }}>Shopping Cart</h2>
      <p style={{ textAlign: "right" }}>Price</p>
      <hr />
      {cartList.map((item, index) => (
        <CartItem key={index} 
        product={item} 
        decreaseAmountHandler={decreaseAmountHandler} 
        increaseAmountHandler={increaseAmountHandler}
        removeFromCartHandler={removeFromCartHandler}
        clearCart={clearCart}/>
      ))}
    </Col>

    {/* Right side: total and pay */}
    <Col md={3} className="">
      <h5>Total: ${cartList.reduce((sum, item) => sum + (item.price * (1 - item.discountPercentage / 100)) * item.amount, 0).toFixed(2)}</h5>
      <Button color="btn rounded-pill btn-warning w-100" onClick={clearCart} className="mt-2">Proceed to Checkout</Button>
    </Col>
  </Row>
</Container>
}
