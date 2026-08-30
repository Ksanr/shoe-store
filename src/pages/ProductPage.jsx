import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getItemById } from '../api/api';
import { addToCart } from '../store/slices/cartSlice';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/Error/ErrorMessage';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const fields = [
    { label: 'Артикул', key: 'sku' },
    { label: 'Производитель', key: 'manufacturer' },
    { label: 'Цвет', key: 'color' },
    { label: 'Материалы', key: 'material' },
    { label: 'Сезон', key: 'season' },
    { label: 'Повод', key: 'reason' },
  ];

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getItemById(id);
      setProduct(response.data);
    } catch (err) {
      setError(err.message || 'Ошибка загрузки товара');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    return () => {
      setSelectedSize(null);
      setQuantity(1);
    };
  }, [id]);

  const handleSizeClick = (size) => {
    setSelectedSize((prev) => (prev === size ? null : size));
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.min(10, Math.max(1, prev + delta)));
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    dispatch(
      addToCart({
        id: product.id,
        size: selectedSize,
        price: product.price,
        title: product.title,
        image: product.images?.[0] || '/img/placeholder.png',
        count: quantity,
      })
    );
    navigate('/cart.html');
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProduct} />;
  if (!product) return null;

  const availableSizes = product.sizes?.filter((s) => s.available) || [];

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center mb-4">{product.title}</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="product-image-wrapper">
            <img
              src={product.images?.[0] || '/img/placeholder.png'}
              alt={product.title}
              className="product-page-image"
            />
          </div>
        </div>

        <div className="col-md-8">
          <table className="product-table">
            <tbody>
              {fields.map(({ label, key }) => (
                <tr key={key}>
                  <td>{label}</td>
                  <td>{product[key] || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {availableSizes.length > 0 && (
            <div className="product-sizes">
              <div className="sizes-label">Размеры в наличии:</div>
              <div className="sizes-list">
                {availableSizes.map((size) => (
                  <button
                    key={size.size}
                    className={`size-btn ${selectedSize === size.size ? 'active' : ''}`}
                    onClick={() => handleSizeClick(size.size)}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {availableSizes.length > 0 && (
            <>
              <div className="product-quantity">
                <span className="quantity-label">Количество:</span>
                <div className="quantity-control">
                  <button className="qty-btn" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                    −
                  </button>
                  <input
                    type="number"
                    className="qty-input"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val) && val >= 1 && val <= 10) {
                        setQuantity(val);
                      }
                    }}
                    onBlur={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (isNaN(val) || val < 1) setQuantity(1);
                      else if (val > 10) setQuantity(10);
                    }}
                  />
                  <button className="qty-btn" onClick={() => handleQuantityChange(1)} disabled={quantity >= 10}>
                    +
                  </button>
                </div>
              </div>

              <button
                className="btn-add-to-cart"
                onClick={handleAddToCart}
                disabled={!selectedSize}
              >
                В корзину
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;