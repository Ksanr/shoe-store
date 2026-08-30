import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  incrementItem,
  decrementItem,
  clearCart,
} from '../store/slices/cartSlice';
import { submitOrder, resetOrder } from '../store/slices/orderSlice';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/Error/ErrorMessage';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order);

  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [agree, setAgree] = useState(false);
  const [formError, setFormError] = useState('');

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  const handleRemove = (id, size) => {
    dispatch(removeFromCart({ id, size }));
  };

  const handleIncrement = (id, size) => {
    dispatch(incrementItem({ id, size }));
  };

  const handleDecrement = (id, size) => {
    dispatch(decrementItem({ id, size }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!phone || !address || !agree) {
      setFormError('Заполните все поля и согласитесь с правилами');
      return;
    }
    setFormError('');
    const orderData = {
      owner: { phone, address },
      items: cart.map((item) => ({
        id: item.id,
        price: item.price,
        count: item.count,
      })),
    };
    dispatch(submitOrder(orderData));
  };

  if (order.success) {
    dispatch(clearCart());
    dispatch(resetOrder());
    return (
      <div className="container text-center mt-5">
        <h2>Заказ оформлен!</h2>
        <p>Спасибо за покупку. Мы свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  if (order.loading) return <Loader />;
  if (order.error) return <ErrorMessage message={order.error} onRetry={() => dispatch(resetOrder())} />;

  const isFormValid = phone.trim() && address.trim() && agree;

  return (
    <div className="container">
      <h2 className="text-center my-4">Корзина</h2>

      {cart.length === 0 ? (
        <p className="text-center">Корзина пуста</p>
      ) : (
        <>
          {/* Таблица */}
          <div className="table-responsive">
            <table className="table table-bordered cart-table">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Название</th>
                  <th>Размер</th>
                  <th>Кол-во</th>
                  <th>Стоимость</th>
                  <th>Итого</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={`${item.id}-${item.size}`}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.size}</td>
                    <td>
                      <div className="quantity-control">
                        <button
                          className="qty-btn"
                          onClick={() => handleDecrement(item.id, item.size)}
                          disabled={item.count <= 1}
                        >
                          −
                        </button>
                        <span className="qty-value">{item.count}</span>
                        <button
                          className="qty-btn"
                          onClick={() => handleIncrement(item.id, item.size)}
                          disabled={item.count >= 10}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{item.price} ₽</td>
                    <td>{item.price * item.count} ₽</td>
                    <td>
                      <button
                        className="btn-remove"
                        onClick={() => handleRemove(item.id, item.size)}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="5" className="text-end fw-bold">
                    Общая стоимость:
                  </td>
                  <td className="fw-bold">{totalPrice} ₽</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="order-form-wrapper">
            <h3 className="text-center mb-3">Оформить заказ</h3>
            <form className="order-form" onSubmit={handleSubmitOrder}>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Телефон</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  placeholder="Ваш телефон"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Адрес доставки</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Адрес доставки"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="agree"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="agree">
                  Согласен с правилами доставки
                </label>
              </div>
              {formError && <div className="alert alert-danger">{formError}</div>}
              <button
                type="submit"
                className={`btn btn-order ${isFormValid ? 'btn-order-active' : 'btn-order-disabled'}`}
                disabled={!isFormValid}
              >
                Оформить
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;