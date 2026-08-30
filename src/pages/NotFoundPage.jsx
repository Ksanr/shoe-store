import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center" style={{ padding: '60px 0' }}>
          <h1 className="display-1">404</h1>
          <h2>Страница не найдена</h2>
          <p className="lead">
            К сожалению, запрашиваемая страница не существует.
          </p>
          <Link to="/" className="btn btn-primary">
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;