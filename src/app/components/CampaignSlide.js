'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const CampaignSlide = ({  }) => {
  // discounted products
  const [discountProducts, setDiscountProducts] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
  const fetchProducts = async () => {
    const baseUrl = "http://localhost:5000/products";
    const params = new URLSearchParams();
    params.append('discountPercentage_gte', 10);

    try {
      const response = await fetch(`${baseUrl}?${params.toString()}`);
      const data = await response.json();
      setDiscountProducts(data);
    } catch (error) {
      console.error("Failed to fetch discounted products:", error);
    }
  };
  fetchProducts();
}, []);

  return (
  <div className='container my-4'>
  <div id="carouselExampleCaptions" style={{marginTop: '100px'}} className="carousel slide mx-auto" data-bs-ride="carousel">
<div className="carousel-indicators">
  {discountProducts.map((item, i) => (
    <button key={i} type="button" data-bs-target="#carouselExampleCaptions" onClick={() => setIndex(i)} data-bs-slide-to={i} className={i === index ? "active" : ""} aria-label={"slide" + i} aria-current={i === index ? "slide" + i : ""}></button>
  ))}
</div>
<div className="carousel-inner">
  {discountProducts.map((item, i) => (
    <Link key={i} href={"/pages/" + item.id}>
    <div className={`carousel-item ${i === index ? 'active' : ''}`} key={item.id}>
      <div className="card border-0 text-white">
        <div className="carousel-image-wrapper">
          <img src={item.thumbnail} className="card-img" alt={item.title} />
        </div>
        <div className="card-img-overlay d-flex flex-column justify-content-end p-2 bg-dark bg-opacity-50">
          <h6 className="card-title mb-1">{item.title}</h6>
          <div className="">
            <span className="badge bg-danger">{item.discountPercentage}% OFF</span>
            <p className="card-text text-decoration-line-through m-0">${item.price}</p>
            ${(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
    </Link>
  ))}
</div>
<button className="carousel-control-prev" onClick={() => {setIndex(((index - 1 < 0) ? discountProducts.length - 1 : index - 1))}} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" onClick={() => {setIndex((index + 1) % discountProducts.length)}} data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Next</span>
</button>
</div>
<div className='d-flex justify-content-center mt-2'>
    <Link className="btn border border-dark" href="/pages/addCampaign">
            Add Campaign
  </Link>
  </div>
  </div>
  );
}

export default CampaignSlide;