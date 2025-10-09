'use client'

import { Container, Row, Col } from "reactstrap";
import ProductCard from "./ProductCard";
import { useContext } from 'react';

export default function Catalog(props) {
  const { products, addToCartHandler, inCart, increaseAmountHandler, decreaseAmountHandler, removeFromCartHandler } = props;

  return <div>
    <Container style={{ marginTop: "100px" }}>
      <Row>
        {products.map((item, index) => {
          return (
            <Col key={`product-${index}`} sm="6" md="4" lg="2">
              <ProductCard
                product={item}
                inCart={inCart}
                addToCartHandler={addToCartHandler}
                increaseAmountHandler={increaseAmountHandler}
                decreaseAmountHandler={decreaseAmountHandler}
                removeFromCartHandler={removeFromCartHandler} />
            </Col>
          )
        })}
      </Row>
    </Container>
  </div>
}
