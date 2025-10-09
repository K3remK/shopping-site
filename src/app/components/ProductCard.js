
import { Card, CardImg, CardBody, CardSubtitle, CardTitle, Input, Button, CardText, Container } from "reactstrap";
import Link from "next/link"
import StarRating from "./StarRating";
import { useContext } from 'react';
import CartControlItem from "@/app/components/CartControlItem";

export default function ProductCard(props) {
  const { product, inCart, addToCartHandler, increaseAmountHandler, decreaseAmountHandler, removeFromCartHandler } = props;
  const item = inCart(product.id);
  const amount = item?.amount || 0;
  return (<div>
    <Card className="w-full h-full m-1" style={{ height: "550px" }}>
      <Link href={"/pages/" + product.id}>
        
        <CardImg alt="productImg" src={product.thumbnail} height="auto" top width="100%"></CardImg>
      </Link>

      <CardBody className="d-flex flex-column justify-content-between">
        <CardTitle className="fw-bold" style={{marginBottom: 0}}>{product.brand}</CardTitle>
        <CardTitle style={{marginTop: 0}} tag="h5">{product.title}</CardTitle>
        
        <CardSubtitle className="mb-2 text-muted" tag="h6">
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
        </CardSubtitle>
        <StarRating rating={product.rating} rateCount={product.reviews.length}></StarRating>
        {amount === 0 ? (
          <Button className="btn-warning mt-2" onClick={() => addToCartHandler(product)}>
            Add to Cart
          </Button>
        ) : (
          <CartControlItem 
            id={product.id}
            amount={amount}
            removeFromCartHandler={removeFromCartHandler}
            increaseAmountHandler={increaseAmountHandler}
            decreaseAmountHandler={decreaseAmountHandler}
          ></CartControlItem>
        )}
      </CardBody>
    </Card>
  </div>)
}

