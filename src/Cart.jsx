import { PropTypes } from 'prop-types';

const CartItem = ({ product, quantity, setQuantity }) => {
  // TODO: img, change of quantity/deletion functionality
  return (
    <div className="item">
      <p>{product.title} x {quantity} = {product.price*quantity}</p>
      <button onClick={() => setQuantity(product, quantity > 1 ? quantity-1 : 1) }>-</button>
      <input type="number" value={quantity} min="1" onInput={(e) => setQuantity(product, Number(e.target.value)) } />
      <button onClick={() => setQuantity(product, quantity+1) }>+</button>
      <button onClick={() => setQuantity(product, 0) }>Delete item</button>
    </div>
  );
}

CartItem.propTypes = {
  product: PropTypes.object,
  quantity: PropTypes.number,
  setQuantity: PropTypes.func
};

const Cart = ({cart, setCart, total}) => {
  function setQuantity(product, quantity) {
    if (quantity > 0) {
      setCart(cart.map(item => item.product === product ? { ...item, quantity: quantity } : item));
    } else {
      setCart(cart.filter(item => item.product !== product));
    }
  }

  return (
    <div className="cart">
      <h2>Cart</h2>
      <div className="contents">
	{
	  (cart.length > 0) ?
	  cart.map((item, index) => {
	    return <CartItem key={index} product={item.product} quantity={item.quantity} setQuantity={setQuantity} />
	  })
	  : "Cart is empty"
	}
      </div>
      {cart.length > 0 ? <p>Total price: {total}</p> : ""}
      <button onClick={() => {setCart([])}}>Clean</button>
      <button onClick={() => {alert("Order submitted"); setCart([])}}>Submit order</button>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.array,
  setCart: PropTypes.func,
  total: PropTypes.number
};

export default Cart;
