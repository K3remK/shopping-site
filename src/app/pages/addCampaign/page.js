'use client';

import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Label,
  Navbar,
  NavbarBrand
} from "reactstrap";

export default function AddCampaignPage() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const resp = await fetch(`http://localhost:5000/products/`);
        const data = await resp.json();
        setProducts(data);
        if (data.length > 0) setSelectedProductId(data[0].id.toString()); // Set initial selected ID as string
      } catch (err) {
        console.error("Failed to fetch product: ", err);
      }
    };

    fetchProducts();
  }, []);

  const handleDiscountChange = (newDiscount) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id.toString() === selectedProductId
          ? { ...product, discountPercentage: newDiscount }
          : product
      )
    );
  };

  const applyDiscount = async () => {
    const product = products.find((p) => p.id.toString() === selectedProductId);
    if (!product) return;

    try {
      const resp = await fetch(`http://localhost:5000/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ discountPercentage: product.discountPercentage }),
      });

      if (resp.ok) {
        window.alert("Discount updated successfully.");
      } else {
        window.alert("Failed to update discount.");
      }
    } catch (error) {
      window.alert("Error applying discount:", error);
    }
  };

  const selectedProduct = products.find((p) => p.id.toString() === selectedProductId);

  return (
    <div className="container py-4">
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
      </Button>
    </Navbar>
    <div style={{marginTop: "100px"}}>
      <h1 className="mb-4">Add Campaign - Set Product Discount</h1>
      <FormGroup>
        <Label for="productSelect">Select Product</Label>
        <Input
          id="productSelect"
          type="select"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
        >
          {products.map((product) => (
            <option key={product.id} value={product.id.toString()}>
              {product.title}
            </option>
          ))}
        </Input>
      </FormGroup>

      {selectedProduct && (
        <Card className="mb-4">
          <CardImg
            top
            width="100%"
            src={selectedProduct.imageUrl}
            alt={selectedProduct.name}
          />
          <CardBody>
            <h5>{selectedProduct.name}</h5>            
            Price: ${selectedProduct.price} {}
            Discount Price: ${(selectedProduct.price * (1 - selectedProduct.discountPercentage / 100)).toFixed(2)}
            <FormGroup>
              <Label for="discountInput">Discount (%)</Label>
              <Input
                id="discountInput"
                type="number"
                min={0}
                max={100}
                value={selectedProduct.discountPercentage || 0}
                onChange={(e) => handleDiscountChange(Number(e.target.value))}
                style={{ width: "100px" }}
              />
            </FormGroup>
          </CardBody>
        </Card>
      )}
        <p>Discounts bigger than %10 will be listed on campaign carousel</p>
      <Button color="primary" onClick={applyDiscount}>
        Apply Discount
      </Button>
      </div>
    </div>
  );
}
