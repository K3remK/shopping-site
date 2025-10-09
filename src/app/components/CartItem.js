import Link from "next/link";
import Image from "next/image";
import { CardText, Container, Row, Col, Button } from "reactstrap";
import CartControlItem from "./CartControlItem";

export default function CartItem(props) {
    const {product, decreaseAmountHandler, removeFromCartHandler, increaseAmountHandler, clearCart} = props;
    return (
        // return the cart product
        <Container key={`product-${product.id}`}>
          <Row>
            <Col>
              <Link href={`/pages/${product.id}`}>
                <Image src={product.thumbnail} width={200} height={200} alt="product image" />
              </Link>
            </Col>
            <Col>
              <div>
                <p className="fw-bold">
                  {product.brand + " " + product.title}
                </p>
                <CartControlItem 
                  id={product.id}
                  amount={product.amount}
                  removeFromCartHandler={removeFromCartHandler}
                  increaseAmountHandler={increaseAmountHandler}
                  decreaseAmountHandler={decreaseAmountHandler}
                />
              </div>
            </Col>
            <Col className="text-end fw-bold">
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
            </Col>
          </Row>
          <hr />
        </Container>
    );
}