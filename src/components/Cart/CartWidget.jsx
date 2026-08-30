import { Link } from 'react-router-dom';

const CartWidget = ({ count }) => {
  return (
    <Link to="/cart.html" className="cart-widget">
      <i className="fa fa-shopping-cart"></i>
      {count > 0 && <span className="cart-badge">{count}</span>}
    </Link>
  );
};

export default CartWidget;