import React from 'react';
import { Link } from 'react-router-dom';

const ItemList = ({ items }) => {
  if (!items.length) {
    return <p>Товаров не найдено</p>;
  }

  return (
    <div className="row">
      {items.map((item) => (
        <div className="col-4" key={item.id}>
          <div className="card catalog-item-card">
            <img
              src={item.images?.[0] || '/img/placeholder.png'}
              className="card-img-top"
              alt={item.title}
            />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.price} ₽</p>
              <Link to={`/catalog/${item.id}.html`} className="btn btn-outline-primary">
                Заказать
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;