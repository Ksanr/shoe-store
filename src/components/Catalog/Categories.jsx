import React from 'react';

const Categories = ({ categories, activeId, onSelect }) => {
  return (
    <ul className="catalog-categories list-unstyled d-flex gap-4 justify-content-center flex-wrap">
      {categories.map((category) => (
        <li key={category.id}>
          <button
            className={`btn btn-link nav-link ${activeId === category.id ? 'active' : ''}`}
            onClick={() => {
              console.log('🖱️ Category clicked:', category.id);
              onSelect(category.id);
            }}
            style={{ textDecoration: 'none', fontSize: '1.2rem', padding: '0.5rem 1rem' }}
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Categories;