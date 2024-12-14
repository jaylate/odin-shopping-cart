import { useState, useEffect } from 'react'
import Navbar from './Navbar.jsx'
import { Products } from './Product.jsx'
import Cart from './Cart.jsx';

const Shoppage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    for (let item of cart) {
      total += Number(item.product.price*item.quantity);
    }
    setTotal(total);
  }, [cart]);

  const addToCart = (product, quantity) => {
    const existingProduct = cart.find(item => item.product === product);
    if (existingProduct) {
      setCart(cart.map(item => item.product === product ? { ...item, quantity: item.quantity + quantity } : item));
    } else {
      setCart([...cart, { product, quantity: quantity }]);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="shop">
	<Products addToCart={addToCart} />
        <Cart cart={cart} setCart={setCart} total={total} />
      </div>
    </div>
  );
};

export default Shoppage;
