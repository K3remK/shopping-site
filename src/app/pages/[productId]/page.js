'use client';

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import StarRating from "@/app/components/StarRating";
import { Container, Row, Col, CardText, CardTitle, Button, CardImg, Navbar, NavbarBrand } from "reactstrap";
import CartControlItem from "@/app/components/CartControlItem";
import { CartContext } from "@/app/components/CartContext";
import { cart } from "@/app/components/data";
import AddNewReview from "@/app/components/AddNewReview";

export default function ProductDetailPage({ params }) {
  const { productId } = React.use(params);
  const [product, setProduct] = useState(null);
  const { cartList, inCart, addToCartHandler, increaseAmountHandler, decreaseAmountHandler, removeFromCartHandler, clearCart } = useContext(CartContext);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resp = await fetch(`http://localhost:5000/products/${productId}`);
        const data = await resp.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product: ", err);
      }
    };
    fetchProduct();
  }, [productId]);

  const newReview = {
    comment: "This is a comment!",
    date: new Date().toISOString().split('T')[0],
    rating: 4,
    reviewTitle: "Title",
    reviewerEmail: "email",
    reviewerName: "kerem"
};


  // add review to product (POST)
  const addReviewHandler = async (review) => {
    try {
      const updatedReviews = [...product.reviews, review];
      
      let newRating = updatedReviews.reduce((sum, item) => sum + item.rating, 0) / updatedReviews.length;
    
      const resp = await fetch(`http://localhost:5000/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({reviews: updatedReviews, rating: newRating}),
      });

      if (resp.ok) {
        setProduct(null);
        const newProduct = await resp.json();
        setProduct(newProduct);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (!product) return <p>Loading...</p>;
  const item = inCart(product.id);
  const cartAmount = item?.amount || 0;

  return (
    <Container style={{ marginTop: "100px" }}>
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
        <Col md={4}>
            <Image alt="productImg" src={product.thumbnail} width={400} height={400} />
        </Col>
        <Col md={5}>
          <CardTitle>{product.brand} {product.title}</CardTitle>
          {product.rating}{"  "}
          <StarRating rating={product.rating} rateCount={product.reviews.length} link="#reviews" />
          <hr />
          <CardText>Product Details</CardText>
          <Row>
  <Col xs="4">Brand:</Col><Col xs="8">{product.brand}</Col>
</Row>
<Row>
  <Col xs="4">Category:</Col><Col xs="8">{product.category}</Col>
</Row>
<Row>
  <Col xs="4">Stock:</Col><Col xs="8">{product.stock}</Col>
</Row>
<Row>
  <Col xs="4">Warranty:</Col><Col xs="8">{product.warrantyInformation}</Col>
</Row>
<Row>
  <Col xs="4">Shipping:</Col><Col xs="8">{product.shippingInformation}</Col>
</Row>
<Row>
  <Col xs="4">Available:</Col><Col xs="8">{product.availabilityStatus}</Col>
</Row>
<Row>
  <Col xs="4">Return Policy:</Col><Col xs="8">{product.returnPolicy}</Col>
</Row>

          <hr />
          <CardText>About this item</CardText>
          <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            {product.description.split(".").map((item, index) =>
              item.trim() !== "" ? <li key={index}>{item.trim()}</li> : null
            )}
          </ul>
        </Col>
        <Col md={3}>
          <CardText className="mb-2 text-muted" tag="h6">
          {(product.discountPercentage >= 10) ?
            (<div className="mt-1">
            <span className="badge bg-danger">{product.discountPercentage}% OFF</span>
            <p className="card-text text-decoration-line-through m-0">${product.price}</p>
            </div>
            )
            : null
          }
          <br></br>
          ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
        </CardText>
          {cartAmount === 0 ? (
          <Button className="btn-warning mt-2 w-100" onClick={() => addToCartHandler(product)}>
            Add to Cart
          </Button>
        ) : (
          <CartControlItem 
            id={product.id}
            amount={cartAmount}
            removeFromCartHandler={removeFromCartHandler}
            increaseAmountHandler={increaseAmountHandler}
            decreaseAmountHandler={decreaseAmountHandler}
          ></CartControlItem>
        )}
        <hr/>
        <Link className="btn border border-dark mt-2 w-100" href="/pages/cart">
            Go to Cart
          </Link>
        </Col>
      </Row>
      <Row>
        <hr></hr>
        <Row id="reviews">
          <Col><h5>Reviews</h5></Col>
          <Col style={{textAlign: 'right', marginBottom: '14px'}}>
            <AddNewReview addReviewHandler={addReviewHandler}></AddNewReview>
          </Col>
        </Row>
        <hr></hr>
        {product.reviews.map((item, index) => {
          return (
            <Row key={index} style={{textAlign: 'left'}}>
              <Row>
                <Col md={1}><FaUserCircle size={30}></FaUserCircle></Col>
                <Col md={3}><h5>{item.reviewerName}</h5></Col>
              </Row>
              <Row>
                <Col md={3}>
                  <Row>
                    <Col className="m-0"><StarRating rating={item.rating}></StarRating></Col>
                    <Col className="m-0"><p>({item.rating})</p></Col>
                  </Row>
                </Col>
                <Col md={5} className="font-bold">{item.reviewTitle}</Col>
                <Col md={4}>{(new Date(item.date)).toLocaleString()}</Col>
              </Row>
              <Row><p>{item.comment}</p></Row>
              <hr></hr>
            </Row>
          );
        })}
      </Row>
    </Container>
  );
}
