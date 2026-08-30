import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchCategories } from '../store/slices/categoriesSlice';
import {
  fetchItems,
  resetItems,
  setCategory,
  setSearchQuery,
} from '../store/slices/itemsSlice';
import Categories from '../components/Catalog/Categories';
import ItemList from '../components/Catalog/ItemList';
import LoadMoreButton from '../components/Catalog/LoadMoreButton';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/Error/ErrorMessage';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = useSelector((state) => state.categories);
  const itemsState = useSelector((state) => state.items);

  const initialSearch = searchParams.get('search') || '';
  const [searchInput, setSearchInput] = useState(initialSearch);

  // При загрузке страницы, если есть параметр search, применяем его
  useEffect(() => {
    if (initialSearch) {
      dispatch(setSearchQuery(initialSearch));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetItems());
    dispatch(
      fetchItems({
        categoryId: categories.activeCategory,
        offset: 0,
        q: itemsState.q,
      })
    );
  }, [categories.activeCategory, itemsState.q, dispatch]);

  const handleCategoryChange = (categoryId) => {
    dispatch(setCategory(categoryId));
    setSearchInput('');
    setSearchParams({});
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed) {
      setSearchParams({ search: trimmed });
      dispatch(setSearchQuery(trimmed));
    } else {
      setSearchParams({});
      dispatch(setSearchQuery(''));
    }
  };

  const handleLoadMore = () => {
    dispatch(
      fetchItems({
        categoryId: categories.activeCategory,
        offset: itemsState.offset,
        q: itemsState.q,
      })
    );
  };

  if (categories.loading) return <Loader />;

  return (
    <section className="catalog">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Каталог</h2>

            {/* Поисковая строка */}
            <form className="catalog-search-form" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="form-control"
                placeholder="Поиск..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit" className="btn btn-outline-primary">
                Найти
              </button>
            </form>

            {/* Категории */}
            {categories.error && (
              <ErrorMessage message={categories.error} onRetry={() => dispatch(fetchCategories())} />
            )}
            {!categories.loading && !categories.error && (
              <Categories
                categories={categories.items}
                activeId={categories.activeCategory}
                onSelect={handleCategoryChange}
              />
            )}

            {/* Список товаров */}
            {itemsState.loading && <Loader />}
            {itemsState.error && (
              <ErrorMessage
                message={itemsState.error}
                onRetry={() =>
                  dispatch(
                    fetchItems({
                      categoryId: categories.activeCategory,
                      offset: 0,
                      q: itemsState.q,
                    })
                  )
                }
              />
            )}
            {!itemsState.loading && !itemsState.error && (
              <>
                <ItemList items={itemsState.items} />
                {itemsState.hasMore && (
                  <LoadMoreButton
                    onClick={handleLoadMore}
                    loading={itemsState.loading}
                    hasMore={itemsState.hasMore}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogPage;