import React from 'react';

function Products({ onAddToCart }) {
  const products = [
    {
      image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800",
      name: "Elegant Dress",
      price: "₱4,999.00"
    },
    {
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
      name: "Casual Shirt",
      price: "₱2,499.00"
    },
    {
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
      name: "Designer Jeans",
      price: "₱3,999.00"
    }
  ];

  return (
    <section id="collection" className="products">
      <h2>Our Collection</h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button className="add-to-cart" onClick={() => onAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products; 