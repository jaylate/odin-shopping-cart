import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

const Product = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="product">
      <img src={product.image} />
      <p>{product.title}</p>
      <div>{product.description}</div>
      <p>{product.price}</p>
      <div>
	<button onClick={() => setQuantity(quantity > 1 ? quantity-1 : 1) }>-</button>
	<input type="number" value={quantity} min="1" onInput={(e) => setQuantity(Number(e.target.value)) } />
	<button onClick={() => setQuantity(quantity+1) }>+</button>
	<button onClick={() => addToCart(product, quantity)}>Add to cart</button>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.object,
  addToCart: PropTypes.func
};

const Products = ({ addToCart }) => {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => {
	if (response.status == 400) {
	  throw new Error("API error");
	}
	return response.json();
      })
      .then((response) => setProductsList(response))
      .catch((error) => console.log("Error occured when fetching products: ", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="products loading">Loading...</div>;
  }

  return (
    <div className="products">
      {productsList.slice(0, 9).map((product) => {
	return <Product key={product.id} addToCart={addToCart} product={product} />
      })}
    </div>
  );
};

Products.propTypes = {
  addToCart: PropTypes.func
};

export { Products };
