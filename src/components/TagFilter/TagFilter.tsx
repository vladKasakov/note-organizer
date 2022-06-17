import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Tag } from '../../models';
import { setFilter } from '../../store/reducers/filterSlice';
import styles from './TagFilter.module.scss';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { ReactComponent as CrossIcon } from '../../assets/cross.svg';

export const TagFilter = () => {
  const filterTags = useAppSelector((state) => state.filter);
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    parseInput();
  };

  const parseInput = () => {
    if (!input) return dispatch(setFilter([]));

    const rowTags: Tag[] = input.trim().split(' ');

    const preparedFilterTags = rowTags.map((tag) =>
      tag[0] === '#' ? tag.slice(1) : tag
    );

    dispatch(setFilter(preparedFilterTags));
  };

  const clearSearchField = () => {
    dispatch(setFilter([]));
    setInput('');
  };

  useEffect(() => {
    if (filterTags) {
      setInput(filterTags.join(' '));
    }
  }, [filterTags]);

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Search by tag..."
        />
      </form>
      {input && (
        <CrossIcon onClick={clearSearchField} className={styles['clear-btn']} />
      )}
      <button className={styles['search-btn']} onClick={parseInput}>
        <SearchIcon />
      </button>
    </div>
  );
};
