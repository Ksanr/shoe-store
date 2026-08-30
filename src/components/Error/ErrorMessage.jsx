import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="alert alert-danger" role="alert">
      <span>{message || 'Произошла ошибка'}</span>
      {onRetry && (
        <button className="btn btn-outline-danger ms-2" onClick={onRetry}>
          Повторить
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;