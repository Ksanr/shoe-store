import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopSales } from '../store/slices/topSalesSlice';
import { fetchCategories, setActiveCategory } from '../store/slices/categoriesSlice';
import { fetchItems, resetItems } from '../store/slices/itemsSlice';
import Categories from '../components/Catalog/Categories';
import ItemList from '../components/Catalog/ItemList';
import LoadMoreButton from '../components/Catalog/LoadMoreButton';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/Error/ErrorMessage';

const HomePage = () => {
  const dispatch = useDispatch();
  const topSales = useSelector((state) => state.topSales);
  const categories = useSelector((state) => state.categories);
  const itemsState = useSelector((state) => state.items);
  const scrollPositionRef = useRef(0);
  const isLoadMoreRef = useRef(false);

  useEffect(() => {
    dispatch(fetchTopSales());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    console.log('🔵 useEffect triggered, activeCategory =', categories.activeCategory);
    dispatch(resetItems());
    dispatch(fetchItems({ categoryId: categories.activeCategory, offset: 0 }));
  }, [categories.activeCategory, dispatch]);

  useLayoutEffect(() => {
    if (isLoadMoreRef.current && scrollPositionRef.current) {
      window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
      isLoadMoreRef.current = false;
      scrollPositionRef.current = 0;
    }
  }, [itemsState.items]);

  const handleCategoryChange = (categoryId) => {
    console.log('🟢 handleCategoryChange called with:', categoryId);
    dispatch(setActiveCategory(categoryId));
    dispatch(resetItems());
    dispatch(fetchItems({ categoryId, offset: 0 }));
  };

  const handleLoadMore = () => {
    scrollPositionRef.current = window.scrollY;
    isLoadMoreRef.current = true;
    dispatch(
      fetchItems({
        categoryId: categories.activeCategory,
        offset: itemsState.offset,
      })
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {/* Баннер */}
          <div className="banner">
            <img src="/img/banner.jpg" className="img-fluid" alt="Баннер" />
            <div className="banner-header">
              <span>К весне готовы!</span>
            </div>
          </div>

          {/* Хиты продаж */}
          {topSales.loading && <Loader />}
          {topSales.error && <ErrorMessage message={topSales.error} onRetry={() => dispatch(fetchTopSales())} />}
          {!topSales.loading && !topSales.error && topSales.items.length > 0 && (
            <section className="top-sales">
              <h2 className="text-center">Хиты продаж!</h2>
              <ItemList items={topSales.items} />
            </section>
          )}

          {/* Категории */}
          <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            {categories.loading && <Loader />}
            {categories.error && <ErrorMessage message={categories.error} onRetry={() => dispatch(fetchCategories())} />}
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
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;