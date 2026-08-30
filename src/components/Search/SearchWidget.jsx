import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../store/slices/itemsSlice';

const SearchWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleIconClick = () => {
    if (isOpen && query.trim()) {
      dispatch(setSearchQuery(query.trim()));
      navigate('/catalog.html');
      setIsOpen(false);
    } else {
      setIsOpen(!isOpen);
      if (!isOpen) setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      dispatch(setSearchQuery(query.trim()));
      navigate('/catalog.html');
      setIsOpen(false);
    }
  };

  return (
    <div className="search-widget">
      <i className="fa fa-search" onClick={handleIconClick}></i>
      {isOpen && (
        <input
          ref={inputRef}
          type="text"
          placeholder="Поиск..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};

export default SearchWidget;