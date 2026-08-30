import React from 'react';

const LoadMoreButton = ({ onClick, loading, hasMore }) => {
  // Если больше нет товаров для загрузки — не показываем кнопку
  if (!hasMore) return null;

  return (
    <div className="text-center">
      {loading && (
        <div className="preloader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      <button
        className="btn btn-outline-primary"
        onClick={onClick}
        disabled={loading}
      >
        Загрузить ещё
      </button>
    </div>
  );
};

export default LoadMoreButton;