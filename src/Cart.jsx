
import { PropTypes } from 'prop-types';

const CartItem = ({ product, quantity }) => {
  // TODO: img, change of quantity/deletion functionality
  return (
    <div className="item">
      <p>{product.title} x {quantity} = {product.price*quantity}</p>
    </div>
  );
}

CartItem.propTypes = {
  product: PropTypes.object,
  quantity: PropTypes.number,
};

const Cart = ({cart, setCart, total}) => {
  return (
    <div className="cart">
      <h2>Cart</h2>
      <div className="contents">
	{
	  (cart.length > 0) ?
	  cart.map((item, index) => {
	    return <CartItem key={index} product={item.product} quantity={item.quantity} />
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
